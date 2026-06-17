const mongoose = require("mongoose");

async function connectDB() {
    
    await mongoose.connect("mongodb://krishnampatil851_db_user:Krishnam%40851@ac-ukcaqoz-shard-00-00.8ikydy2.mongodb.net:27017,ac-ukcaqoz-shard-00-01.8ikydy2.mongodb.net:27017,ac-ukcaqoz-shard-00-02.8ikydy2.mongodb.net:27017/?ssl=true&replicaSet=atlas-ng4hil-shard-0&authSource=admin&appName=yt-backend")

    console.log("connected to db")

}

module.exports = connectDB

