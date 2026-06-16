const cloudinary=require("../config/cloudinary");

const File=require("../models/File");

const uploadCloudinary=async(file)=>{

const result=await cloudinary.uploader.upload(

file.path,

{

resource_type:"auto"

}

);

return await File.create({

originalName:file.originalname,

storageType:"cloudinary",

url:result.secure_url,

publicId:result.public_id,

size:file.size,

mimeType:file.mimetype

});

}

module.exports={uploadCloudinary};