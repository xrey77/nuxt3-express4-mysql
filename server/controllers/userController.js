// import express from 'express'
import db from '../services/mysqlDb.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mailer from 'nodemailer';
import moment from 'moment'
import * as dotenv from 'dotenv' 
dotenv.config()
// import busboy from 'busboy';

export async function login(req, res) {
    var data = req.body;
    try {
        var [user] = await getUsername(data.username);
        if (user.username.length > 0) {

          var isOk = await bcrypt.compare(data.password, user.password)
          if (isOk) {

            if(user.isactivated === 0) {
                return res.json({statuscode: 401, message: 'Please activate your account, check your email inbox.'});
            }

            if(user.isblocked > 0) {
                return res.json({statuscode: 401, message: 'Your account has been blocked, please contact the ADMINISTRATOR.'});
            }

            var token = jwt.sign({ email: user.email, id: user.id }, process.env.TOKEN_SECRET, {expiresIn: '8h'});
            var data = {id: user.id, firstname: user.firstname, username: user.username, email: user.email, token: token } 
            res.end(JSON.stringify({statuscode: 200, message: 'Password successful, login now.', user: data}));
          }
          res.json({statuscode: 404, message: 'Invalid password, please try again.'});
        }
    } catch(error) {
        console.log(error.message)
        res.json({statuscode: 404,message: 'Username does not exists, please register.'});
    }
}

export async function register(req, res) {
    var currdate = moment().format('YYYY-MM-DD HH:mm:ss')
    var data = req.body;
    var hashpwd = await bcrypt.hash(data.password, 10)
    try {
        var [retvalEmail] = await validateEmail(data.email);
        if (retvalEmail.email.length > 0 ) {
            return res.json({statuscode: 404,message: 'Email Address has been taken..'});
        }
    } catch(error) {

            var [retvalUsername] = await validateUsername(data.username)
            if (retvalUsername) {
                return res.json({statuscode: 404,message: 'Username has been taken..'});
            }
            var oks = await sendactivation(data.email);
            if (oks == 0) {
                return res.json({statuscode: 400, message: 'You have registered successfully.'}).end()
            } 
            var pic = "http://127.0.0.1:3000/users/user.jpg"
            await db.query('INSERT INTO users(lastname,firstname,email,mobile,username,password,created_at,picture) VALUES(?,?,?,?,?,?,?,?)',[data.lastname,data.firstname,data.email,data.mobile,data.username,hashpwd,currdate,pic])
            return res.json({statuscode: 200, message: 'You have registered successfully.'})
    }
}

export async function getuser(req, res) {    
    var idno = req.params['id']
    res.setHeader('Content-Type', 'application/json');
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.status(401).json({statuscode: 401, message: 'Unauthorized Access.'})
    }    
    jwt.verify(token, process.env.TOKEN_SECRET, (error, authHeader) => {        
        if (error) { 
            return res.status(401).json({statuscode: 401, message: 'Forbidden Access.'})
        } 
    })

    var [user] = await db.query('SELECT id,lastname,firstname,email,mobile,username,isactivated,isblocked,picture FROM users WHERE id = ?',[idno])
    if (user.length === 0) {
        return res.status(404).json({statuscode: 404, message: 'User Id not found.'})
    }
    return res.status(200).json(user[0])
}

export async function getallusers(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.status(401).json({statuscode: 401, message: 'Unauthorized Access.'})
    }    
    jwt.verify(token, process.env.TOKEN_SECRET, (error, authHeader) => {        
        if (error) { 
            return res.status(401).json({statuscode: 401, message: 'Forbidden Access.'})
        } 
    })

    var [users] = await db.query('SELECT id,lastname,firstname,email,mobile,username,isactivated,isblocked,picture FROM users')
    if (users.length == 0) {
        return res.status(200).json({statuscode: 404, message: 'No records to display.'})
    }
    return res.status(200).json(users)
}

export function updateuser(req, res) {
    // const pic = req.body.userpic
    // console.log(pic)
    res.end('ok')
    // var idno = req.params['id']
    // console.log("ID : " + idno)
    // var data = JSON.stringify(req.body)
    // console.log(data)
    // console.log("Filename : " + req.file.filename)


//     var storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//             console.log("File : " + file)
//         cb(null, '../../static/users')
//       },
//       filename: function (req, file, cb) {
//         cb(null, '001' + path.extname(file.originalname))
//       }
//     });

//   var upload = multer({ storage: storage }).single('file')

//   upload(req, res, function (err) {
//     try {
//           if (err instanceof multer.MulterError) {
//               return res.status(500).json(err)
//           } else if (err) {
//               return res.status(500).json(err)
//           }
//           req.body.userpic = req.file.filename;
//      } catch(exception) {}
//          console.log("May error")
    //   if (req.body.password !== null) {
    //     var pwd = bcrypt.hashSync(req.body.password, 10);
    //     req.body.hash_password = pwd;
    //   }
    //   User.findOneAndUpdate({email: req.params.email}, req.body, function(err, user) {
    //     if (err)
    //       res.send(err);
    //       res.json(user);
    //   });
// })



    // var today = new Date();
    // var date = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDay()
    // var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    // var dtime = date + ' ' + time
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    // if (token == null) {
    //     return res.status(401).json({statuscode: 401, message: 'Unauthorized Access.'})
    // }    
    // jwt.verify(token, process.env.TOKEN_SECRET, (error, authHeader) => {        
    //     if (error) { 
    //         return res.status(401).json({statuscode: 401, message: 'Forbidden Access.'})
    //     } 
    // })
    // try {
    //     var userid = await checkUserid(idno)
    //     if (userid[0].username.length > 0) {
    //         db.query('UPDATE users SET lastname = ?, firstname = ?, mobile = ?, updated_at = ? WHERE id = ?', [data.lastname, data.firstname,data.mobile,dtime, idno])
            // res.end(JSON.stringify({statuscode: 200,message: 'User ID ' + idno + ' has been updated.'}))
    //     } 
    // } catch(error) {
    //     res.end(JSON.stringify({statuscode: 404, message: 'User ID not found, try again.'}))
    // }
}

