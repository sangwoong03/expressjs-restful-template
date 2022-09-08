const userService = require("../services/userService");
const BaseError   = require("../middlewares/baseError");

/*
  요청에 대한 json data 분석을 하지 않음 (business 로직이 아니다)
*/


const emailCheck = async (req, res) => {
  const { email } = req.body;

  if (!email) throw new BaseError("KEY_ERROR", 400);

  await userService.emailCheck(email);

  res.status(201).json({ message: email });
};

const signUp = async (req, res) => {
  const { email, lastName, firstName, profileImgUrl, password, birthday } = req.body;

  if (!email || !password || !firstName || !lastName || !birthday)
      throw new BaseError("KEY_ERROR", 400);
      
  await userService.signUp(email, firstName, lastName, profileImgUrl, password, birthday);

  res.status(201).json({ message: "SUCCESS" });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const TOKEN = await userService.signIn(email, password);

  res.status(200).json({ token: TOKEN });
};

module.exports = {
  emailCheck,
  signUp,
  signIn
};