export default {
    routes: [
        {
            method: 'GET',
            path: '/articles/trending',
            handler: 'article.trending',
            config: {
                auth: false,
            },
        },
    ],
};