export async function deleteuser(req, res) {
   res.setHeader('Content-Type', 'application/json');
   var idno = req.params['id']
   const authHeader = req.headers['authorization']
   const token = authHeader && authHeader.split(' ')[1]
   if (token == null) {
       return res.status(401).json({statuscode: 401, message: 'Unauthorized Access.'})
   }    
   jwt.verify(token, process.env.TOKEN_SECRET, (error, authHeader) => {        
       if (error) { 
           return res.status(401).json({statuscode: 401, message: 'Forbidden Access.'})
       } 
   })
   var [user] = await checkUserid(idno)   
   if (user == undefined) {
       return res.status(404).json({statuscode: 404, message: 'User Id not found.'})
   }
   await db.query('DELETE FROM users WHERE id = ?',[idno])
   return res.status(200).json({statuscode: 200, message: 'User ID ' + idno + ' has been deleted.'})
}

export async function blockuser(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var idno = req.params['id']
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.status(401).json({statuscode: 401, message: 'Unauthorized Access.'})
    }    
    jwt.verify(token, process.env.TOKEN_SECRET, (error, authHeader) => {        
        if (error) { 
            return res.status(401).json({statuscode: 401, message: 'Forbidden Access.'})
        } 
    })
    var [user] = await checkUserid(idno)
    if (user == undefined) {
        return res.status(404).json({statuscode: 404, message: 'User Id not found.'})
    }
    await db.query('UPDATE users SET isblocked = ? WHERE id = ?',[1, idno])
    return res.status(200).json({statuscode: 200, message: 'User ID ' + idno + ' has been blocked.'})
 }

 export async function unblockuser(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var idno = req.params['id']
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.status(401).json({statuscode: 401, message: 'Unauthorized Access.'})
    }    
    jwt.verify(token, process.env.TOKEN_SECRET, (error, authHeader) => {        
        if (error) { 
            return res.status(401).json({statuscode: 401, message: 'Forbidden Access.'})
        } 
    })
    var [user] = await checkUserid(idno)
    if (user == undefined) {
        return res.status(404).json({statuscode: 404, message: 'User Id not found.'})
    }
    await db.query('UPDATE users SET isblocked = ? WHERE id = ?',[0, idno])
    return res.status(200).json({statuscode: 200, message: 'User ID ' + idno + ' has been unblocked.'})
 }
 
export async function forgotpassword(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var data = req.body
    var isEmailOk = await checkEmailAddress(data.email)
    if (isEmailOk.length === 0) {
        return res.status(404).json({statuscode: 404, message: 'Email Address does not exists.'})
    }

    var token = Math.floor(100000 + Math.random() * 900000);
    var expiry = moment().add(3, 'days').format('YYYY-MM-DD HH:mm:ss')
    await db.query('UPDATE users SET mailtoken = ?, mailtoken_expiry = ? WHERE email = ?', [token, expiry, data.email])
    var isOk = sendForgotMail(data.email, token)
    if (isOk == 0) {
        return res.status(400).json({statuscode: 400,message: 'Unable to send mail token, is your registered email address valid ?'})
    }
    return res.status(200).json({statuscode: 200,message: 'Please check your email address inbox.'})
}

export async function changeforgotpassword(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var mtoken = req.params['mtoken']
  var data = req.body
  if (data.password.length === 0) {
    return res.status(404).json({statuscode: 404, message: 'Please enter your new password.'})
  }

  var [isOk] = await checkMailtoken(mtoken)
  if (isOk === undefined) {
    return res.status(404).json({statuscode: 404, message: 'Invalid Mail Token.'})
  }

  const [isExpired] = await isMailTokenExpiry(mtoken)
  if (isExpired === undefined) {
      return res.status(404).json({statuscode: 404, message: 'Your user account activation has been expired.'})
  }

  var hashpwd = await bcrypt.hash(data.password, 10)
  await db.query('UPDATE users SET password = ?, mailtoken = ?, mailtoken_expiry = ? WHERE mailtoken = ?', [hashpwd,0,null,mtoken])
  return res.status(200).json({statuscode: 200, message: 'Your password has been changed.'})
}

