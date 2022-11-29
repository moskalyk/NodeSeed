const log = require('../utils/logger.js');
require('dotenv').config();
const nodemailer = require('nodemailer');
const cards = require('../cards/index.js')

const accountSid = process.env.ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.AUTH_TOKEN; // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

let transport = nodemailer.createTransport({
   host: "smtp.zoho.com",
   port: 465,
   secure: true,
   auth: {
     user: process.env.EMAIL_USERNAME,
     pass: process.env.EMAIL_PASSWORD
   }
});

/**
 * Simple index return
 * @returns {Object}    Returns a greeting
 */
async function index(req, res, next) {
  try { 
    log.info("Loggin Howdie Ho");
    res.send({msg: "🜒"});
    return next();
  }catch(e) {
    res.status(500).send({error: "Error"});
    return next(e);
  }
}

/*
* Simple Emailer function
*/
async function email(req,res,next) {
  try{
    log.info("Safety first")
    log.info(req.body)
    const mailOptions = {
         from: 'build@deep6.org', // Sender address
         to: req.body.email, // List of recipients
         subject: '♆ Thanks for playing, we hope you enjoyed Reed ✯ ', // Subject line
         html: `
         <html>
            <head>
              <title>Welcome ${req.body.email}</title>
              <style>
                marquee{
                font-size: 30px;
                font-weight: 800;
                color: lightgrey;
                font-family: sans-serif;
                }
              </style>
            </head>

            <body>
              
              <h1>
                Welcome to reed.
              </h1>

              <p>
                Thank you for trying out our experience. We've packaged the cards into neatly packaged slots for your consumption.

                If you would like us to remove this email from our "sent" mailbox on our cloud mail servers before we convert our service to Urbit, please reply here.
              </p>

              ~milbyt-moszod
              ☿

              ${req.body.consent == true ? "<marquee>☿ ♂ ☿ △ ♄ 🜃 ♃ ♀ ♅ ♆ ☄ 𓏞 </marquee>" : null}
            </body>
          </html>
         `,
         // TODO: change endpoints to ipfs hashes
         attachments: [
         {
            filename: `${req.body.one}.png`,
            path: `${req.body.oneEmail}`,
            cid: 'One' //same cid value as in the html img src
        },
        {
            filename: `${req.body.two}.png`,
            path:`${req.body.twoEmail}`,
            cid: 'One' //same cid value as in the html img src
        },{
            filename: `${req.body.three}.png`,
            path: `${req.body.threeEmail}`,
            cid: 'One' //same cid value as in the html img src
        },{
            filename: `${req.body.four}.png`,
            path: `${req.body.fourEmail}`,
            cid: 'One' //same cid value as in the html img src
        },{
            filename: `${req.body.five}.png`,
            path: `${req.body.fiveEmail}`,
            cid: 'One' //same cid value as in the html img src
        },{
            filename: `${req.body.six}.png`,
            path: `${req.body.sixEmail}`,
            cid: 'One' //same cid value as in the html img src
        },{
            filename: `${req.body.seven}.png`,
            path: `${req.body.sevenEmail}`,
            cid: 'One' //same cid value as in the html img src
        },{
            filename: `${req.body.eight}.png`,
            path: `${req.body.eightEmail}`,
            cid: 'One' //same cid value as in the html img src
        },
        ]
         , // Plain text body
    };

    transport.sendMail(mailOptions, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
        }
    });

    res.send({msg: "♅"})
    return next()
  }catch(e){
    res.status(500).send({error: "Error"})
    return next(e)
  }
}

/*
* Simple Phone Invite Function
*/
async function phone(req,res,next) {
  console.log(req.body.phone)
  console.log(req.body.phone)
  let noun = 'our'
  if(req.body.consent){
    noun = `${req.body.spirit}'s`
  }
  try { 
    client.messages
    .create({
      body: `Please accept ${noun} invite to https://reed.live/?peerId=${req.body.peerId}`,
      to: `${req.body.phone}`, // Text this number
      from: '+16068871570', // From a valid Twilio number
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err))
    res.send({msg: "🜒"});
    return next();
  }catch(e) {
    res.status(500).send({error: "Error"});
    return next(e);
  }
}

module.exports = {
  index,
  email,
  phone
};

// attachments: [
//          {
//             filename: `${req.body.one}.png`,
//             path: `${req.body.oneEmail}`,
//             cid: 'One' //same cid value as in the html img src
//         },{
//             filename: `${req.body.two}.png`,
//             path:`${req.body.twoEmail}`,
//             cid: 'One' //same cid value as in the html img src
//         },{
//             filename: `${req.body.three}`,
//             path: `${req.body.threeEmail}`,
//             cid: 'One' //same cid value as in the html img src
//         },{
//             filename: `${req.body.four}.png`,
//             path: `${req.body.fourEmail}`,
//             cid: 'One' //same cid value as in the html img src
//         },{
//             filename: `${req.body.fiveEmail}.png`,
//             path: `${req.body.fiveEmail}`,
//             cid: 'One' //same cid value as in the html img src
//         },{
//             filename: `${req.body.six}.png`,
//             path: `${req.body.sixEmail}`,
//             cid: 'One' //same cid value as in the html img src
//         },{
//             filename: `${req.body.seven}.png`,
//             path: `${req.body.sevenEmail}`,
//             cid: 'One' //same cid value as in the html img src
//         },{
//             filename: `${req.body.eight}.png`,
//             path: `${req.body.eightEmail}`,
//             cid: 'One' //same cid value as in the html img src
//         },
//         ]