const { Router }=require('express')
const User = require('../services/user');
const asyncHandler = require('express-async-handler');
const Email = require('../services/email');

const router = new Router();

router.get('/',function(req,res) {
    res.render('resetPass');
})

router.post('/', asyncHandler (async function(req,res) {
    const email = req.body.email;
    const {password, confimpassword,code} = req.body;
    console.log(user);
    if(password != confimpassword) {
        return res.redirect('/resetPass');
    }
    else {
        if(code == user.codeForgot) {
            user.password = User.hashPassword(password);
            user.codeForgot = null;
            user.save();
            return res.redirect('/login')
        }
    }
    return res.redirect('/resetPass');
}))
module.exports = router;