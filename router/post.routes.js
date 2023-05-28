const router = require("express").Router();
const {SendMail} = require("../mails/mailgun.smtp");
const {Validate} = require("../validations/joi"); 
const mongooseModel = require("../models/index");
const Bcrypt = require("../validations/bcrypt");
const Jwt = require("../auth/jwt");

/* #############################################################################################################
        Post Route For Sending mail @ /send/email
   ###############################################################################################################*/
router.post("/send/email", async(req, res)=>{
    const {value,error} = Validate.email(req.body); 
    if(error) return res.json({error:error.details[0]});
    const email = await mongooseModel.Email(value);
     const saved = await email.save();
    SendMail(value,res);
});

/* #############################################################################################################
        Post Route for user registration @ /register
   ###############################################################################################################*/
router.post("/register", async(req,res)=>{
    const {value,error} = Validate.register(req.body);
    if(error) return (console.log(error), res.json({error:{message:error.details[0].message}}));
    const account = await mongooseModel.Users.findOne({email: value.email});
    if(account) return (res.json({error:{message:'user account already exist; please login'}}));
    value.password = await Bcrypt.hash(value.password);
    value['confirm password'] = await Bcrypt.hash(value['confirm password']);
    const newAccount =  (await mongooseModel.Register(value)).save();
    res.json({success:{message:"Registration Successful",url:"/form"}});
});

/* #############################################################################################################
        Post Route for user login @ /login
   ###############################################################################################################*/
router.post("/login", async(req,res)=>{
    const {value,error} = Validate.login(req.body); // validate form inputs using joi
    if(error) return (res.json({error:{message: error.details[0].message}})); // check for joi error
    const account = await mongooseModel.Users.findOne({email: value.email}); //look for user from mongodb database
    if(!account) return (res.json({error:{message:`account does not exist`}})); //check if user exist
    const isValidPassword = await Bcrypt.compare(value.password, account.password); // compare passwords
    if(!isValidPassword) return (res.json({error:{message:`Invalid login credentials`}}));// handle password error;
    const loginUser =  (await mongooseModel.Login(value)).save(); //create user instance
    const token = await Jwt.sign(loginUser.email); // generate jsonwebtoken
    const route = await mongooseModel.route.findOne({path:"path"});
    req.session.isLoggedIn = true;
    res.json({success:{message:"Login successful",url:"/"}});
});
/* #############################################################################################################
        End of Validation
   ###############################################################################################################*/


/* #############################################################################################################
        Export router
   ###############################################################################################################*/
module.exports = router;