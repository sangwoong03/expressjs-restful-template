const validateEmail = (email) => {
  const emValidation = new RegExp(
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
  );

  if (!emValidation.test(email)) {
    const err = new Error("EMAIL_IS_INVALID_FORMAT");
    err.statusCode = 400;
    throw err;
  }
};

const validatePassword = (password) => {
  const pwValidation = new RegExp(
    /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,}$)/
  );

  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_INVALID_FORMAT");
    err.statusCode = 400;
    console.log(password)
    throw err;
  }
};

module.exports = {
  validateEmail,
  validatePassword
};