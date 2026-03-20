const multer = require('multer')

const storage = multer.diskStorage({
    destination : (req, res, cb) => {
        cb = (null, 'uploads/');
    }, 
    filename : (req, res, cd) => {
        cb = (null,Date.now()+'-'+file.originalname)
    }
})

const upload = multer({storage})

module.exports = upload