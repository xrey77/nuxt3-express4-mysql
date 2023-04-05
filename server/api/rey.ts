export default defineEventHandler(async (event) => {
    const data = await readBody(event);
    return data
});

// import {IncomingMessage ,ServerResponse} from 'http';

// export default (req:IncomingMessage, res:ServerResponse) => {
//     const query = useQuery()
//     return JSON.stringify({message: "Reynald Pogi", data: query.id})
// }


