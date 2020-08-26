module.exports = function requireLoggedIn(req,res,next){
    if(!req.currentUser){
       return res.redirect('/');
    }else if(req.currentUser.block == true){
        delete req.session.userId;
        return res.redirect('/warning');
    } 
    else{
        next();
    }
}

/*
const User =require('../services/user')
const asyncHandler = require('express-async-handler');

module.exports =asyncHandler( async function auth(req, res, next) {
    const userId= req.session.userId;
    res.locals.currentUser=null;
    if(!userId)
    {
        return next();
    }
    const user = await User.findById(userId);
    if(!user){
        return next();
    }
    req.currentUser= user;
    res.locals.currentUser=user;
    next();
});
*/