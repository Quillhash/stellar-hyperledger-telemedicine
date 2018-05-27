var express = require('express');
var multer = require('multer');
var router = express.Router();
var uploadDoc = require('./ipfs')


  router.post('/upload',uploadDoc);
  router.get('/',(req,res)=>{
      res.sendFile('upload.html',{root:__dirname});
  });
  
module.exports = router;