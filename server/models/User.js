import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
const userSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    avatar:{
        type:String
    },
    role: {
        type: String,
        enum: ['user', 'editor', 'reporter', 'admin'],
        default: 'user',
        required: true
    },
    reporterId: {
    type: String,
    unique: true,
    sparse: true
  },
  address: {
    type: String
  },
  firstActive: Date,
  lastActive: Date,
  date: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', function (next) {
  if (this.isNew && this.role === 'reporter') {
    this.reporterId = `REP-${uuidv4().split('-')[0].toUpperCase()}`;
    this.firstActive = new Date();
  }
  next();
});

export const User=mongoose.model('users', userSchema);