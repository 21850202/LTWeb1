const { Router } = require('express');
const Banks = require('../services/banks');
const User = require('../services/user');
const Email = require('../services/email');
const asyncHandler = require('express-async-handler');
const { findById } = require('../services/user');


const router = new Router();

router.get('/', asyncHandler(async function (req, res) {
    const banks = await Banks.findBanksAllUser();
    res.render('searchaccount',{banks});
}));

router.post('/', asyncHandler(async function (req, res) {
    var banks
    const name = req.body.name;
    if(!name) {
       return res.redirect('/searchaccount');
    }

    banks = await Banks.findUserName(name);
    console.log(banks);
    if(banks.length != 0 ) {
        return res.render('searchaccount',{banks});
    }

    banks = await Banks.findByEmail(name);
    //console.log(banks);
    if(banks.lenght != 0) {
        return res.render('searchaccount',{banks});
    }
    return res.render('searchaccount',{banks});
}));
module.exports = router;