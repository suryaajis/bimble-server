const { verifyToken } = require("../helpers/jwt")
const { User } = require('../models')

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers

    const payload = verifyToken(access_token)

    const foundUser = await User.findByPk(payload.id)
    
    if(!foundUser) {
      throw { name: "Unauthentication"}
    }

    req.user = {
      email: foundUser.email,
      role: foundUser.role
    }

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authentication