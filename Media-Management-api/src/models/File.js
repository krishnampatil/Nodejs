const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({

    originalName: String,

    storageType: String,

    fileType: String,

    mimeType: String,

    size: Number,

    path: String,

    url: String,

    publicId: String,

    imageData: Buffer

},

{

    timestamps: true

});

module.exports = mongoose.model("File", fileSchema);