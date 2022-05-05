const multer = require('multer');
const basicElements = require("./basicElements");

class multerSet {
    storageConfig = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, basicElements.fileImgPath);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    });
    fileFilter(req, file, cb) {
        const fileSize = parseInt(req.headers['content-length']);
        console.log("fileSize", fileSize);
        if (fileSize && basicElements.allowedItem(basicElements.allowedMimetypes, file.mimetype)) {
            return cb(null, true);
        } else {
            return cb(null, false);
        }
    }
}
module.exports = new multerSet();