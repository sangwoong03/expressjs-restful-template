const jwt = require('jsonwebtoken');
const axios = require('axios');
const bcrypt = require('bcryptjs');

module.exports = class AuthService {
  constructor(userDao) {
    this.userDao = userDao;
  }

  async signUp(signUpDto) {
    const { password: plainTextPassword } = signUpDto;

    const password = await bcrypt.hash(plainTextPassword, 10);

    signUpDto.password = password;

    return await this.userDao.createUser(signUpDto);
  }

  async signIn(signInDto) {
    const { email, password } = signInDto;

    const user = await this.userDao.getUserByEmail(email);

    if (!user) throw new Error('Specified user does not exist.');

    await this.checkPassword(password, user.password);

    return this.generateJwt(user, process.env.JWT_SECRET);
  }

  async kakaoSignIn(kakaoSignInDto) {
    const { kakaoToken } = kakaoSignInDto;

    const { data: kakaoUserData } = await axios.get(
      'https://kapi.kakao.com/v2/user/me',
      {
        headers: {
          Authorization: `Bearer ${kakaoToken}`,
        },
      }
    );

    const {
      id: kakaoId,
      kakao_account: {
        email,
        profile: { nickname, thumbnail_image_url, profile_image_url },
      },
    } = kakaoUserData;

    let user = await this.userDao.getUserByKakaoId(kakaoId);

    if (!user) {
      const createKakaoUserDto = {
        kakaoId,
        email,
        firstName: nickname,
        lastName: '',
        mobileNumber: '',
      };
      user = await this.userDao.createKakaoUser(createKakaoUserDto);
    }

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);
    return token;
  }

  async checkPassword(userPw, dbPw) {
    const result = await bcrypt.compare(userPw, dbPw);

    if (!result) throw new Error('Invalid password.');
    return result;
  }

  generateJwt(user, JWT_SECRET) {
    return jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET);
  }
};
