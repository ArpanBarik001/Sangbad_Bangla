import express from "express";
import { Mongodb_Url } from "./config.js";
import mongoose from "mongoose";
import user from './routes/user.js';
import cors from 'cors';
import { createAdminAccount } from "./service/admin.js";
import { createEditorAccount } from "./service/editor.js";
const app=express();

const port=process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

createAdminAccount();
createEditorAccount();

app.use('/user', user);





mongoose.connect(Mongodb_Url)
.then(()=>{
    console.log('Succesfully Connected...');
    app.listen(port, ()=>{
        console.log(`Server is listening ${port}`);
    });

})
.catch((error)=>{
    console.log(error);
})