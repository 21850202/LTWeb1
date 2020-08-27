const {Router} = require('express');
const Transaction = require('../services/transaction');
const Email = require('../services/email');
const asyncHandler = require('express-async-handler')

const router = new Router();

router.get('/', asyncHandler (async function (req, res) {
    const transaction = await Transaction.findAllTransactionhistory(req.currentUser.id);
    res.render('transaction',{transaction});
}));

module.exports = router;