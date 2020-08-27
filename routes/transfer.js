
const {Router} = require('express');
const router = new Router();
const Banks = require('../services/banks')
const Transaction = require('../services/transaction');
const Email = require('../services/email');
const crypto = require('crypto');
const asyncHandler = require('express-async-handler')
router.get('/', asyncHandler (async function (req, res) {
    if(req.currentUser && req.currentUser.isStaff) {
       return res.redirect('/');
    }
    const bank = await Banks.findBankbyid(req.currentUser.id);
    res.render('transfer',{bank});
}));

router.post('/', asyncHandler(async function (req, res) {
    const {accountNumber, Money, content} = req.body;
    var tra;
    const accoutnSend =  await Banks.findBankbyid(req.currentUser.id);
    const accoutnReceiver = await Banks.findBankAccountNumber(accountNumber);
    if(accoutnSend.Money >=   (Number(Money) + 1000) ) {
        tra = await Transaction.create({
        iscode: crypto.randomBytes(3).toString('hex').toUpperCase(),
        accountSender: accoutnSend.accountNumber,
        accountReceiver: accoutnReceiver.accountNumber,
        nameReceiver: accoutnReceiver.user.displayName,
        money: Money,
        date: Date.now(),
        fee: 1000,
        content:content,
        status: "Giao dịch thành công",
        code: crypto.randomBytes(3).toString('hex').toUpperCase(),
        userId: req.currentUser.id,
    })
    await Email.send(req.currentUser.email, 'Mã kích hoạt chuyển tiền: ', `${tra.code}`);
    } else {
        console.log("So tien khong du");
        res.redirect('/');
    }
    if(req.session.tra != null) {
        req.session.tra = null;
    }
        req.session.tra = tra;
    console.log(req.session.tra = tra);
    res.redirect("/confirmtransfer");
    

}));
module.exports = router;
