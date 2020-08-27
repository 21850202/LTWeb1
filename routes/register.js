const { Router } = require('express')
const User = require('../services/user');
const Banks = require('../services/banks');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const Email = require('../services/email');
const requireLogged = require('../middlewares/auth');

const router = new Router();
router.use(requireLogged);

router.get('/', function (req, res) {
    if(req.currentUser) {
       return res.redirect('/');
    }
    res.render('register');
});

router.post('/', [
    body('username')
    .notEmpty()
    .isLength({ min: 3 })
    .custom(async function(username) {
        const found = await User.findByUsername(username);
        if (found) {
            throw Error('Username exists');
        }
        return true;
    }),
    body('email')
    .isEmail()
    .normalizeEmail()
    .custom(async function(email) {
        const found = await User.findByEmail(email);
        if (found) {
            throw Error('Email exists');
        }
        return true;
    }),
    body('displayName')
    .trim()
    .notEmpty(),
    body('password')
    .isLength({ min: 3 }),
    body('confirmpassword')
    .isLength({ min: 3 }),
], asyncHandler(async function Register(req, res) {
    const errors = validationResult(req);
    //console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(422).render('register', { errors: errors.array() });
    }
    const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName,
        password: User.hashPassword(req.body.password),
        confirmpassword: req.body.confirmpassword,
        identification: req.body.identification,
        identificationnumber: req.body.identificationnumber,
        DateRange: req.body.DateRange,
        avatar: 'abcccc',
        token: crypto.randomBytes(3).toString('hex').toUpperCase(),
    });
    const banks = await Banks.create({
        accountNumber: crypto.randomBytes(6).toString('hex').toUpperCase(),
        openday: Date.now(),
        userId: user.id,
    });
    await Email.send(req.body.email,`Qúy khách đã đăng ký tài khoản thành công. Xin vui lòng chờ nhân viên ngân hàng kích hoạt tài khoản của quý khách`);
   return res.render('notification');
}));

module.exports = router;