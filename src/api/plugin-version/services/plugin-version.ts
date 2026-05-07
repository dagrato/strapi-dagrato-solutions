/**
 * Plugin Version Service
 */
export default {
  async getLatestVersions(pluginName: string) {
    return await strapi.db.query('api::plugin-version.plugin-version').findOne({
      where: { pluginName, isLatest: true, publishedAt: { $notNull: true } },
      populate: { changelog: true, features: true, bugFixes: true, knownIssues: true },
    });
  },

  async getStableVersions(pluginName: string) {
    return await strapi.db.query('api::plugin-version.plugin-version').findOne({
      where: { pluginName, isStable: true, publishedAt: { $notNull: true } },
      populate: { changelog: true, features: true, bugFixes: true, knownIssues: true },
    });
  },

  async getAllVersions(pluginName: string) {
    return await strapi.db.query('api::plugin-version.plugin-version').findMany({
      where: { pluginName, publishedAt: { $notNull: true } },
      populate: { changelog: true, features: true, bugFixes: true },
      orderBy: { releaseDate: 'desc' },
    });
  },

  async checkCompatibility(pluginName: string, environment: any) {
    const versions = await this.getAllVersions(pluginName);

    return versions.map((version: any) => ({
      version: version.version,
      compatible: this.isCompatible(version.compatibility, environment),
      requirements: version.requirements,
    }));
  },

  private isCompatible(compatibility: any, environment: any) {
    if (!compatibility) return true;

    if (compatibility.nodeVersion) {
      // Simple version comparison
      const required = compatibility.nodeVersion;
      const current = environment.nodeVersion;
      if (current < required) return false;
    }

    if (compatibility.jiraVersion) {
      const required = compatibility.jiraVersion;
      const current = environment.jiraVersion;
      if (current < required) return false;
    }

    return true;
  },

  async getVersionStats(pluginName: string) {
    const versions = await strapi.db.query('api::plugin-version.plugin-version').findMany({
      where: { pluginName },
      select: ['id', 'downloads', 'releaseDate'],
    });

    const totalDownloads = versions.reduce((sum: number, v: any) => sum + (v.downloads || 0), 0);
    const averageDownloads = versions.length > 0 ? Math.round(totalDownloads / versions.length) : 0;

    return {
      totalVersions: versions.length,
      totalDownloads,
      averageDownloads,
      versions,
    };
  },

  async validateVersion(versionData: any) {
    const errors: string[] = [];

    if (!versionData.pluginName) errors.push('Plugin name is required');
    if (!versionData.version) errors.push('Version is required');
    if (!this.isValidSemver(versionData.version)) errors.push('Invalid semantic version format');

    if (versionData.description && versionData.description.length > 500) {
      errors.push('Description must be less than 500 characters');
    }

    return { valid: errors.length === 0, errors };
  },

  private isValidSemver(version: string): boolean {
    const semverRegex = /^\d+\.\d+\.\d+(-[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?(\+[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?$/;
    return semverRegex.test(version);
  },
};

