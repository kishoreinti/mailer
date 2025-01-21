var nodemailer = require('nodemailer');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(cors());

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '<--Enter your mail id here-->',
        pass: '<--enter your pass code here>'
        //passcode should be created at your google account with app name
    }
});

app.post('/send', function (req, res) {
    var mailOptions = {
        from: '<--your mail id-->',
        to: req.body.to,
        subject: req.body.subject,
        html: '<h1>Welcome</h1><p>' + req.body.message + '</p>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).send({ response: 'Error: ' + error });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send({ response: info.response });
        }
    });
});

app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
