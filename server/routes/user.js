import express from "express";
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { validateRegisterInput } from "../validation/register.js";
import { validateLoginInput } from "../validation/login.js";
import { secretOrkey } from "../config.js";



const router=express.Router();



router.get('/api/news', async (req, res) => {
  const q = req.query.q;
  const API_KEY = '7d5570bb14064d98a720f7602030c7c9';
  const url = `https://newsapi.org/v2/everything?q=${q}&apiKey=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching news" });
  }
});


router.post('/register', async (req, res) => {
    try {
        const { errors, isValid } = validateRegisterInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            errors.email = 'Email already exist..';
            return res.status(409).json(errors);
        }

        const avatar = gravatar.url(req.body.email, {
            s: '200',
            r: 'pg',
            d: 'retro'
        });

        const newUser = {
            name: req.body.name,
            email: req.body.email,
            avatar,
            password: req.body.password,
            role: req.body.role // added role field
        };

        newUser.password = await bcrypt.hash(newUser.password, 10);
        const newRegister = await User.create(newUser);

        return res.status(200).json({
            name: newRegister.name,
            email: newRegister.email,
            avatar: newRegister.avatar,
            role: newRegister.role // optionally return role too
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});


// router.post('/register',async(req, res)=>{
//     try{

//         const{errors, isValid}=validateRegisterInput(req.body);

//         if(!isValid){
//             return res.status(400).json(errors);
//         }

//         const userExist=await User.findOne({email: req.body.email});
//         if(userExist){
//             // console.log('email already exist..');
//             errors.email='Email already exist..'
//             return res.status(409).json(errors);
//         }

//         // if(!req.body.email || !req.body.name || !req.body.password){
//         //     return res.status(400).send('Fill all required field');
//         // }
//             const avatar=gravatar.url(req.body.email,{
//                 s:'200',
//                 r:'pg',
//                 d:'retro'
//             });
//             const newUser={
//                 name: req.body.name,
//                 email: req.body.email,
//                 avatar,
//                 password: req.body.password,
//                 // password2:req.body.password2
//             };
//             newUser.password=await bcrypt.hash(newUser.password, 10);
//             const newRegister=await User.create(newUser);
//             // console.log(newRegister);
//             return res.status(200).json({
//                 name: newRegister.name,
//                 email:newRegister.email,
//                 avatar:newRegister.avatar,
//             });
            
//     }catch(error){
//         console.log(error);
//         return res.status(500).send(error);
//     }

// });


router.post('/login', async(req, res)=>{
    try{

        const{errors, isValid}=validateLoginInput(req.body);
        // const errors={};

        // const error={};

        if(!isValid){
            // console.log(errors);
            return res.status(400).json(errors);
        }

        const find=await User.findOne({email:req.body.email});
        if(!find){
            errors.email='User not found..';
            return res.status(500).json(errors);
        }
        const isMatch=await bcrypt.compare(req.body.password, find.password);
        if(isMatch){
            const payload={id:find.id, name:find.name, avatar:find.avatar, role:find.role};

            jwt.sign(payload, secretOrkey, {expiresIn: 3600}, (err, token)=>{
                res.json({
                    success: true,
                    token: 'bearer' +" "+token,
                    avatar:find.avatar,
                    user:{
                        email:find.email,
                        role:find.role
                    }
                });

            });


            
        }else{
            errors.password='Password not match';
            return res.status(500).send(errors);
        }



    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});




// Middleware: auth.js
// const auth = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ msg: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, secretOrkey);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ msg: 'Invalid or expired token' });
//   }
// };


// GET /user/me
router.post('/get-reporter', async (req, res) => {
  try {
    const { email } = req.body;

    const reporter = await User.findOne({ email, role: 'reporter' });
    if (!reporter) return res.status(404).json({ error: 'Reporter not found' });

    // Update lastActive every time this route is called
    reporter.lastActive = new Date();
    await reporter.save();

    res.json({
      name: reporter.name,
      email: reporter.email,
      reporterId: reporter.reporterId,
      address: reporter.address || '',
      firstActive: reporter.firstActive,
      lastActive: reporter.lastActive
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Update reporter address
router.post('/update-address', async (req, res) => {
  try {
    const { email, address } = req.body;

    const reporter = await User.findOne({ email, role: 'reporter' });
    if (!reporter) return res.status(404).json({ error: 'Reporter not found' });

    reporter.address = address;
    await reporter.save();

    res.json({ message: 'Address updated successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


// /api/users.js or wherever your route handlers are defined

router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const editors = await User.countDocuments({ role: 'editor' });
    const reporters = await User.countDocuments({ role: 'reporter' });

    res.json({ totalUsers, editors, reporters, visitors: 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});





export default router;