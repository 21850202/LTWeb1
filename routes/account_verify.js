const { Router } = require('express');
const Banks = require('../services/banks');
const User = require('../services/user');
const Email = require('../services/email');
const asyncHandler = require('express-async-handler');

const router = new Router();

router.get('/', asyncHandler(async function (req, res) {
    const user = await User.findAll({ where: { status: 0, isStaff: false } });
    res.render('account_verify', { user });
}));
router.get('/auth/:id', asyncHandler(async function (req, res) {
    const { id } = req.params;
    const user = await User.findOne({ where: {id} });
    await user.updatStatus();
    await Email.send(user.email,`Tài khoản của quý khách đã được xác nhận,quý khách có thể đăng nhận vào tài khoản`);
    return res.redirect('/account_verify');
   
}));
module.exports = router;