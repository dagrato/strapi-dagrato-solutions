import type { Core } from '@strapi/strapi';

/**
 * Company Article Controller
 * Verwaltet Firmenartikel mit Authentifizierung und Autorentracking
 */
export default {
  async find(ctx: any) {
    // Populate relations
    ctx.query = {
      ...ctx.query,
      populate: {
        author: { fields: ['id', 'email', 'username'] },
        tags: true,
        featuredImage: true,
        gallery: true,
        seo: true,
        blocks: true,
      },
    };
    return await super.find(ctx);
  },

  async findOne(ctx: any) {
    const { id } = ctx.params;
    
    // Populate relations
    ctx.query = {
      ...ctx.query,
      populate: {
        author: { fields: ['id', 'email', 'username'] },
        tags: true,
        featuredImage: true,
        gallery: true,
        seo: true,
        blocks: true,
      },
    };
    
    // View Counter
    if (ctx.state.user || !ctx.query.draft) {
      try {
        await strapi.db.query('api::company-article.company-article').update({
          where: { id: parseInt(id) },
          data: { views: strapi.db.raw('views + 1') },
        });
      } catch (e) {
        // Fehler ignorieren
      }
    }

    return await super.findOne(ctx);
  },

  async findBySlug(ctx: any) {
    const { slug } = ctx.params;
    
    const article = await strapi.db.query('api::company-article.company-article').findOne({
      where: { slug },
      populate: {
        author: { fields: ['id', 'email', 'username'] },
        tags: true,
        featuredImage: true,
        gallery: true,
        seo: true,
        blocks: true,
      },
    });

    if (!article) {
      return ctx.notFound('Article not found');
    }

    // Increment views
    try {
      await strapi.db.query('api::company-article.company-article').update({
        where: { id: article.id },
        data: { views: strapi.db.raw('views + 1') },
      });
    } catch (e) {
      // Error ignored
    }

    ctx.body = article;
  },

  async create(ctx: any) {
    if (!ctx.state.user) {
      return ctx.unauthorized('You must be logged in to create articles');
    }

    const { data } = ctx.request.body;
    
    // Set author to current user
    data.author = ctx.state.user.id;

    ctx.request.body = { data };
    return await super.create(ctx);
  },

  async update(ctx: any) {
    if (!ctx.state.user) {
      return ctx.unauthorized('You must be logged in to update articles');
    }

    const { id } = ctx.params;
    const article = await strapi.db.query('api::company-article.company-article').findOne({
      where: { id: parseInt(id) },
      populate: { author: true },
    });

    if (!article) {
      return ctx.notFound('Article not found');
    }

    // Check if user is author or admin
    if (article.author.id !== ctx.state.user.id && !ctx.state.user.is_admin) {
      return ctx.forbidden('You can only edit your own articles');
    }

    return await super.update(ctx);
  },

  async delete(ctx: any) {
    if (!ctx.state.user) {
      return ctx.unauthorized('You must be logged in to delete articles');
    }

    const { id } = ctx.params;
    const article = await strapi.db.query('api::company-article.company-article').findOne({
      where: { id: parseInt(id) },
      populate: { author: true },
    });

    if (!article) {
      return ctx.notFound('Article not found');
    }

    if (article.author.id !== ctx.state.user.id && !ctx.state.user.is_admin) {
      return ctx.forbidden('You can only delete your own articles');
    }

    return await super.delete(ctx);
  },

  async getStats(ctx: any) {
    const stats = await strapi.db.query('api::company-article.company-article').count({
      where: { publishedAt: { $notNull: true } },
    });

    ctx.body = {
      totalPublished: stats,
    };
  },
};

