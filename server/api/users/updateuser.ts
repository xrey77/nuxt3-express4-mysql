const config = useRuntimeConfig()
import db from '../db/config';
import jwt, { Secret} from 'jsonwebtoken';
import moment from 'moment';
import bcrypt from 'bcryptjs';

export const SECRET_KEY: Secret = config.public.tokenSecret;

export default defineEventHandler(async (event) => {
    const data = await readBody(event);
    var currdate = moment().format('YYYY-MM-DD HH:mm:ss')
    const query = getQuery(event);
    var idno = query.id;
    const authHeader = event.node.req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    console.log(data);
    if (token == null) {
        return {statuscode: 401, message: 'Unauthorized Access.'}
    }    
    try {
        jwt.verify(token, SECRET_KEY);
        if (data.password == null) {
            var [user1] = await db.query('UPDATE users SET firstname= ?, lastname = ?, mobile = ?, updated_at = ? WHERE id = ?',[data.firstname,data.lastname,data.mobile, currdate, idno])
            if (!user1.affectedRows) {
                return {statuscode: 404, message: 'User Id ' + idno + ' does not exists.'}
            }
            return {statuscode: 200, message: 'User ID ' + idno + ' has been updated', user1}

        } else {
            var hashpwd = await bcrypt.hash(data.password, 10)
            var [user2] = await db.query('UPDATE users SET firstname= ?, lastname = ?, mobile = ?, password = ?, updated_at = ? WHERE id = ?',[data.firstname,data.lastname,data.mobile, hashpwd, currdate, idno])
            if (!user2.affectedRows) {
                return {statuscode: 404, message: 'User Id ' + idno + ' does not exists.'}
            }
            return {statuscode: 200, message: 'User ID ' + idno + ' has been updated', user2}
        }
    
    } catch(err) {
        return {statuscode: 401, message: 'Forbidden Access.'}            
    } finally {
    }

});
