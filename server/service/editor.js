import { User } from "../models/User.js";
import bcrypt from 'bcryptjs';

export const createEditorAccount=async()=>{
    try{
        const existAdmin=await User.findOne({email:"support@blendpilot.space"});
        if(!existAdmin){
            const newAdmin={
                name:"Editor",
                email:"support@blendpilot.space",
                password: await bcrypt.hash("editor@123",10),
                role:"editor"
            }
            const createAdmin=await User.create(newAdmin);
            console.log(createAdmin);
        }else{
            console.log("Editor already exist..");
        }

    }catch(error){
        console.log(error);
    }
}