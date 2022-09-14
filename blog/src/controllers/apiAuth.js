import { BadRequestError } from '../utils/errors'
import User from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class AuthController {
  transformUser (user) {
    user.set('password', undefined)

    return user
  }

  async login (req, res) {
    const { username, password } = req.body

    const user = await User.scope('withPassword').findOne({
      where: { username }
    })

    if (!user) {
      throw new BadRequestError('Credential error')
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestError('Credential error')
    }

    this.transformUser(user)

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: '1000s'
      }
    )

    res.json({
      ...user.dataValues,
      token
    })
  }
}

export default new AuthController()
