const express = require('express')
const multer = require('multer');
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 

// const client = require('../db/db.js');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log("file 1 : " + file)
//     cb(null, './static/user');
//   },
//   filename: (req, file, cb) => {
//     console.log('File 2 : ' + file)
//    cb(null, '001' + path.extname(file.originalname))
//       //path.extname get the uploaded file extension
//   }
// });

// const multerFilter = (req, file, cb) => {
//         console.log("file 3 : " + file)
//         if (!file.originalname.match(/\.(png|jpg)$/)) { 
//             //  upload only png and jpg format
//            return cb(new Error('Please upload a Image'))
//          }
//        cb(null, true)    
// };

// exports.upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter
// });



exports.uploadSingleImage = (req,res, next) => {
  var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'static/users');
    },
    filename: function (req, file, callback) {
      console.log("xfile : " + file)
      callback(null, '0001' + path.extname(file.originalname));
    }
  });
  
  var upload = multer({ storage : storage}).single('file');

  upload(req,res,function(err) {
    if(err) {
        return res.status(400).json({ message: "Error uploading file."});
    }
  });
  return res.status(200).json({'statusCode':200, message: 'uploaded...'})

//  const allquery =await client.query(`INSERT INTO users(name, icon) VALUES ('${req.body.name}', '${req.file.filename}')`);
//  res.status(200).json({'statusCode':200, 'status':true, message: 'Image added','data':[]});
}

upload(req, res, function (err) {
  try {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        // console.log("Filename : " + req.file.filename)
        // req.body.file = req.file.filename;
   } catch(exception) {}
    // if (req.body.password !== null) {
    //   var pwd = bcrypt.hashSync(req.body.password, 10);
    //   req.body.hash_password = pwd;
    // }
    // User.findOneAndUpdate({email: req.params.email}, req.body, function(err, user) {
    //   if (err)
    //     res.send(err);
    //     res.json(user);
    // });
})



// exports.uploadMultipleImage = async(req,res) => {
      
  //  for(var i=0;i<req.files.length;i++){
  //    const allquery =await client.query(`INSERT INTO users(name, icon) VALUES ('${req.body.name}','${req.files[i].filename}')`);
  //     }
  // res.status(200).json({'statusCode':200, 'status':true,message: 'All Image added','data':[]});
  // res.status(200).json({'statusCode':200})
// }
