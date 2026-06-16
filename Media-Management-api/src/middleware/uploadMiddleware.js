const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        if (file.mimetype.startsWith("image")) {

            cb(null, "src/uploads/images");

        }

        else if (file.mimetype.startsWith("video")) {

            cb(null, "src/uploads/videos");

        }

        else {

            cb(null, "src/uploads/documents");

        }

    },

    filename: (req, file, cb) => {

        cb(

            null,

            Date.now() +

            path.extname(file.originalname)

        );

    }

});

const upload = multer({

    storage

});

module.exports = upload;