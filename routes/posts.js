const router = require("express").Router();
const Post = require("../models/Post")
const User = require("../models/User")

router.post("/", async (req,res)=>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err)
    }
})

// Update post ORIGINAL
router.put("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId){
        await post.updateOne({$set:req.body});
        res.status(200).json("updated")
    }else{
        res.status(403).json("can not update");
    }
    }catch(err){
        res.status(500).json(err);
    }
});

// Update post MODIFIED
router.put("/modify/:userId", async (req,res)=>{
    try{
        const post = await Post.findOne({ name: req.params.userId });
        await post.updateOne({$set:req.body});
        res.status(200).json("updated")
    }catch(err){
        res.status(500).json(err);
    }
});

// Delete post NEW via username
router.delete("/delete/:userId", async (req,res)=>{
    try{
        const post = await Post.findOne({ name: req.params.userId });
        await post.deleteOne();
        res.status(200).json("deleted")
    }catch(err){
        res.status(500).json(err);
    }
});

// Delete post ORIGINAL
/* router.delete("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId){
        await post.deleteOne();
        res.status(200).json("deleted")
    }else{
        res.status(403).json("can not delete");
    }
    }catch(err){
        res.status(500).json(err);
    }
}); */

// Timeline posts
router.get("/timeline/:id", async (req, res) => {
    try{
        const aPosts = await Post.find({ userId: req.params.id})
        res.json(aPosts)
    }catch (err) {
        res.status(500).json(err);
    }
})

// Test get one post
router.get("/:id", async (req,res)=>{
    try{
        const user = await Post.findById(req.params.id);
        res.status(200).json(user)
    } catch {
        res.status(500).json(err)
    }
})

module.exports = router;