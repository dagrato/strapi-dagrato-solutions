/**
 * Company Article Service
 * Geschäftslogik für Artikel-Verwaltung
 */
export default {
  async getPublishedArticles(filters: any = {}, pagination: any = {}) {
    const query: any = {
      where: {
        publishedAt: { $notNull: true },
        ...filters,
      },
      populate: {
        author: { fields: ['id', 'email', 'username'] },
        tags: true,
        featuredImage: true,
        seo: true,
      },
      orderBy: { publishedAt: 'desc' },
    };

    if (pagination.limit) query.limit = pagination.limit;
    if (pagination.offset) query.offset = pagination.offset;

    return await strapi.db.query('api::company-article.company-article').findMany(query);
  },

  async getTrendingArticles(limit: number = 5) {
    return await strapi.db.query('api::company-article.company-article').findMany({
      where: { publishedAt: { $notNull: true } },
      populate: { author: true, tags: true, featuredImage: true },
      orderBy: { views: 'desc' },
      limit,
    });
  },

  async getArticlesByTag(tagSlug: string, limit: number = 10) {
    return await strapi.db.query('api::company-article.company-article').findMany({
      where: {
        publishedAt: { $notNull: true },
        tags: { slug: tagSlug },
      },
      populate: { author: true, tags: true, featuredImage: true },
      orderBy: { publishedAt: 'desc' },
      limit,
    });
  },

  async getArticlesByAuthor(authorId: number, limit: number = 20) {
    return await strapi.db.query('api::company-article.company-article').findMany({
      where: {
        publishedAt: { $notNull: true },
        author: authorId,
      },
      populate: { author: true, tags: true, featuredImage: true },
      orderBy: { publishedAt: 'desc' },
      limit,
    });
  },

  async searchArticles(query: string, limit: number = 20) {
    return await strapi.db.query('api::company-article.company-article').findMany({
      where: {
        publishedAt: { $notNull: true },
        $or: [
          { title: { $containsi: query } },
          { description: { $containsi: query } },
          { content: { $containsi: query } },
        ],
      },
      populate: { author: true, tags: true, featuredImage: true },
      limit,
    });
  },

  async getArticleStats() {
    const total = await strapi.db.query('api::company-article.company-article').count({
      where: { publishedAt: { $notNull: true } },
    });

    const views = await strapi.db.query('api::company-article.company-article').findMany({
      select: ['id'],
      where: { publishedAt: { $notNull: true } },
    });

    const totalViews = views.reduce((sum: number, article: any) => sum + (article.views || 0), 0);

    return {
      totalArticles: total,
      totalViews,
      avgViewsPerArticle: total > 0 ? Math.round(totalViews / total) : 0,
    };
  },

  async validateArticle(articleData: any) {
    const errors: string[] = [];

    if (!articleData.title || articleData.title.trim().length === 0) {
      errors.push('Title is required');
    }

    if (!articleData.content || articleData.content.trim().length === 0) {
      errors.push('Content is required');
    }

    if (articleData.title && articleData.title.length > 250) {
      errors.push('Title must be less than 250 characters');
    }

    return { valid: errors.length === 0, errors };
  },
};

