const router = require('express').Router();
const User = require('../user/user-model')
const db = require('../db/db');
const user = require('../user/user-model');
const bcrypt = require('bcrypt');
var ObjectId = require('mongodb').ObjectId; 
const {mailsending} = require('../middleware/mailer')

router.post('/register', async(req, res) => {

   try {
    const userDetails = req.body;
    console.log(userDetails);

    const mailData ={
        to: userDetails.email,
        subject:"Welcome Email",
        filename: "index.ejs",
        details:{name:userDetails.name},
    };

    let {name, email, password} = req.body
    console.log({name, email, password});
    if(name && email && password){
    let emailData = await User.findOne({email : req.body.email}).exec()
    if(!emailData){

        const user = new User(req.body)
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)
        user.save()

        let html = `<h1>Email Confirmation</h1>
        <p>Please click the lick to activate your account</p>
        <a href= http://localhost:9000/user/verify?email=${email}> click here </a>`

       // await sendEmail(email, "Verify Email", html)

        mailsending(mailData);

        res.status(200).json({status: false, message:"User registered successfully"})
 
    } else {
        res.status(200).json({status: false, message:"User already exists pls Login"})
    }
    } else {
        res.status(200).json({status: false, message:"please enter all the values"})
    }

   } catch(error) {
      console.log(error)
   }
})

router.get('/verify', async(req,res)=>{

    let email = await User.findOne({email : req.query.email}).exec()
    if(email){
        let status = await User.findOneAndUpdate({email : req.query.email}, {active : true}, {new : true}).exec();
        if(status){
            res.status(200).send({message:"Email verified successfully"})
        } else {
            res.status(200).send({message:"Please update your email id"})
        }
    }
})


module.exports = router;