import session from "express-session"

import user from "../models/userModel.js"

import bcrypt from 'bcrypt'
import { request } from "express"
class Controller{
    static insert_post=async(req,res)=>{
        try{
            const form_data=req.body;
            console.log(form_data)
            console.log("insise insert")
            const emp_to_save=await  user.findOneAndUpdate({_id:req.session.userid},{
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
            console.log(emp_to_save)
            res.redirect('/dashboard');
           
        }catch(err){
            console.log(`Employee Not Inserted to Db due to the error below.\n ${err}`);
            res.send(err);
        }
      }

    static login_get=(req,res)=>{
      delete req.session.msg
        res.render('login',{data:null});
      }
    
    static logout_get= (req,res)=>{
      req.session.destroy((err)=>{
        if(err)
        {
          throw err;
        }
        else{
          res.redirect('/login')
        }
    })
    }
    static login_post= async(req,res)=>{
  
        try{
      
          const form_data = req.body
          
          const existing_user = await user.findOne({username:form_data.uname})
          console.log(existing_user)
          if(!existing_user){
              req.session.msg = `${form_data.uname} Please Signup First !!!`
            return   res.redirect('/signupform')
          }
        
          const user_matched = await bcrypt.compare(form_data.pwd,existing_user.password)
      
          if(user_matched){
      
            req.session.isValid = true
            req.session.loggedin=true 
            req.session.userid=existing_user._id
            req.session.usertype=existing_user.usertype
            return  res.redirect('/dashboard')
          }
          else{
            req.session.msg = `Password is not Correct Dear ${existing_user.username}  !!!`              
            return  res.redirect('/login')
          }
      }catch(err){
      
          console.log(err)
          res.send(err)
      }
      }
    static dashboard_get=(req,res)=>{
        res.render('dashboard');
    }

    static g2_test_get= async (req,res)=>{
        let user1 = await user.findOne({_id:req.session.userid})
        res.render('g2_test',{user1})
    }

    static g_test_get= async (req,res)=>{
        let user1 = await user.findOne({_id:req.session.userid})
        res.render('g_test',{user1,data:"main",data2:null});
    }

    static signup_post= async (req,res)=>{

        try{
            
            const form_data = req.body
            console.log(form_data)
            // Cofirm that this is not an existing user
      
            let user1 = await user.findOne({username:form_data.uname})
      
           /* if(user){
      
                req.session.msg = `${user.name} is an existing user please login !!!`
            
               return res.redirect('/login')
            
            }*/
      
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
      
               req.session.msg = `Signup Successfull Please Login Dear  ${user1.username} `
              
              return res.redirect('/loginform')
      
            }
            else{
              req.session.msg = `${user1.username} is an existing user please login !!!`
              return res.redirect('/loginform')
            }
           
          }catch(err){
            console.log(err)
            res.send(err)
        }
      
      
      }
    
    static loginform_get= (req,res)=>{
      delete req.session.msg
        res.render('login',{data: "loginform"});
      }
    
    static signupform_get= (req,res)=>{
      delete req.session.msg
        res.render('login',{data: "signupform"});
      }
    
    static gtest_post= async (req,res)=>{
        const form_data= req.body;
        console.log(form_data.licenceno)
        const user_from_db = await user.findOne({licenceno:form_data.licenceno})
        console.log(user_from_db)
        res.render('g_test',{data:user_from_db,data2:null});
   }

   static edit_get= async(req,res)=>{

    try{
        const licenceno = req.params.licenceno
        //res.send(email)
  
        const user_from_db = await user.findOne({licenceno:licenceno})
      //  res.send(emp_from_db)
  
      res.render('g_test',{user1:user_from_db,data:user_from_db,data2:user_from_db});
      }catch(err){
  
          res.send(err)
      }
  
  }

  static edit_post= async (req,res)=>{

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
       
     res.render('g_test',{user1:user_updated_in_db,data:user_updated_in_db,data2:null});
    }catch(err){
  
     console.log(`Employee Not Updated in Db \n${err}`)
     res.send(err)
    }
  
  
  
  
  }
}

export default Controller