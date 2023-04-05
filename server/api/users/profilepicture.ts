// import {FormData} from "node-fetch-native";


// import multer from "multer"
// import path from 'path'
// import Jimp from 'jimp';

export default defineEventHandler(async (event) => {
    // const config = useRuntimeConfig()  
    
    const body = await readBody(event) as HTMLImageElement;
  try {
    const query = getQuery(event);
    console.log("ID No. " + query.idno);
	  // const body = await readMultipartFormData(event);
    console.log(body);
    return body;


    // const image = await Jimp.read(body.files);
    // image.resize(200,200, function(err){
    //    if (err) throw err;
    // }).write('../../../public/users/001.jpeg');

    // const filePath = `${body.path}/${body.name}`
    // console.log(filePath);
    // if (body.files) {
    //   console.log("ok.....");
    // } else {
    //   console.log("empty....");
    // }

    //   const storage = multer.diskStorage({
    //   destination: (req: Express.Request, file: any, callback: any) => {
    //     callback(null, path.resolve('/users'))
    //   },
    //   filename: (req: Express.Request, file: any, callback: any) => {
    //     callback(null, '00' + query.idno + path.extname(file.originalname));
    //   }
    // });    
    // multer({ storage: storage }).single(res.blob);



  } catch(error: any) {
    console.log('may error : ',error)

  } 

    return {statuscode: 200};
});

