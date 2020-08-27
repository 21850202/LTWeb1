const { Router } = require('express')
const User = require('../services/user');
const asyncHandler = require('express-async-handler');


const router = new Router();
var Recaptcha = require('express-recaptcha').RecaptchaV2;

var recaptcha = new Recaptcha('6LdEpboZAAAAAF2KjGfoH_02pmR9WFyTtFynQs6F', '6LdEpboZAAAAAPzGYUDN_blzehSWLvVrbkzR8klA');
router.get('/', recaptcha.middleware.render, function (req, res) {
    if (req.currentUser) {
        res.redirect('/');
    }
    res.render('login', { captcha: res.recaptcha });
});
router.post('/', recaptcha.middleware.verify, (async function postLogin(req, res) {
    const user = await User.findByUsername(req.body.username);
    //Không tìm thấy username
    if (!req.recaptcha.error) {
        if (!user || !User.verifyPassword(req.body.password, user.password)) {
            return res.render('login');
        }
    if (user.status == 0) {
            delete req.session.userId;
           return res.render('login',{error: 'Tài khoản của quý khách chưa được kích hoạt',page_name: 'login'});
    }
        req.session.userId = user.id;
        res.redirect('/');
    }
    else {
        return res.render('login');
    }

}));

router.get('/:id/:token', asyncHandler(async function (req, res) {
    const { id, token } = req.params;
    const user = await User.findById(id);
    if (user && user.token === token) {
        user.token = null;
        user.save();
        req.session.userId = user.id;
    }
    res.redirect('/');
}))

//password của admin : $2b$10$M9fSIUkkN4F6dFekpzpKKOupRE2TljhcQV8cSTzyXlN2u3uOCIJky;
module.exports = router;