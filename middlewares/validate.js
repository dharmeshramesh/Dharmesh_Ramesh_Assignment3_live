const isValidUser = (req,res,next)=>{

    if(req.session.isValid && req.session.usertype == "driver"){
        next()
    }
    else{
        res.redirect('/dashboard')
    }

}

export default isValidUser