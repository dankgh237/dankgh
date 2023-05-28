const joi = require("joi");

class Validate{
    /* #############################################################################################################
        Email field validation
   ###############################################################################################################*/
    static emailSchema = joi.object(
        {
            name: joi.string().min(3).max(120).required(),
            email:joi.string().min(3).max(120).required().email(),
            subject:joi.string().min(3).max(100).required(),
            message:joi.string().min(3).required(),
        }
    );
    static email = (req_body)=>{
        return  this.emailSchema.validate(req_body);
     };
     /* #############################################################################################################
        Registration field validation
   ###############################################################################################################*/
     static registerSchema = joi.object(
        {
            firstname: joi.string().min(3).max(120).required(),
            lastname: joi.string().min(3).max(120).required(),
            email:joi.string().email().min(3).max(120).required(),
            password:joi.string().min(3).max(100).required(),
            "confirm password":joi.any().equal(joi.ref('password'))
            .required().messages({'any.only':'{{#label}} does not match'})
        }
    );
    static register = (req_body)=>{
        return  this.registerSchema.validate(req_body);
     };
    /* #############################################################################################################
        Login field validation
   ###############################################################################################################*/
     static loginSchema = joi.object(
        {
            email:joi.string().min(3).max(120).required().email(),
            password:joi.string().min(3).max(100).required(),
        }
    );  
    static login = (req_body)=>{
        return  this.loginSchema.validate(req_body);
     };

}
/* #############################################################################################################
        End of Validation
   ###############################################################################################################*/

module.exports = {Validate}

