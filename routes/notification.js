const {Router} = require('express');
const router = new Router();
const asyncHandler = require('express-async-handler');

router.get('/', asyncHandler(async function (req, res) {
    res.render("notification")
}));
/*
router.post('/', asyncHandler(async function (req, res) {
    res.render('login');
}));
*/
module.exports = router;