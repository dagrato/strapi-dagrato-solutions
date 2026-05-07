export default {
    routes: [
        {
            method: 'POST',
            path: '/tutorials/:id/view',
            handler: 'tutorial.view',
            config: {
                auth: false,
            },
        },
    ],
};
