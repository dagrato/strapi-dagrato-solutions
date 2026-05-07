/**
 * tutorial controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::tutorial.tutorial', ({ strapi }) => ({

    async view(ctx) {
        const { id } = ctx.params;

        // get the tutorial
        const tutorial = await strapi.entityService.findOne('api::tutorial.tutorial', id);

        if (!tutorial) {
            return ctx.notFound('Tutorial not found');
        }

        // increment views
        await strapi.entityService.update('api::tutorial.tutorial', id, {
            data: {
                views: (tutorial.views ?? 0) + 1,
            },
        });

        ctx.body = { ok: true };
    },

    async trending(ctx) {
        const trendingTutorials = await strapi.entityService.findMany(
            'api::tutorial.tutorial',
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

        ctx.body = trendingTutorials;
    },

}));
