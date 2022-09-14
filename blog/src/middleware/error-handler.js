export default (err, req, res, next) => {
  console.log(err)

  const status = err.status || 500
  const message =
    status < 500 || process.env.NODE_ENV === 'development'
      ? err.message
      : 'Server error, please call admin'

  if (req.url.startsWith('/api')) {
    res.status(status).json({
      code: status,
      message
    })
  } else {
    res.status(status).render('error', {
      title: `Error ${status}`,
      message
    })
  }
}
