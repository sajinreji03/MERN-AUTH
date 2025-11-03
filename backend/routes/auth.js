import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router(); //routes like register login...

//Register
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try{
        if(!username || !email || !password) {
            return res.status(400).json({message: "Please enter all fields"});
        }

        const userExists = await User.findOne({email}); //user will exists
        if(userExists) {
            return res.status(400).json({message: "User already exists"});
        }

        const user = await User.create({
            username,
            email,
            password,
        });
         res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
         })

    } catch (error) {
        res.status(500).json({message: "server error"});
    }
});

//Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try{
         if( !email || !password) {
            return res.status(400).json({message: "Please enter all fields"});
        }
        const user = await User.findOne({email});

        if(!user || !(await user.matchPassword(password))){
            return res.status(401).json({message: "Invalid credentials"});
        }
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
        });

    } catch (error) {
        res.status(500).json({message: "server error"});
    }
})

//me
router.get("/me", protect, async (req, res) => {    //this route will send back the currently logged in users info, normally in this case 
                                              //  me router is not definied so we will use the protected and we will implemented in the middileware..
    res.status(200).json(req.user);

})
    

export default router;