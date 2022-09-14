import jwt from 'jsonwebtoken'
import User from '../models/user'

export default (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        if (error) {
          throw error
        }

        User.find(payload.id)
          .then(user => {
            req.user = user
            next()
          })
          .catch(err => {
            throw new Error(err)
          })
      })
    }
  } else {
    req.user = req.session.user
    next()
  }
}
