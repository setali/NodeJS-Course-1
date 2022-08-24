export default (req, res, next) => {
  if (
    req.method === 'POST' &&
    typeof req.body === 'object' &&
    req.body._method
  ) {
    req.originalMethod = req.method
    req.method = req.body._method.toUpperCase()
  }

  next()
}
