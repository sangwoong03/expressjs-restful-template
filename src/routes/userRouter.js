const express = require("express");

const userController = require("../controllers/userController");
const errorHandler = require("../middlewares/errorHandler");

const router = express.Router();

router.post("/signup", errorHandler(userController.signUp));
router.post("/signin", errorHandler(userController.signIn));

module.exports = {
	router,
};
