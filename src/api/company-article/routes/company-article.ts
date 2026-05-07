/**
 * Company Article Routes
 */
export default {
  routes: [
    {
      method: 'GET',
      path: '/company-articles',
      handler: 'company-article.find',
      config: { policies: [] }
    },
    {
      method: 'GET',
      path: '/company-articles/:id',
      handler: 'company-article.findOne',
      config: { policies: [] }
    },
    {
      method: 'GET',
      path: '/company-articles/slug/:slug',
      handler: 'company-article.findBySlug',
      config: { policies: [] }
    },
    {
      method: 'GET',
      path: '/company-articles/stats',
      handler: 'company-article.getStats',
      config: { policies: [] }
    },
    {
      method: 'POST',
      path: '/company-articles',
      handler: 'company-article.create',
      config: { policies: ['plugin::users-permissions.isAuthenticated'] }
    },
    {
      method: 'PUT',
      path: '/company-articles/:id',
      handler: 'company-article.update',
      config: { policies: ['plugin::users-permissions.isAuthenticated'] }
    },
    {
      method: 'DELETE',
      path: '/company-articles/:id',
      handler: 'company-article.delete',
      config: { policies: ['plugin::users-permissions.isAuthenticated'] }
    }
  ]
};

