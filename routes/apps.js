const router = require("express").Router();
const Post = require("../models/Post")
const User = require("../models/User")
const App = require("../models/App")

router.post("/", async (req,res)=>{
    const newApp = new App(req.body)
    try{
        const savedApp = await newApp.save();
        res.status(200).json(savedApp);
    }catch(err){
        res.status(500).json(err)
    }
})

// Delete post NEW via username
router.delete("/delete/:userId", async (req,res)=>{
    try{
        const app = await App.findOne({ name: req.params.userId });
        await app.deleteOne();
        res.status(200).json("deleted")
    }catch(err){
        res.status(500).json(err);
    }
});

// Timeline posts
router.get("/timeline/:id", async (req, res) => {
    try{
        const aApps = await App.find({ userId: req.params.id})
        res.json(aApps)
    }catch (err) {
        res.status(500).json(err);
    }
})

// Test get one post
router.get("/:id", async (req,res)=>{
    try{
        const app = await App.findById(req.params.id);
        res.status(200).json(app)
    } catch {
        res.status(500).json(err)
    }
})

// Timeline posts
router.get("/timeline/all/:id", async (req, res) => {
    try{
        const aPosts = await App.find({ desc: req.params.id})
        res.json(aPosts)
    }catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
