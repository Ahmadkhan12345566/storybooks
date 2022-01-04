const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const  connectDB = require('./config/db');
const morgan = require('morgan');
const passport =require('passport');
const session =require('express-session');

const expbhs = require('express-handlebars');

connectDB();


//Load config
dotenv.config({path:'./config/config.env'})

//Passport config
require('./config/passport')(passport);

const app = express();

//Logging
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}


//Handlebars

app.engine('.hbs',expbhs.engine({extname: '.hbs'}));
app.set('view engine','.hbs');

//Express middleware
app.use(session({
    secret: 'key_cart',
    resave: false,
    saveUninitialized: false
}))


//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


//Static folder
app.use(express.static(path.join(__dirname,'public')))

//Routes
app.use('/',require('./routes/index'));
app.use('/auth',require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server running ${process.env.NODE_ENV} on port ${PORT}`));
