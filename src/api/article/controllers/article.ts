/**
 * article controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::article.article', ({ strapi }) => ({

    async view(ctx) {
        const { id } = ctx.params;

        // get the article
        const article = await strapi.entityService.findOne('api::article.article', id);

        if (!article) {
            return ctx.notFound('Article not found');
        }

        // increment views
        await strapi.entityService.update('api::article.article', id, {
            data: {
                views: (article.views ?? 0) + 1,
            },
        });

        ctx.body = { ok: true };
    },

    async trending(ctx) {
        const trendingArticles = await strapi.entityService.findMany(
            'api::article.article',
            {
                fields: ['title', 'slug', 'description', 'views', 'published'],
                populate: {
                    categories: { fields: ['name', 'slug'] },
                    author: { fields: ['username'] },
                },
                sort: ['views:desc'],
                limit: 5, // top 5 trending
            }
        );

        ctx.body = trendingArticles;
    },

}));