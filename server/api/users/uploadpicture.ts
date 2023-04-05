import db from '../db/config';

export default eventHandler(async (event) => {
    try {
        const data = await readBody(event);
        const query = getQuery(event);
        var idno = query.idno;
        var [user1] = await db.query('UPDATE users SET picture= ? WHERE id = ?',[data.userpic, idno])
        if (!user1.affectedRows) {
            return {statuscode: 404, message: 'Unable to change picture.'}
        }
        return {statuscode: 200, message: 'You have changed your picture successfully.'}
    } catch(error: any) {
        return {statuscode: 500, message: error.message}
    }
 
});