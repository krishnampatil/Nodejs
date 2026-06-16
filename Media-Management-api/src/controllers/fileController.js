const File=require("../models/File");

const {

saveLocal

}=require("../services/localStorageService");

const {

uploadCloudinary

}=require("../services/cloudinaryService");

const {

saveImageDB

}=require("../services/databaseStorageService");

exports.uploadLocal=async(req,res)=>{

const file=await saveLocal(req.file);

res.json(file);

};

exports.uploadCloudinary=async(req,res)=>{

const file=await uploadCloudinary(req.file);

res.json(file);

};

exports.uploadDatabase=async(req,res)=>{

const file=await saveImageDB(req.file);

res.json(file);

};

exports.getFiles=async(req,res)=>{

const files=await File.find();

res.json(files);

};

exports.getFile=async(req,res)=>{

const file=await File.findById(req.params.id);

res.json(file);

};

exports.getImage=async(req,res)=>{

const image=await File.findById(req.params.id);

res.contentType(image.mimeType);

res.send(image.imageData);

};

exports.deleteFile=async(req,res)=>{

await File.findByIdAndDelete(req.params.id);

res.json({

message:"Deleted Successfully"

});

};