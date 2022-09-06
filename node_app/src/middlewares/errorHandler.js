const asyncWrap = asyncController => {
  return async (req, res, next) => {
      try {
          await asyncController(req, res)
      }
      catch(err) {
          if(err.message === "INVALID_DATA_INPUT") {
              res.status(err.statusCode ? err.statusCode : 500).json({message: err.message,})
          } else
          res.status(err.statusCode ? err.statusCode : 400).json({message: err.message,})
      }
  };
}

module.exports = asyncWrap