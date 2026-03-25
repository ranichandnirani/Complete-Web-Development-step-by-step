import { body } from "express-validator";

const userRegisterValidator = ()=> {
    return [
      body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid"),
      body("username")
        .trim()
        .isEmpty()
        .withMessage("username is required")
        .isLowercase()
        .withMessage("Username must be in lower case")
        .isLength({min: 3})
        .withMessage("Username must be at least 3 charecters long"),
      body("password")  
        .trim()
        .notEmpty()
        .withMessage("password is required"),
      body("fullname")
        .trim()
        .optional(),
    ];
};

export {
    userRegisterValidator
};