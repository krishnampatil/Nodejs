const express=require("express");

const router=express.Router();

const upload=require("../middleware/uploadMiddleware");

const controller=require("../controllers/fileController");

router.post(

"/upload/local",

upload.single("file"),

controller.uploadLocal

);

router.post(

"/upload/cloudinary",

upload.single("file"),

controller.uploadCloudinary

);

router.post(

"/upload/database",

upload.single("file"),

controller.uploadDatabase

);

router.get(

"/files",

controller.getFiles

);

router.get(

"/files/:id",

controller.getFile

);

router.get(

"/image/:id",

controller.getImage

);

router.delete(

"/files/:id",

controller.deleteFile

);

module.exports=router;