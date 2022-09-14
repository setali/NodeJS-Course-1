import { ForbiddenError, NotAuthorizeError } from '../utils/errors'
import { ROLE_HIERARCHY } from '../config/roles'

export default function acl (roleName) {
  return (req, res, next) => {
    if (!req.user) {
      throw new NotAuthorizeError()
    }

    const { role } = req.user

    console.log(ROLE_HIERARCHY[role], role, roleName)
    if (role === roleName || ROLE_HIERARCHY[role]?.includes(roleName)) {
      return next()
    }

    throw new ForbiddenError()
  }
}
