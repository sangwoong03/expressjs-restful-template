const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Node Airbnb',
      version: '1.0.0',
      description: 'Node Airbnb',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: [__dirname + '/../api/routes/*.js'],
};
const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
