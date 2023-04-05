/*
http://127.0.0.1:3000/api/auth/signin
{
  "username": "Reynald",
  "password": "rey"
}
*/
const config = useRuntimeConfig()
import db from '../db/config';
import bcrypt from 'bcryptjs';
import jwt, {Secret} from 'jsonwebtoken';

export const SECRET_KEY: Secret = config.public.tokenSecret;

export default defineEventHandler(async (event) => {
    event.node.res.setHeader('Content-Type', 'application/json');
    let data = await readBody(event);
    let [user] = await getUsername(data.username);
    if(user.username.length > 0) {
        if (bcrypt.compareSync(data.password, user.password)) {
            if(user.isactivated === 0) {
                return {statuscode: 401, message: 'Please activate your account, check your email inbox.'};
            }
            if(user.isblocked > 0) {
                return {statuscode: 401, message: 'Your account has been blocked, please contact the ADMINISTRATOR.'};
            }                
            let token = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY, {expiresIn: '8h'});

            let mfa = user.qrcodeurl != null ? 1 : 0;
            let userdata = {id: user.id, firstname: user.firstname, username: user.username, email: user.email, mfa: mfa, token: token } 
            return {statuscode: 200, message: 'Login successful, please wait...', user: userdata};
        } else {
            return {statuscode: 200, message: 'Password not valid.'}
        }
    }
    return {statuscode: 404,message: 'Username does not exists, please register.'};        
    
});

async function getUsername(xusername: any) {
    const [rows] = await db.query('SELECT * FROM users WHERE  username = ?',[xusername]);
    return rows
}

