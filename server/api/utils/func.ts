import db from '../db/config'

export default class Utility {
    static xvalidateEmail() {

    }
}

// async function validateEmail(xmail) {
//     const [rows] = await db.query( `SELECT * FROM users WHERE  email = ?`,[xmail]);
//     return rows
// }

// async function validateUsername(xusername) {
//     const [rows] = await db.query('SELECT username FROM users WHERE  username = ?',[xusername]);
//     return rows
// }

// async function getUsername(xusername) {
//     const [rows] = await db.query('SELECT username FROM users WHERE  username = ?',[xusername]);
//     return rows
// }

// async function checkUserid(idno) {
//     const [rows] = await db.query('SELECT username FROM users WHERE id = ?',[idno]);
//     return rows
// }

// async function checkMailtoken(token) {
//     const [rows] = await db.query('SELECT username FROM users WHERE mailtoken = ?',[token]);
//     return rows
// }

// async function checkEmailAddress(email) {
//     const [rows] = await db.query('SELECT username FROM users WHERE email = ?',[email]);
//     return rows
// }


// async function isActivated(token) {
//     const [rows] = await db.query('SELECT activation_token FROM users WHERE activation_token = ?',[token])
//     return rows
// }

// async function isActivatonExpiry(token) {
//     var currdate = moment().format('YYYY-MM-DD HH:mm:ss')
//     const [user] = await db.query('SELECT username FROM users WHERE activation_token = ? AND activation_expiry > ?',[token, currdate])
//     return user
// }

// async function isMailTokenExpiry(token) {
//     var currdate = moment().format('YYYY-MM-DD HH:mm:ss')
//     const [user] = await db.query('SELECT username FROM users WHERE mailtoken = ? AND mailtoken_expiry > ?',[token, currdate])
//     return user
// }

// function sendGmail(xmail, mtoken) {
//     var transporter = mailer.createTransport({
//         service: 'gmail',
//         host: process.env.MAIL_HOST,
//         port: process.env.MAIL_PORT,
//         secure: false,
//         auth: {
//           user: process.env.MAIL_USERNAME,
//           pass: process.env.MAIL_PASSWORD
//         }
//       });
 
//       var msg = '<div>Your Mail Token is <strong>' + mtoken + ' , you have 3 days to activate your account.</strong></div><div style="padding-bottom: 10px; padding-top: 10px;">Note : Copy Mail Token and click button below</div><div><a href=' + 'http://127.0.0.1:3000/api/activateaccount/'+ mtoken + ' style="position:absolute ;background-color: green;color:white;border-radius: 25px;width: 250px; height: 25px; padding: 5px;; text-align: center; text-decoration: none;" href="#">Click to activate your Login Account</a></div>'
//       var mailOptions = {
//         from: process.env.MAIL_FROM_NAME,
//         to: xmail,
//         subject: 'LOGIN ACCOUNT ACTIVATION',
//         html: msg,
//       };

//       transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//           console.log("Email Error : " + error);
//           return 0
//         } else {
//           console.log('Email sent: ' + info.response);
//         }
//       });
//       return 1
// }

// function sendForgotMail(xmail, mtoken) {
//     var transporter = mailer.createTransport({
//         service: 'gmail',
//         host: process.env.MAIL_HOST,
//         port: process.env.MAIL_PORT,
//         secure: false,
//         auth: {
//           user: process.env.MAIL_USERNAME,
//           pass: process.env.MAIL_PASSWORD
//         }
//       });
 
//       var msg = '<div>Your Mail Token is <strong>' + mtoken + ' , you have 3 days to activate your account.</strong></div><div style="padding-bottom: 10px; padding-top: 10px;">Note : Copy Mail Token and click button below</div><div><a href=' + 'http://127.0.0.1:3000/api/changeforgotpassword/'+ mtoken + ' style="position:absolute ;background-color: green;color:white;border-radius: 25px;width: 250px; height: 25px; padding: 5px;; text-align: center; text-decoration: none;" href="#">Click to chnage your password</a></div>'
//       var mailOptions = {
//         from: process.env.MAIL_FROM_NAME,
//         to: xmail,
//         subject: 'CHANGE FORGOTTEN PASSWORD',
//         html: msg,
//       };

//       transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//           console.log("Email Error : " + error);
//           return 0
//         } else {
//           console.log('Email sent: ' + info.response);        
//         }
//       });
//       return 1
// }
