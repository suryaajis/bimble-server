const jwt = require('jsonwebtoken')

const secretJwt = process.env.JWT_SECRET

const signToken = (payload) => {
  jwt.sign(payload, secretJwt)
}

const verifyToken = (token) => {
  jwt.verify(token, secretJwt)
}

module.exports = {
  signToken,
  verifyToken
}