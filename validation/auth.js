const validateRegister = [
    validator.body('fullname')
        .notEmpty().withMessage('Nama perlu diisi').bail()
        .isLength({min: 3}).withMessage('Nama minimal 3 karakter').bail()
        .isAlpha().withMessage('Nama hanya berisi huruf').bail()
        .trim().escape(),
    validator.body('email')
        .notEmpty().withMessage('Email perlu diisi').bail()
        .isEmail().withMessage('Email tidak valid').bail()
        .trim().escape().normalizeEmail(),
    validator.body('password')
        .notEmpty().withMessage('Password perlu diisi').bail()
        .isLength({min: 8}).withMessage('Password minimal 8 karakter').bail()
        .matches('[0-9]').withMessage('Password harus ada angka').bail()
        .matches('[A-Z]').withMessage('Password harus ada karakter kapital').bail()
        .trim().escape()
]

const validateLogin = [
    validator.body('email')
        .notEmpty().withMessage('Email perlu diisi').bail()
        .isEmail().withMessage('Email tidak valid')
        .trim().escape().normalizeEmail(),
    validator.body('password')
        .notEmpty().withMessage('Password perlu diisi')
        .trim().escape()
]

module.exports = {validateRegister, validateLogin}