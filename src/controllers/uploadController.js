import uploadService from "../services/uploadService";

let handleUploadFile = async(req, res ,next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);
}

const upload = multer({
    storage: await uploadService.storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: function(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .jpeg and .png images are allowed!'));
        }
    }
})

module.exports = {
    upload: upload,
    handleUploadFile: handleUploadFile
}