const { User } = require('../models')

class PublicController { 
  static async register(req, res, next ) {
    try {
      const { name, email, password } = req.body

      const createUser = await User.create({
        name,
        email,
        password,
        role: "User"
      })

      const response = {
        name: createUser.name,
        email: createUser.email,
        role: createUser.role
      }
      
      res.status(201).json(response)
    } catch (err) {
      next(err)
    }
  }


}


module.exports = PublicController