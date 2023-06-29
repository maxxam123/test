const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Update user
router.put("/:id", async(req,res)=>{
    if (req.body.userId == req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status().json(err);
        }
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id,
            {$set:req.body,
        });
        res.status(200).json("updated");
    }catch(err){
        return res.status(500).json(err);
    }
    } else {
        return res.status(403).json("can not update")
    }
});

// Delete user
router.delete("/:id", async(req,res)=>{
    if (req.body.userId == req.params.id || req.body.isAdmin){
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("deleted");
    }catch(err){
        return res.status(500).json(err);
    }
    } else {
        return res.status(403).json("can not delete")
    }
});

// Get user
router.get("/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password,upateAt, ...other} = user._doc
        res.status(200).json(other)
    } catch {
        res.status(500).json(err)
    }
})

module.exports = router