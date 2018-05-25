'use strict';
//using the infura.io node, otherwise ipfs requires you to run a //daemon on your own computer/server

const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const uploadDoc = (req,res) => {

    if (!req.files)
    {
        return res.status(400).send('No files were uploaded.');
    }
   else {
    let sampleFile = req.files.ipfs;
    console.log(sampleFile.data);
    ipfs.add(sampleFile.data, (err,resd) => {
        if (err) {
          console.log('Failed to upload new image', err.message, res);
        } else {
              console.log(`https://ipfs.io/ipfs/${resd[0].hash}`);
              res.status(200).json({
                  url:`https://ipfs.io/ipfs/${resd[0].hash}`
              })
            }
              });
   
  }
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  
   
    
          
    
      
} 

module.exports = uploadDoc;