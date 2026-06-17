const express = require("express");
const noteModel = require("./models/note.model")

const app = express();
app.use(express.json());

/*
post /notes = create a notes
get /notes = get all notes
delete /notes/:id = delete a note
update /notes/:id = update a note
*/

app.post("/notes", async (req, res) => {

    const data = req.body /* {title, description} */
    await noteModel.create({
        title: data.title,
        description: data.description
    })

    res.status(201).json({
        message: "note created"
    })

})

app.get("/notes", async (req, res) => {

     const notes = await noteModel.find()

    res.status(200).json({
        message: "notes fetched successfully",
        notes: notes
    })

})

app.delete("/notes/:id", async (req, res) => {

    const id = req.params.id

    await noteModel.findOneAndDelete({
        _id: id
    })
    
    res.status(200).json({
        message:"note deleted successfully"
    })

})

app.patch("/notes/:id", async (req, res) => {

    const id = req.params.id
    const description = req.body.description

    await noteModel.findOneAndUpdate({_id: id}, {description: description})

    res.status(200).json({
        message:"note updated successfully"
    })
})

module.exports=app
