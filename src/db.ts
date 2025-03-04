import {model, Schema } from "mongoose";

const UserModel = new Schema({
         username : {type: String, unique: true},
         password: String
})

export const UserSchema =  model("User",UserModel); 

