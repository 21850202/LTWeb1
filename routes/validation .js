const { body } = require('express-validator');

const validateRegisterUser = function() {
    return [
        body('username', 'username không được rỗng').not().isEmpty(),
        body('username', 'username phải là chữ và số').isAlphanumeric(),
        body('username', 'username hơn 6 chữ số').isLength({ min: 6 }),
        body('email', 'email không hợp lệ hoặc rỗng').not().isEmpty().normalizeEmail(),
        body('email', 'email phải hợp lệ').isEmail(),
        body('password', 'password ít nhất 6  chữ số').isLength({ min: 6 }),
        body('displayname', ' không được rỗng').trim().notEmpty(),
        body('identificationnumber', 'không được rỗng').trim().notEmpty(),
        body('identificationnumber', 'cmnd phải bằng 9 chữ số').isLength(9),
        body('DateRange', 'daterange phải là dạng ngày tháng năm').isISO8601('yyyy-mm-dd'),

    ];
}


const validateVerifyUser = function() {
    return [
        body('papers', 'không được rỗng').trim().notEmpty(),
        body('papers', 'cmnd phải bằng 9 chữ số').isLength(9),
    ];
}



const validate = {
    validateRegisterUser: validateRegisterUser,
    validateVerifyUser: validateVerifyUser,
};

module.exports = { validate };