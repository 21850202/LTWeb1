const {Router} = require('express');
const router = new Router();
const Interest  = require('../services/inteRestate');
const Save = require('../services/save');
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const Email = require('../services/email');

router.use(require('../middlewares/requireLoggedIn'));


var today = new Date();
var time = today.getDate() +  "-" + today.getMonth() + "-" + today.getYear() + "   " +  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

router.get('/', asyncHandler (async function (req, res) {
    const interest = await Interest.find();
    res.render('save',{interest});
}));
router.post('/', asyncHandler(async function (req, res) {
    const {term,money} = req.body;
    const interest = await Interest.findid(term);
    //Tạo tài khoản tiết kiệm   
    //console.log(req.banks.Money);
    if(req.banks.Money >= money) {
       const s =  await Save.create({
        code: crypto.randomBytes(3).toString('hex').toUpperCase(),
        Money: money,
        interestRate: interest.interest,
        term: interest.id,
        nameTerm: interest.Name,
        sentDate:  Date.now() ,
        userId:  req.currentUser.id,
    })
        req.banks.Money = req.banks.Money - money;
        req.banks.save();

        await Email.send( req.currentUser.email,'SAVE',`Tài khoản tiết kiệm được mở ${s.code} với số tiền gửi: ${money}VNĐ. Số dư tài khoản : ${req.banks.accountNumber} còn ${req.banks.Money}VNĐ vào lúc ${time}`) 

    } else {
        war = 'Tài khoản không đủ';
        res.render('save',{war});
    }
    if(req.session.status != null) req.session.status = null;
    req.session.status = "Mở tài khoản tiết kiệm thành công";
    return res.redirect('/notification');
}));

module.exports = router;