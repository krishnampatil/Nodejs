const fs=require("fs");

const File=require("../models/File");

const saveImageDB=async(file)=>{

const imageBuffer=fs.readFileSync(file.path);

return await File.create({

originalName:file.originalname,

storageType:"database",

mimeType:file.mimetype,

imageData:imageBuffer

});

}

module.exports={saveImageDB};