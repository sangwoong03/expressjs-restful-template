require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userDao = require("../models/userDao");
const BaseError = require("../middlewares/baseError");
const { validateEmail, validatePassword } = require("../utils/userValidator");

/*
    실제 business 로직을 구현
*/
const emailCheck = async (email) => {
	validateEmail(email);

	const userEmail = await userDao.userEmailCheck(email);

	if (Number(Object.values(userEmail[0])[0]))
		throw new BaseError("EMAIL_DUPLICATE", 409);

	if (!Number(Object.values(userEmail[0])[0]))
		throw new BaseError("EMAIL_NOT_EXISTS", 200);
};

const signUp = async (
	email,
	lastName,
	firstName,
	profileImgUrl,
	password,
	birthday,
) => {
	validateEmail(email);
	validatePassword(password);

	const userEmail = await userDao.userEmailCheck(email);

	if (Number(Object.values(userEmail[0])[0]))
		throw new BaseError("DUPLICATED_EMAIL_INFO", 400);

	const hashedPassword = await bcrypt.hash(password, 10);
	const createUser = await userDao.createUser(
		email,
		lastName,
		firstName,
		profileImgUrl,
		hashedPassword,
		birthday,
	);
	return createUser;
};

const signIn = async (email, password) => {
	const user = await userDao.userLogin(email);

	if (!Number(Object.values(user)[0]))
		throw new BaseError("INVALID_INFORMATION", 400);

	const passwordCheck = await userDao.passwordCheck(email);
	const userPassword = await bcrypt.compare(
		password,
		passwordCheck[0].password,
	);

	if (!userPassword) throw new BaseError("INVALID_INFORMATION", 400);

	const accessToken = jwt.sign(
		{ sub: user.userId, email: user.email },
		process.env.JWT_SECRET,
	);

	return accessToken;
};

module.exports = {
	emailCheck,
	signUp,
	signIn,
};
