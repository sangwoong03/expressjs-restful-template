const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const { createConnection } = require('typeorm');

const { swaggerUi, specs } = require('./swagger/swagger');

const Service = require('./bootstrap');
const Database = require('./api/models/database');

const AuthController = require('./api/controllers/authController');
const ListingController = require('./api/controllers/listingController');

async function bootstrap() {
  const app = express();

  const connection = await createConnection();
  const db = new Database(connection);
  const config = { db };
  const service = new Service(config);

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());

  const authController = new AuthController(service);
  const listingController = new ListingController(service);

  authController.createEndpoints(app, express);
  listingController.createEndpoints(app, express);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

  return app;
}

module.exports = bootstrap;
