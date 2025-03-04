import mongoose, {model, Schema } from "mongoose";

mongoose.connect('mongodb://localhost:27017/brainlyDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

    const UserSchema = new Schema({
         username : {type: String, unique: true},
         password: String
})

export const UserModel =  model("User",UserSchema); 

