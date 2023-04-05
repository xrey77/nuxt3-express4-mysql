// http://127.0.0.1:3000/api/users/getusers
const config = useRuntimeConfig()
import db from '../db/config';
import jwt, { Secret} from 'jsonwebtoken';

export const SECRET_KEY: Secret = config.public.tokenSecret;

export default defineEventHandler(async (event) => {
    const authHeader = event.node.req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return {statuscode: 401, message: 'Unauthorized Access.'}
    }    

    try {
        jwt.verify(token, SECRET_KEY)
        var [users] = await db.query('SELECT id,lastname,firstname,email,mobile,username,isactivated,isblocked,picture FROM users')
        if (users.length == 0) {
            return {statuscode: 404, message: 'No records to display.'}
        }
        return {statuscode: 200, users}
    
    } catch(error) {
        return {statuscode: 401, message: 'Forbidden Access.'}
    } finally {}

});
