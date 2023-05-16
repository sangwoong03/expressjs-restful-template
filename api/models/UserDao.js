module.exports = class UserDao {
  constructor(db) {
    this.db = db;
  }

  async getUserByEmail(email) {
    const [result] = await this.db.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    return result;
  }

  async getUserByKakaoId(kakaoId) {
    const [result] = await this.db.query(
      `SELECT * FROM users WHERE kakao_id = ?`,
      [kakaoId]
    );
    return result;
  }

  async createUser(userDto) {
    const { email, first_name, last_name, password, mobile_number } = userDto;

    try {
      const result = await this.db.query(
        `INSERT INTO users (email, first_name, last_name, password, mobile_number) VALUES (?, ?, ?, ?, ?);`,
        [email, first_name, last_name, password, mobile_number]
      );
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async createKakaoUser(createKakaoUserDto) {
    const { kakaoId, email, firstName, lastName, mobileNumber } =
      createKakaoUserDto;

    try {
      const result = await this.db.query(
        `INSERT INTO users (kakao_id, email, first_name, last_name, mobile_number) VALUES (?, ?, ?, ?, ?);`,
        [kakaoId, email, firstName, lastName, mobileNumber]
      );

      const [createdUser] = await this.db.query(
        `SELECT * FROM users WHERE id = ?;`,
        [result.insertId]
      );

      return createdUser;
    } catch (err) {
      throw new Error(err);
    }
  }
};
