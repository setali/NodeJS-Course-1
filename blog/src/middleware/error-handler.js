export default (err, req, res, next) => {
  console.log(err)

  const status = err.status || 500
  const message = err.message || 'Server error, please call to admin'

  res.status(status).render('error', {
    title: `Error ${status}`,
    message
  })
}
