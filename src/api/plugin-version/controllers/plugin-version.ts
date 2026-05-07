import type { Core } from '@strapi/strapi';

/**
 * Plugin Version Controller
 * Verwaltet Plugin-Versionen mit Admin-only Zugriff
 */
export default {
  async find(ctx: any) {
    ctx.query = {
      ...ctx.query,
      populate: {
        changelog: true,
        features: true,
        bugFixes: true,
        knownIssues: true,
      },
    };
    return await super.find(ctx);
  },

  async findOne(ctx: any) {
    const { id } = ctx.params;
    
    ctx.query = {
      ...ctx.query,
      populate: {
        changelog: true,
        features: true,
        bugFixes: true,
        knownIssues: true,
      },
    };

    // Increment downloads counter
    try {
      await strapi.db.query('api::plugin-version.plugin-version').update({
        where: { id: parseInt(id) },
        data: { downloads: strapi.db.raw('downloads + 1') },
      });
    } catch (e) {
      // Error ignored
    }

    return await super.findOne(ctx);
  },

  async findLatest(ctx: any) {
    const { pluginName } = ctx.params;

    const latestVersion = await strapi.db.query('api::plugin-version.plugin-version').findOne({
      where: { 
        pluginName,
        isLatest: true,
        publishedAt: { $notNull: true }
      },
      populate: {
        changelog: true,
        features: true,
        bugFixes: true,
        knownIssues: true,
      },
    });

    if (!latestVersion) {
      return ctx.notFound('No published version found for this plugin');
    }

    ctx.body = latestVersion;
  },

  async findStable(ctx: any) {
    const { pluginName } = ctx.params;

    const stableVersion = await strapi.db.query('api::plugin-version.plugin-version').findOne({
      where: { 
        pluginName,
        isStable: true,
        publishedAt: { $notNull: true }
      },
      populate: {
        changelog: true,
        features: true,
        bugFixes: true,
        knownIssues: true,
      },
    });

    if (!stableVersion) {
      return ctx.notFound('No stable version found for this plugin');
    }

    ctx.body = stableVersion;
  },

  async create(ctx: any) {
    if (!ctx.state.user?.is_admin) {
      return ctx.forbidden('Only administrators can create plugin versions');
    }

    return await super.create(ctx);
  },

  async update(ctx: any) {
    if (!ctx.state.user?.is_admin) {
      return ctx.forbidden('Only administrators can update plugin versions');
    }

    const { id } = ctx.params;
    const { data } = ctx.request.body;

    // Handle isLatest flag - when setting a version as latest, unset others
    if (data.isLatest === true) {
      const pluginName = (await strapi.db.query('api::plugin-version.plugin-version').findOne({
        where: { id: parseInt(id) },
      })).pluginName;

      await strapi.db.query('api::plugin-version.plugin-version').updateMany({
        where: { pluginName, id: { $ne: parseInt(id) } },
        data: { isLatest: false },
      });
    }

    return await super.update(ctx);
  },

  async delete(ctx: any) {
    if (!ctx.state.user?.is_admin) {
      return ctx.forbidden('Only administrators can delete plugin versions');
    }

    return await super.delete(ctx);
  },

  async getVersions(ctx: any) {
    const { pluginName } = ctx.params;

    const versions = await strapi.db.query('api::plugin-version.plugin-version').findMany({
      where: { 
        pluginName,
        publishedAt: { $notNull: true }
      },
      populate: {
        changelog: true,
        features: true,
        bugFixes: true,
      },
      orderBy: { releaseDate: 'desc' },
    });

    ctx.body = versions;
  },

  async getReleaseNotes(ctx: any) {
    const { pluginName, version } = ctx.params;

    const versionData = await strapi.db.query('api::plugin-version.plugin-version').findOne({
      where: { pluginName, version },
      populate: {
        changelog: true,
        features: true,
        bugFixes: true,
        knownIssues: true,
      },
    });

    if (!versionData) {
      return ctx.notFound('Version not found');
    }

    ctx.body = versionData;
  },
};

