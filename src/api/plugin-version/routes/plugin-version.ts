/**
 * Plugin Version Routes
 */
export default {
  routes: [
    {
      method: 'GET',
      path: '/plugin-versions',
      handler: 'plugin-version.find',
      config: { policies: [] }
    },
    {
      method: 'GET',
      path: '/plugin-versions/:id',
      handler: 'plugin-version.findOne',
      config: { policies: [] }
    },
    {
      method: 'GET',
      path: '/plugin-versions/:pluginName/latest',
      handler: 'plugin-version.findLatest',
      config: { policies: [] }
    },
    {
      method: 'GET',
      path: '/plugin-versions/:pluginName/stable',
      handler: 'plugin-version.findStable',
      config: { policies: [] }
    },
    {
      method: 'GET',
      path: '/plugin-versions/:pluginName/all',
      handler: 'plugin-version.getVersions',
      config: { policies: [] }
    },
    {
      method: 'GET',
      path: '/plugin-versions/:pluginName/:version/release-notes',
      handler: 'plugin-version.getReleaseNotes',
      config: { policies: [] }
    },
    {
      method: 'POST',
      path: '/plugin-versions',
      handler: 'plugin-version.create',
      config: { policies: ['plugin::users-permissions.isAuthenticated'] }
    },
    {
      method: 'PUT',
      path: '/plugin-versions/:id',
      handler: 'plugin-version.update',
      config: { policies: ['plugin::users-permissions.isAuthenticated'] }
    },
    {
      method: 'DELETE',
      path: '/plugin-versions/:id',
      handler: 'plugin-version.delete',
      config: { policies: ['plugin::users-permissions.isAuthenticated'] }
    }
  ]
};

