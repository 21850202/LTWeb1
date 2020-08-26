const User =require('../services/user')
const Banks =require('../services/banks')
const asyncHandler = require('express-async-handler');

module.exports =asyncHandler( async function auth(req, res, next) {
    const userId= req.session.userId;
    res.locals.currentUser=null;
    res.locals.banks = null;
    if(!userId)
    {
        return next();
    }
    const user = await User.findById(userId);
    if(!user){
        return next();
    }
    const banks = await Banks.findBankbyid(user.id);

    req.currentUser= user;
    req.banks = banks;
    res.locals.banks = banks;
    res.locals.currentUser=user;
    next();
});