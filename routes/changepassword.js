const { Router }=require('express')
const User = require('../services/user');
const asyncHandler = require('express-async-handler');
const Email = require('../services/email');

const router = new Router();

router.get('/',function(req,res) {
    res.render('changepassword');
})

router.post('/', asyncHandler (async function(req,res) {
    const user = await User.findById(req.currentUser.id);
    const {passwordOld, passwordNew,confimpassword} = req.body;
    if(passwordNew != confimpassword) {
        return res.redirect('/changepassword');
    }
   if(!User.verifyPassword(passwordOld,user.password))
   {
    return res.redirect('/changepassword');
   }
   user.password = User.hashPassword(passwordNew);
   user.save();
   return res.redirect('/logout')
}))
module.exports = router;