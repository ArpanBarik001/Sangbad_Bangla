import { User } from "../models/User.js";
import bcrypt from 'bcryptjs';

export const createAdminAccount=async()=>{
    try{
        const existAdmin=await User.findOne({email:"info@sangbadbangla.news"});
        if(!existAdmin){
            const newAdmin={
                name:"Admin",
                email:"info@sangbadbangla.news",
                password: await bcrypt.hash("admin@123",10),
                role:"admin"
            }
            const createAdmin=await User.create(newAdmin);
            console.log(createAdmin);
        }else{
            console.log("Admin already exist..");
        }

    }catch(error){
        console.log(error);
    }
}