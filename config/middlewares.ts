module.exports = [
  'strapi::errors',
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:4200'], // add other frontends as needed
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      headers: [
        'Content-Type',
        'Authorization',
        'Origin',
        'Accept',
        'Request-Loading-Type',
        'Request-Sender'
      ],
      credentials: false, // set true only if you use cookies
      keepHeaderOnError: true,
    },
  },
  'strapi::security',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];