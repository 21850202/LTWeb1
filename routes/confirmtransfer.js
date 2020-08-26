const {Router} = require('express');
const Banks = require('../services/banks')
const Transaction = require('../services/transaction');
const Email = require('../services/email');
const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const { access, accessSync } = require('fs');

const router = new Router();

router.get('/', asyncHandler (async function (req, res) {
    if(req.currentUser && req.currentUser.isStaff) {
      return res.redirect('/');
    }
    const tra = req.session.tra;
    res.render('confirmtransfer', {tra});
}));
router.post('/', asyncHandler(async function (req, res) {
const tra = req.session.tra;
const accountSender = await Banks.findBankAccountNumber(tra.accountSender);
const accoutnReceiver = await Banks.findBankAccountNumber(tra.accountReceiver);
   if(req.body.code == req.session.tra.code)
    {
       accountSender.Money =  accountSender.Money - Number(tra.money) - Number(tra.fee);
       accoutnReceiver.Money = accoutnReceiver.Money +  Number(tra.money);
       tra.status = "Giao dịch thành công"
       accountSender.save();
       accoutnReceiver.save();
      await Email.send(req.currentUser.email,'Bạn vừa chuyển tiền vào tài khoản',`${tra.accountReceiver} với số tiền là ${tra.money} VND`);
    }
    else {
        return res.redirect("/transfer");
    }
    return res.redirect("/")
}));

module.exports = router;
