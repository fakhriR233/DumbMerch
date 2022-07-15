const multer = require("multer")


exports.uploadFile = (imageFile) => {
    
    //where image is stored and name of the image
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads")
        },
        filename: (req, file, cb) => {
            //uses date now, and removing any spaces from filename
            cb(null, Date.now() + "-" + file.originalname.replace(/\s/g,""))
        }
    })

    //filter file to only support image file
    const filtering = (req,file,cb) => {
        if(file.fieldname === imageFile) {
            if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
                req.fileValidationError = {
                    message: "Only image files are allowed!"
                }
                return cb(new Error("Only image files are allowed!"), false)
            }
        }
        cb(null, true)
    }

    //max image size is 10MB
    const sizeimgMaxMB = 10
    const maxSize = sizeimgMaxMB * 1000 * 1000 //times bytes times KB

    const upload = multer({
        storage,
        filtering,
        limit: {
            fileSize: maxSize
        }
    }).single(imageFile)

    return (req, res, next) => {
        upload(req, res, function(err) {
            if(req.fileValidationError)
            return res.status(400).send(res.fileValidationError)

            if(!req.file && !err)
            return res.status(400).send({
                message: "Please select image to upload"
            })

            if(err) {
                if(err.code === "LIMIT_FILE_SIZE"){
                    return res.status(400).send({
                        message: "Max size for Image is 10MB"
                    })
                }
            return res.status(400).send(err)
            }

            return next()
        })
    }
}