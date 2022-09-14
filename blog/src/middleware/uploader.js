import multer from 'multer'

const storage = multer.diskStorage({
  destination: './public/uploads/images',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`)
  }
})

const VALID_MIME_TYPES = ['image/png', 'image/jpeg']

function imageFilter (req, { mimetype }, cb) {
  if (VALID_MIME_TYPES.includes(mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Invalid type'), false)
  }
}

const uploader = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024
  },
  fileFilter: imageFilter
})

export default uploader
