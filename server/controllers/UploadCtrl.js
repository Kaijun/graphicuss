
import multer from 'multer'

const avatarMulter = multer({
  dest: __dirname + '/../static/uploads/avatar/',
  limits: {
    fieldSize: 2048,
    files: 1
  }
}).single('avatar')

const fileMulter = multer({
  dest: __dirname + '/../static/uploads/file/',
  limits: {
    fieldSize: 20480,
    files: 1
  }
}).single('file')

export const uploadAvatar = async (req, res, next) => {
  avatarMulter(req, res, function(err) {
    // TODO: Generate different sizes of avatarts
    if(err){
      res.json({
        "success": false,
        "msg": err.message
      })
    }
    else{
      res.json({
        "success": true,
        "file_path": `/uploads/avatar/${req.file.filename}`
      })
    }
  })
}

export const uploadFile = async (req, res, next) => {
  fileMulter(req, res, function(err) {
    if(err){
      res.json({
        "success": false,
        "msg": err.message
      })
    }
    else{
      res.json({
        "success": true,
        "file_path": `/uploads/file/${req.file.filename}`
      })
    }
  })
}
