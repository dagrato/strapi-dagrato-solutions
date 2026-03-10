// import type { Core } from '@strapi/strapi';
import type { Core } from '@strapi/strapi';

const IMPRESSUM_CONTENT = ``;

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const existingImpressum = await strapi.db.query('api::impressum.impressum').findOne({
      where: {},
    });

    if (!existingImpressum) {
      await strapi.db.query('api::impressum.impressum').create({
        data: {
          title: 'Impressum',
          content: IMPRESSUM_CONTENT,
          publishedAt: new Date(),
        },
      });
    }

    const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    if (!publicRole) {
      return;
    }

    const roleService = strapi.plugin('users-permissions').service('role');
    const role = await roleService.findOne(publicRole.id);
    const impressumPermissions = role.permissions?.['api::impressum']?.controllers?.impressum;

    if (impressumPermissions?.find?.enabled) {
      return;
    }

    const nextPermissions = structuredClone(role.permissions ?? {});

    nextPermissions['api::impressum'] ??= { controllers: {} };
    nextPermissions['api::impressum'].controllers ??= {};
    nextPermissions['api::impressum'].controllers.impressum ??= {};
    nextPermissions['api::impressum'].controllers.impressum.find = {
      enabled: true,
      policy: '',
    };

    await roleService.updateRole(publicRole.id, {
      name: role.name,
      description: role.description,
      permissions: nextPermissions,
    });
  },
};
