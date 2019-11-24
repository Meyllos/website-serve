const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message:'super cool'
    });
});

router.post('/', (req, res, next) => {
    const outputHtml = `
            <p> Vous avez un nouveau message via MeyllOS</p>
            <h3> Detail du Message</h3>
            <ul>
              <li> Fullname : ${req.body.fullname}</li>
              <li> Email : ${req.body.email} </li>
              <li> Phone: ${req.body.phone}</li>
            </ul>
            <h3>Message</h3>
            <p>${req.body.message}</p>
    `
    const contacts = {
        from: req.body.email, // Sender address
        to: 'info@meyllos.com',         // List of recipients
        subject: `Contact from Meyllos web site by ${req.body.fullname}`, // Subject line
        html: outputHtml   //html to body
    }
    const transport = nodemailer.createTransport({
        host: "mail.infomaniak.com",
        port: 587,
        auth: {
          user: "info@meyllos.com",
          pass: "BBasabana@2019"
        }
    });
    transport.sendMail(contacts, function(err, info) {
        if (err) {
          console.log(err)
          res.status(404).json({
            message:'Erro, Email not send',
            error: err
        })
        } else {
            res.status(200).json({
                message: 'Email has been sent',
                response: info
                
            })
          console.log(info);
        }
    });
});


module.exports = router;