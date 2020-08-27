const { Router } = require('express');
const Banks = require('../services/banks');
const User = require('../services/user');
const Email = require('../services/email');
const asyncHandler = require('express-async-handler');

const router = new Router();

router.get('/:id', asyncHandler (async function (req, res) {
        if (req.session.payment != null) req.session.payment
        req.session.payment = req.params.id;
        res.redirect("/payment");
}));
router.get('/', asyncHandler (async function (req, res) {
    if(req.session.payment != null)
    {
        const banks = await Banks.findBankAccountNumber( req.session.payment);
        return res.render("payment",{banks});
    }
    return res.redirect("/searchaccount");
}));
router.post('/', asyncHandler (async function (req, res) {
    const banks = await Banks.findBankAccountNumber(req.session.payment);
    const Money = req.body.money;
    banks.Money = banks.Money + Number(Money);
    banks.save();
    res.redirect("/");
}));
module.exports = router;