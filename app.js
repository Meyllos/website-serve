const express = require('express');
const app     = express();
const morgan  = require('morgan');
const bodyParser = require('body-parser');

const contactRoutes = require('./api/routes/contact');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE')
        return res.status(200).json({});
    }
    next();
  
  });

// call Router should handle request
app.use('/api/contacts', contactRoutes);



app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status= 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500 );
    res.json({
        error : {
            message : error.message
        }
    });
})




module.exports = app;