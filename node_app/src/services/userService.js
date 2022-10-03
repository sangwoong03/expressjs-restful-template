require("dotenv").config()

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userDao = require("../models/userDao")
const BaseError = require("../middlewares/baseError")
const { validateEmail, validatePassword } = require("../utils/authValidator")

const getUserByEmail = async (email) => {
	validateEmail(email)

	const user = await userDao.getUserByEmail(email)

	if (user) {
		throw new BaseError("EMAIL_DUPLICATED", 409)
	} else {
		throw new BaseError("EMAIL_NOT_EXISTS", 200)
	}
}

const signUp = async (email, name, profileImage, password, birthdate) => {
	validateEmail(email)
	validatePassword(password)

	const user = await userDao.getUserByEmail(email)

	if (user) {
		throw new BaseError("USER_ALREADY_EXISTS", 400)
	}

	const hashedPassword = await bcrypt.hash(password, 10)

	return await userDao.createUser(email, name, profileImage, hashedPassword, birthdate)
};

const signIn = async (email, password) => {
	validateEmail(email)
	validatePassword(password)

	const user = await userDao.getUserByEmail(email)

	if (!user) {
		throw new BaseError("INVALID_USER_INFORMATION", 400)
	}
	
	const userPassword = await bcrypt.compare(password, user.password)

	if (!userPassword) throw new BaseError("INVALID_USER_INFORMATION", 400)

	const accessToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET)

	return accessToken;
};

module.exports = {
	getUserByEmail,
	signUp,
	signIn,
};
