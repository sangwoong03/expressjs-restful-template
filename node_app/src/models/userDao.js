const BaseError = require("../middlewares/baseError");
const { dataSource } = require("./dataSource");

/*
    DAO ( Data Access Object)
    데이터베이스에 접근하기 위한 객체
    즉 DB와 연결하는데 사용되는 인스턴스
*/
const userEmailCheck = async (email) => {
	try {
		return await dataSource.query(
			`
      SELECT EXISTS(
          SELECT 
              email 
          FROM users 
          WHERE email = '${email}')
      `,
		);
	} catch (err) {
		throw new BaseError("INVALID_EMAIL", 400);
	}
};

const passwordCheck = async (email) => {
	try {
		return await dataSource.query(
			`
      SELECT 
          password
      FROM users
      WHERE email = '${email}'
      `,
		);
	} catch (err) {
		throw new BaseError("INVALID_DATA_INPUT", 400);
	}
};

const createUser = async (
	email,
	lastName,
	firstName,
	profileImgUrl,
	password,
	birthday,
) => {
	try {
		return await dataSource.query(
			`INSERT INTO users(
                email,
                last_name,
                first_name,
                profile_img_url,
                password,
                birthday
            ) VALUES (?, ?, ?, ?, ?, ?);
            `,
			[email, lastName, firstName, profileImgUrl, password, birthday],
		);
	} catch (err) {
		const error = new Error("INVALID_DATA_INPUT");
		error.statusCode = 400;
		throw error;
	}
};

const userLogin = async (email) => {
	try {
		const [result] = await dataSource.query(
			`
          SELECT
              id userId,
              email,
              password
          FROM users u
          WHERE u.email = '${email}'
          `,
		);
		return result;
	} catch (err) {
		throw new BaseError("INVALID_DATA_INPUT", 400);
	}
};

module.exports = {
	userEmailCheck,
	passwordCheck,
	createUser,
	userLogin,
};
