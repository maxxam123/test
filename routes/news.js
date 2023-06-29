const router = require("express").Router();
const Post = require("../models/Post")
const User = require("../models/User")
const App = require("../models/App")
const New = require("../models/New")

router.post("/", async (req,res)=>{
    const newApp = new New(req.body)
    try{
        const savedApp = await newApp.save();
        res.status(200).json(savedApp);
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;
