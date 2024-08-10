const { database } = require("./database");

const getUserByEmail = async (email) => {
	const [result] = await database.query(`
		SELECT
			id,
			name,
			email,
			password,
			profile_image as profileImage,
			birthdate
		FROM users
		WHERE email = ?
	`, [email]);

	return result;
}

const createUser = async (email, name, profileImage, hashedPassword, birthdate) => {
	const result = await database.query(`
		INSERT INTO users (
			email,
			name,
			profile_image,
			password,
			birthdate
		)
		VALUES (?, ?, ?, ?, ?)
	`, [email, name, profileImage, hashedPassword, birthdate]);

	return result.insertId;
};


module.exports = {
	getUserByEmail,
	createUser
};