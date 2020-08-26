const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const db = require('./services/db');
const port = process.env.PORT || 3000;

const app = express();

//cookie session
app.use(cookieSession({
    name: 'session',
    keys: ['123456'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
}))


app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));


//Auth middlewares
app.use(require('./middlewares/auth'))
    //app.use(require('./middlewares/requireLoggedIn'))

//Routes
app.get('/', require('./routes/index'));
app.use('/login', require('./routes/login'));
app.use('/forgot', require('./routes/forgot'));
app.use('/resetPass', require('./routes/resetPass'));
app.use('/transfer', require('./routes/transfer'));
app.use('/payment', require('./routes/payment'));
app.use('/confirmtransfer', require('./routes/confirmtransfer'));
app.get('/transferothers', require('./routes/transferothers'));
app.use('/manage', require('./routes/manage'));
app.use('/transaction', require('./routes/transaction'));
app.use('/account_verify', require('./routes/account_verify'));
app.use('/searchaccount', require('./routes/searchaccount'));
app.use('/save', require('./routes/save'));
app.use('/notification', require('./routes/notification'));
app.use('/notification2', require('./routes/notification2'));
app.use('/accountsave', require('./routes/accountsave'));
app.use('/changepassword', require('./routes/changepassword'));
app.use('/register', require('./routes/register'));
app.get('/logout', require('./routes/logout'));


db.sync().then(function() {
    app.listen(port);
    console.log(`Server is listening on port ${port}`);
}).catch(function(err) {
    console.error(err);
});