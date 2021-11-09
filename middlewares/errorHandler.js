const errorHandler = (err, req, res, next) => {
  let code = 500
  let msg = "Internal server error"

  console.log(err)
  if(err.name === "SequelizeValidationError") {
    code = 400
    msg = err.errors[0].message
  } else if (err.name === "SequelizeUniqueConstraintError") {
    code = 400
    msg = err.errors[0].message
  }



  res.status(code).json({message: msg})
}


module.exports = errorHandler