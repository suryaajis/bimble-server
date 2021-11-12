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
  } else if (err.name === "InvalidInput") {
    code = 401
    msg = "Invalid email/password"
  } else if (err.name === "JsonWebTokenError") {
    code = 401
    msg = "Unauthorized"
  } else if (err.name === "Unauthentication") {
    code = 401
    msg = "You must login first"
  } else if (err.name === "CourseNotFound") {
    code = 404
    msg = "Course Not Found"
  } else if (err.name === "CourseAlreadyPurchased") {
    code = 404
    msg = "Course Already Purchased"
  } else if (err.name === "CategoryNotFound") {
    code = 404
    msg = "Category Not Found"
  }

  res.status(code).json({message: msg})
}


module.exports = errorHandler
