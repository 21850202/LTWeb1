const { Router } = require('express')
const User = require('../services/user');
const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const Email = require('../services/email');

const router = new Router();

router.get('/', function(req, res) {
    res.render('forgot');
});

router.post('/', asyncHandler(async function(req, res) {
    req.session.email = req.body.email;
    console.log(req.session.email);
    user = await User.findByEmail(req.body.email);
    user.codeForgot = crypto.randomBytes(3).toString('hex').toUpperCase();
    user.save();
    await Email.send(user.email, 'Mã xác nhận quên mật khẩu: ', `${user.codeForgot}`);
    res.redirect('/resetPass');
}))
module.exports = router;