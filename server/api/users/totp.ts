// const config = useRuntimeConfig()
import {authenticator} from 'otplib';
import db from '../db/config';
import qrcode from 'qrcode';

async function generateQRCode(user: any, secret: any, idno: any, isenabled: any) {
    const otp = authenticator.keyuri(user, "Wincor-Nixdorf", secret);
    qrcode.toDataURL(otp, (err, imageUrl) => {
        if (err) {
            console.log('Could not generate QR code', err);
            return;
        }
        if (isenabled === 'true') {
            db.query('UPDATE users SET qrcodeurl = ? WHERE id = ?',[imageUrl, idno]);
        }
        if (isenabled === 'false') {
            db.query('UPDATE users SET qrcodeurl = ? WHERE id = ?',[null, idno]);
        }
    });
}

export default defineEventHandler(async (event) => {
    const req = await readBody(event);
    const query = getQuery(event);
    let idno = query.id;
    let isenabled = query.enabled;
    const secret = authenticator.generateSecret();
    let user = req.username;
    await generateQRCode(user, secret, idno, isenabled);
    return {statuscode: 200, message: 'ok.', id: idno, isenabled: isenabled};
});