async function sendactivation(xmail) {
    var mtoken = Math.floor(100000 + Math.random() * 900000);
    var expiry = moment().add(3, 'days').format('YYYY-MM-DD HH:mm:ss')

    // var update = addHours(new Date(), 8)
    // var today = new Date(update);
    // var date = today.getFullYear() + '-' + today.getDay() + '-' + today.getMonth()
    // var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    // var dtime = date + ' ' + time

    await db.query('UPDATE users SET activation_token = ?, activation_expiry = ? WHERE email = ?', [mtoken,expiry, xmail])
    var isOk = sendGmail(xmail, mtoken)
    if (isOk == 0) {
        return 0
    }
    return 1
}

export async function activateaccount(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var mtoken = req.params['mtoken']

    const [isOk] = await isActivatonExpiry(mtoken)
    if (isOk === undefined) {
        return res.status(404).json({statuscode: 404, message: 'Your user account activation has been expired.'})
    }
    
    try {
        var user = await isActivated(mtoken)
        if (user) {
            await db.query('UPDATE users SET isactivated = ?, activation_token = ?, activation_expiry = ? WHERE activation_token = ?',[1, 0, null, mtoken])
            res.end(JSON.stringify({statusscode: 200,message: 'Congratiolations your account has been activated.'}))
        }
    } catch(error) {
        res.end(JSON.stringify({statuscode: 401, message: 'User account activation failed.'}))
    }
}

async function validateEmail(xmail) {
    const [rows] = await db.query( `SELECT * FROM users WHERE  email = ?`,[xmail]);
    return rows
}

async function validateUsername(xusername) {
    const [rows] = await db.query('SELECT username FROM users WHERE  username = ?',[xusername]);
    return rows
}

async function getUsername(xusername) {
    const [rows] = await db.query('SELECT username FROM users WHERE  username = ?',[xusername]);
    return rows
}

async function checkUserid(idno) {
    const [rows] = await db.query('SELECT username FROM users WHERE id = ?',[idno]);
    return rows
}

async function checkMailtoken(token) {
    const [rows] = await db.query('SELECT username FROM users WHERE mailtoken = ?',[token]);
    return rows
}

async function checkEmailAddress(email) {
    const [rows] = await db.query('SELECT username FROM users WHERE email = ?',[email]);
    return rows
}


async function isActivated(token) {
    const [rows] = await db.query('SELECT activation_token FROM users WHERE activation_token = ?',[token])
    return rows
}

async function isActivatonExpiry(token) {
    var currdate = moment().format('YYYY-MM-DD HH:mm:ss')
    const [user] = await db.query('SELECT username FROM users WHERE activation_token = ? AND activation_expiry > ?',[token, currdate])
    return user
}

async function isMailTokenExpiry(token) {
    var currdate = moment().format('YYYY-MM-DD HH:mm:ss')
    const [user] = await db.query('SELECT username FROM users WHERE mailtoken = ? AND mailtoken_expiry > ?',[token, currdate])
    return user
}

function sendGmail(xmail, mtoken) {
    var transporter = mailer.createTransport({
        service: 'gmail',
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD
        }
      });
 
      var msg = '<div>Your Mail Token is <strong>' + mtoken + ' , you have 3 days to activate your account.</strong></div><div style="padding-bottom: 10px; padding-top: 10px;">Note : Copy Mail Token and click button below</div><div><a href=' + 'http://127.0.0.1:3000/api/activateaccount/'+ mtoken + ' style="position:absolute ;background-color: green;color:white;border-radius: 25px;width: 250px; height: 25px; padding: 5px;; text-align: center; text-decoration: none;" href="#">Click to activate your Login Account</a></div>'
      var mailOptions = {
        from: process.env.MAIL_FROM_NAME,
        to: xmail,
        subject: 'LOGIN ACCOUNT ACTIVATION',
        html: msg,
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log("Email Error : " + error);
          return 0
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      return 1
}

function sendForgotMail(xmail, mtoken) {
    var transporter = mailer.createTransport({
        service: 'gmail',
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD
        }
      });
 
      var msg = '<div>Your Mail Token is <strong>' + mtoken + ' , you have 3 days to activate your account.</strong></div><div style="padding-bottom: 10px; padding-top: 10px;">Note : Copy Mail Token and click button below</div><div><a href=' + 'http://127.0.0.1:3000/api/changeforgotpassword/'+ mtoken + ' style="position:absolute ;background-color: green;color:white;border-radius: 25px;width: 250px; height: 25px; padding: 5px;; text-align: center; text-decoration: none;" href="#">Click to chnage your password</a></div>'
      var mailOptions = {
        from: process.env.MAIL_FROM_NAME,
        to: xmail,
        subject: 'CHANGE FORGOTTEN PASSWORD',
        html: msg,
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log("Email Error : " + error);
          return 0
        } else {
          console.log('Email sent: ' + info.response);        
        }
      });
      return 1
}



// function addHours(date, hours) {
//     date.setTime(date.getTime() + hours * 60 * 60 * 1000);  
//     return date;
//   }

// modules: [
//     '@nuxtjs/axios',
//     '@nuxtjs/auth'
//   ],
  


