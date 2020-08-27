const {Router} = require('express');
const Banks = require('../services/banks');
const Email = require('../services/email');
const asyncHandler = require('express-async-handler')

const router = new Router();

router.get('/', asyncHandler (async function (req, res) {
    const banks = await Banks.findBankbyid(req.currentUser.id);
    res.render('manage',{banks});
}));


module.exports = router;