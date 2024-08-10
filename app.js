const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./src/routes/index");

const createApp = () => {
	const app = express();

	/**
	 * Register Middlewares
	*/
	app.use(cors());
	app.use(morgan("dev"));
	app.use(express.json());
	app.use(routes);

	return app;
}

module.exports = { createApp };
