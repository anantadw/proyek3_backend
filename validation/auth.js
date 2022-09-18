const validator = require('express-validator')

const validateRegister = [
    validator.body('fullname')
        .exists().withMessage('Fullname doesn\'t exist').bail()
        .notEmpty().withMessage('Fullname is required').bail()
        .isLength({min: 3}).withMessage('Fullname must be at least 3 characters').bail()
        .isAlpha().withMessage('Fullname must contain only letter').bail()
        .trim().escape(),
    validator.body('email')
        .exists().withMessage('Email doesn\'t exist').bail()
        .notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage('Email is not valid').bail()
        .trim().escape().normalizeEmail(),
    validator.body('password')
        .exists().withMessage('Password doesn\'t exist').bail()
        .notEmpty().withMessage('Password is required').bail()
        .isLength({min: 6}).withMessage('Password must be at least 6 characters').bail(),
    validator.body('repeatpassword')
        .exists().withMessage('Repeat password doesn\'t exist').bail()
        .notEmpty().withMessage('Repeat password is required').bail()
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Repeat password doesn\'t match Password')
            }

            return true
        })
]

const validateLogin = [
    validator.body('email')
        .exists().withMessage('Email doesn\'t exist').bail()
        .notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage('Email is not valid')
        .trim().escape().normalizeEmail(),
    validator.body('password')
        .exists().withMessage('Password doesn\'t exist').bail()
        .notEmpty().withMessage('Password is required')
]

module.exports = {validateRegister, validateLogin}