/* http://127.0.0.1:3000/api/auth/signup
{
    "lastname": "Estrada",
    "firstname": "Merlin",
    "email": "reynald89@icloud.com",
    "mobile": "32234234",
    "username": "Merlin",
    "password": "rey"
} */
import db from '../db/config';
import moment from 'moment'
import bcrypt from 'bcryptjs';
import {authenticator} from 'otplib';

export default defineEventHandler(async (event) => {
    let data = await readBody(event);
    let currdate = moment().format('YYYY-MM-DD HH:mm:ss')
    let hashpwd = await bcrypt.hash(data.password, 10)
    const secret = authenticator.generateSecret();

    let [retvalEmail] = await validateEmail(data.email);
    if (retvalEmail ) {
        return {statuscode: 404,message: 'Email Address has been taken..'};
    }
    let [retvalUsername] = await validateUsername(data.username)
    if (retvalUsername) {
        return {statuscode: 404,message: 'Username has been taken..'};
    }
    let pic = "http://127.0.0.1:3000/users/user.jpg"
    await db.query('INSERT INTO users(lastname,firstname,email,mobile,username,password,created_at,picture,secretkey) VALUES(?,?,?,?,?,?,?,?,?)',[data.lastname,data.firstname,data.email,data.mobile,data.username,hashpwd,currdate,pic,secret])
    return {statuscode: 200, message: 'You have registered successfully.'}
});

async function validateEmail(xmail: any) {
    const [rows] = await db.query( `SELECT * FROM users WHERE  email = ?`,[xmail]);
    return rows
}

async function validateUsername(xusername :any) {
    const [rows] = await db.query('SELECT username FROM users WHERE  username = ?',[xusername]);
    return rows
}

