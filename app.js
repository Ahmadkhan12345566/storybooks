const express = require('express');
const dotenv = require('dotenv');
const  connectDB = require('./config/db');
const morgan = require('morgan');
connectDB();


//load config
dotenv.config({path:'./config/config.env'})

const app = express();

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}


const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server running ${process.env.NODE_ENV} on port ${PORT}`));
