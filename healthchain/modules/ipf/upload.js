var express = require('express');
var multer = require('multer');
var router = express.Router();
var uploadDoc = require('./ipfs')

const cpUpload = multer({
    // multer settings
    limits: { fileSize:20*1024*1024 },
    //storage: storage,
    fileFilter: function (req, file, cb) {
      if (file.mimetype !== 'application/pdf' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpe' && file.mimetype !== 'image/jpg') {
        req.fileValidationError = 'goes wrong on the mimetype';
        return cb(null, false);
      }
      cb(null, true);
    }
  }).single('ipfs');

  router.post('/upload',uploadDoc);
  router.get('/',(req,res)=>{
      res.sendFile('upload.html',{root:__dirname});
  });
  
module.exports = router;