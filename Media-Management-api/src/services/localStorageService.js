const File = require("../models/File");

const saveLocal = async(file)=>{

    return await File.create({

        originalName:file.originalname,

        storageType:"local",

        fileType:file.mimetype,

        mimeType:file.mimetype,

        size:file.size,

        path:file.path

    });

}

module.exports={saveLocal};