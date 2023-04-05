// http://127.0.0.1:3000/api/users/getuser?id=4
const config = useRuntimeConfig()
import db from '../db/config';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

export const SECRET_KEY: Secret = config.public.tokenSecret;

export interface UserRequest extends Request {
 token: string | JwtPayload;
}

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    var idno = query.id;
    const authHeader = event.node.req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return {statuscode: 401, message: 'Unauthorized Access.'}
    }    
    try {
        jwt.verify(token, SECRET_KEY)
        var [user] = await db.query('SELECT id,lastname,firstname,email,mobile,username,isactivated,isblocked,picture FROM users WHERE id = ?',[idno])
        if (user.length === 0) {
            return {statuscode: 404, message: 'User Id not found.'}
        }
        return {statuscode: 200, user}
    
    } catch(err) {
        return {statuscode: 401, message: 'Forbidden Access.'}            
    } finally {
    }

});
