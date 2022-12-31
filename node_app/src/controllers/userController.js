const userService = require("../services/userService")
const BaseError   = require("../middlewares/baseError")

const signUp = async (req, res) => {
  const { email, name, profileImage, password, birthdate } = req.body
  
  if (!email || !password || !name || !birthdate){
    throw new BaseError("KEY_ERROR", 400)
  }
      
  await userService.signUp(email, name, profileImage, password, birthdate)

  return res.status(201).json({ message: "SUCCESS" })
}

const signIn = async (req, res) => {
  const { email, password } = req.body

  if ( !email || !password ) {
    throw new BaseError("KEY_ERROR", 400)
  }
  
  const user = await userService.getUserByEmail(email)

  if ( !user ) {
    throw new BaseError("INVALID_USER", 401)
  }

  const TOKEN = await userService.signIn(email, password)

  return res.status(200).json({ token: TOKEN })
};

module.exports = {
  signUp,
  signIn
}