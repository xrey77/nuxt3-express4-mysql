import mailer from 'nodemailer';

export default defineEventHandler(async (event) => {
    // const data = readBody(event);
    const config = useRuntimeConfig();

          var transporter = mailer.createTransport({
              host: config.public.mlHost,
              port: config.public.mlPort,
              secure: false,
              auth: {
                user: config.public.mlUsername,
                pass: config.public.mlPassword
              }
            });
            let mtoken = "123456";
            let xmail = "reynald88@hotmail.com";
            var msg = '<div>Your Mail Token is <strong>' + mtoken + ' , you have 3 days to activate your account.</strong></div><div style="padding-bottom: 10px; padding-top: 10px;">Note : Copy Mail Token and click button below</div><div><a href=' + 'http://127.0.0.1:3000/api/activateaccount/'+ mtoken + ' style="position:absolute ;background-color: green;color:white;border-radius: 25px;width: 250px; height: 25px; padding: 5px;; text-align: center; text-decoration: none;" href="#">Click to activate your Login Account</a></div>';
            var mailOptions = {
              from: config.public.mlFromName,
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

    // return data;
});