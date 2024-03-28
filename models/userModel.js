import mongoose from "mongoose";
//const mongoose=require("mongoose");

const url="mongodb+srv://dharmeshwayne:mB5ud4buFCiKElbu@cluster0.bqcmuyb.mongodb.net/Dharmesh_assignment?retryWrites=true&w=majority";

const uri = process.env.MONGO_URI;
mongoose.connect(url).then(()=>console.log("*********connected to mongoDB************"))
.catch((err)=>{console.log(`connection failed due to the error below. \n${err}`)});

const userSchema = mongoose.Schema({
    firstname: {type:String},
    lastname: {type:String},
    licenceno: {type:String,unique:true},
    age: {type:Number},
    username:{type:String},
    password:{type:String},
    usertype:{type:String},
    car_details: {make:{type:String},
                   model:{type:String},
                   year: {type:String},
                   plateno: {type:String}}
});

const userModel=mongoose.model('g2_user_data',userSchema);
//module.exports= g2Model;

export default userModel;
    