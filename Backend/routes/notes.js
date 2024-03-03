const express = require("express");
const Notes = require("../modules/Notes");
const fetchuser = require("../middleware/fetchuser");
const { query, validationResult, body } = require("express-validator");
const router = express.Router();

// Route 1: Get All Notes using :GET "/api/notes/fetchallnotes".Login required.

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(401).json({ error: "Internal server error" });
  }
});

// Route 2: Add Notes using :POst "/api/notes/addNote".Login required.
router.post("/addnotes",fetchuser,[
          body("title", "Enter a valid title").isLength({ min: 3 }),
          body("description", "Description must be at least 5 characters").isLength({ min: 5 }),
        ],
        async (req, res) => {
          try {
            const { tag, title, description } = req.body;
            // If there are errors, return the bad request and the error
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({ title, description, tag, user: req.user.id });
            const savedNote = await note.save();
            res.json(savedNote);
          } catch (error) {
            res.status(401).json({ error: "Internal server error" });
          }
        }
      );


// Route 3: Update an existing note  using :PUT "/api/notes/updatenotes/:id. Login required.

router.put("/updatenotes/:id",fetchuser,async(req,res)=>{
        try {
        
        const {title,tag,description}=req.body;
        //Create a new note object
        const newNote={}
        if (title){
                newNote.title=title 
        }
        if (description){
                newNote.description=description
        }
        if (tag){
                newNote.tag=tag
        }
        //find the note to be updated and update it
        let note=await Notes.findById(req.params.id);
        if(!note){
              return  res.status(404).send("Not Found")

        }
        if(note.user.toString()!== req.user.id){
                return res.status(401).send("Not Allowed")

        }
        note=await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
        res.json({note})
                
} catch (error) {
                res.status(401).json({error:"Internal server error"})
}
}
)

// Route 3: Deleting an existing note  using :Delete "/api/notes/deletenotes/:id. Login required.

router.delete("/deletenotes/:id",fetchuser,async(req,res)=>{

        try {
                //find the note to be deleted and delete it
        let note=await Notes.findById(req.params.id);
        if(!note){
              return  res.status(404).send("Not Found")

        }
        //Allow deletion only if user owns this note
        if(note.user.toString()!== req.user.id){
                return res.status(401).send("Not Allowed")

        }
        note=await Notes.findByIdAndDelete(req.params.id)
        res.json("Success: Note has been deleted")
} catch (error) {
                res.status(401).json({error: "Internal server error"})
}
}
)
module.exports = router;
