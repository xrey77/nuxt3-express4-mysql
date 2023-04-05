import {authenticator} from 'otplib';
import db from '../db/config';

async function isOk(token: any, secret: any) {
    if (authenticator.verify({secret, token})) {
        return true;
    }
    return false;    
}

export default defineEventHandler(async (event) => {
    const req = await readBody(event);
    let idno = req.id;
    let otpcode = req.otpcode;
    
    let [user] = await db.query('SELECT secretkey FROM users WHERE id = ?',[idno])
    let secret = user.secretkey;
    try {
        let isok = await isOk(otpcode, secret);
        if (isok === true) {
            return {statuscode: 200, message: 'OTP Code is valid, please wait...'};
        }
    } catch(error: any) {
        return {statuscode: 404, message: 'OTP Code is not valid, please try again...'};
    }
});