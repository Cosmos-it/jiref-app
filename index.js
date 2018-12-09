const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const db = require('./config/keys');
const users = require('./src/routes/api/users');
const posts = require('./src/routes/api/post');
const profile = require('./src/routes/api/profile');
const waitlist = require('./src/routes/api/waitlist');
const api_url = 'api.jiref.com';

/// express app
const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*************** Body parser middleware ************/
app.use(bodyParser.urlencoded({
  extended: true 
}));

app.use(bodyParser.json());

/************** Connecting to mongodb *****************/
mongoose.Promise = global.Promise;
const option = {
    useNewUrlParser: true
};

mongoose.connect(db.mongoUrl, option)
    .then(
        () => console.log(".... Connected ...."))
    .catch(error => console.log(error));
/************* Passport middleware ******************/
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
/**************API Routers ********************/
app.use(`/${api_url}/waitlist`, waitlist);
app.use(`/${api_url}/users`, users);
app.use(`/${api_url}/profile`, profile);
app.use(`/${api_url}/posts`, posts);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (request, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
/// port application is running on.
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Listening at port ${PORT}`));

let server = app;

module.exports = server;
