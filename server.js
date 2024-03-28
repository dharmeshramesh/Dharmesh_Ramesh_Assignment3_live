global.loggedin=null;
global.usertype=null;
global.userid=null;
global.myMsg=null;
console.log("welcome");
import express from 'express'

import mongoose from 'mongoose'

import MongoStore from 'connect-mongo'

import session from 'express-session'

import isValidUser from './middlewares/validate.js'

import router from './routes/routes.js'

import {} from 'dotenv/config'

uri =process.env.MONGO_URI
//const express=require('express');

const app=express();

/*const path=require('path');

const bcrypt = require('bcrypt');*/

app.use(express.static('public'));

//const user=require('./models/userModel.js')

const uri = "mongodb+srv://dharmeshwayne:mB5ud4buFCiKElbu@cluster0.bqcmuyb.mongodb.net/Dharmesh_assignment?retryWrites=true&w=majority";

const session_store = MongoStore.create({
    mongoUrl : uri ,
    dbName : 'Dharmesh_assignment',
    collectionName : 'userSessions'
})

app.use(express.urlencoded({external:true}))

app.use(session({
  secret : 'A secret Key to sign the cookie',
  saveUninitialized : false ,
  resave : false,
  store : session_store
}))

app.use('*',(req,res,next)=>{
  loggedin=req.session.loggedin
  usertype=req.session.usertype
  userid=req.session.userid
  myMsg=req.session.msg
  next()
})
app.set('view engine','ejs');

const port =process.env.port || 8090
app.listen(port,()=>{
  console.log("server is listening at port ${port}");
});

app.use('/',router)

export default session
/*app.post('/insert',async(req,res)=>{
  try{
      const form_data=req.body;
      console.log(form_data)
      const emp_to_save=new user({
          firstname: form_data.fname,
          lastname: form_data.lname,
          licenceno: form_data.licence,
          age: form_data.age,
          car_details:{
            make: form_data.Make,
            model: form_data.Model,
            year: form_data.Year,
            plateno: form_data.PlateNumber
          }
      });
      const emp_saved= await emp_to_save.save();

      console.log(emp_saved);
      res.send(emp_saved);
     
  }catch(err){
      console.log(`Employee Not Inserted to Db due to the error below.\n ${err}`);
      res.send(err);
  }
})

app.get("/dashboard",(req,res)=>{
    res.render('dashboard');
});

app.get("/G2_Test",(req,res)=>{
  res.render('g2_test');
});

app.get("/G_Test",(req,res)=>{
  res.render('g_test',{data:"main",data2:null});
});

app.get("/Login",(req,res)=>{
  res.render('login',{data: "main"});
});

/*app.post("/login",async(req,res)=>{
  
  try{

    const form_data = req.body

    const existing_user = await userModel.findOne({email:form_data.email})

    if(!existing_user){
        req.session.msg = `${form_data.email} Please Signup First !!!`
      return   res.redirect('/signup')
    }

    const user_matched = await bcrypt.compare(form_data.pwd,existing_user.pwd)

    if(user_matched){

        req.session.isValid = true
        req.session.msg = `Welcome Dear ${existing_user.name} on Dasboard Page !!!`
      return  res.redirect('/dashboard')
    }
    else{

        req.session.msg = `Password is not Correct Dear ${existing_user.name}  !!!`             
      return  res.redirect('/login')
    }
}catch(err){

    console.log(err)
    res.send(err)
}
})

app.post("/signup",async (req,res)=>{

  try{
      
      const form_data = req.body

   

      console.log(form_data)

      // Cofirm that this is not an existing user

      let user1 = await user.findOne({email:form_data.email})

     /* if(user){

          req.session.msg = `${user.name} is an existing user please login !!!`
      
         return res.redirect('/login')
      
      }

      console.log(form_data.pwd)
      const hashedPwd = await bcrypt.hash(form_data.pwd,10)

      if(!user1){

          user1 = new user({
              firstname: "",
              lastname:  "",
              licenceno: "",
              age: "",
              username : form_data.uname,
              usertype : form_data.utype,
              password  : hashedPwd,
              car_details:{
                make: "",
                model: "",
                year: "",
                plateno: ""
              }
          })
         console.log(user1)
         const user_saved = await user1.save()

         console.log(user_saved)

        // req.session.msg = `Signup Successfull Please Login Dear  ${user.name} `
        
        return res.redirect('/login')

      }
   
    }catch(err){
      console.log(err)
      res.send(err)
  }


})

app.get("/loginform",(req,res)=>{
  res.render('login',{data: "loginform"});
});

app.get("/signupform",(req,res)=>{
  res.render('login',{data: "signupform"});
});

app.post('/G_Test',async (req,res)=>{
     const form_data= req.body;
     console.log(form_data.licenceno)
     const user_from_db = await user.findOne({licenceno:form_data.licenceno})
     console.log(user_from_db)
     res.render('g_test',{data:user_from_db,data2:null});
})

app.get('/edit/:licenceno',async(req,res)=>{

  try{
      const licenceno = req.params.licenceno
      //res.send(email)

      const user_from_db = await user.findOne({licenceno:licenceno})
    //  res.send(emp_from_db)

    res.render('g_test',{data:user_from_db,data2:user_from_db});
    }catch(err){

        res.send(err)
    }

})

app.post('/edit/:licenceno', async (req,res)=>{

  try{

   const licenceno_to_find_and_update = req.params.licenceno

   const user_edited = req.body

   console.log(user_edited)
   //console.log(licenceno);
      console.log("inside edit");
  
   // e_name=&e_con=&e_salary=&e_email=&e_jdate=

   // Note use new:true to get the updated Record

   // const updated_rec_from_db = await Model.findOneAndUpdate({filter}, {updated object}, {new: true});

   const user_updated_in_db = await  user.findOneAndUpdate({licenceno:licenceno_to_find_and_update},{
       car_details:{
        make :user_edited.make,

       model :user_edited.model,
   
       year : user_edited.year,
   
       plateno :  user_edited.Plateno
       }   
   },{
       new: true
    }    )

 console.log("======= ********* ========= **********")
   console.log(user_updated_in_db)
   console.log("======= ********* ========= **********")
   // For displaying the Updated Employee Record Use the line
   //  res.redirect('/show')

   // To pass the Updated Employee to updated_emp.ejs
   // res.render('updated_emp.ejs',{emp:emp_updated_in_db})
     
   res.render('g_test',{data:user_updated_in_db,data2:null});
  }catch(err){

   console.log(`Employee Not Updated in Db \n${err}`)
   res.send(err)
  }




})*/

