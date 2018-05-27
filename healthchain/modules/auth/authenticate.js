var express =  require('express');
var myNetwork = require('./myNetwork');
var router = express.Router();
var fs = require('fs');
//for linux





router.post('/login',(req,res)=>{
    let card = req.files.card.data;
   
    myNetwork.importCardFromNetwork(card).then((cardName)=>{
        if (!req.files)
        {
            return res.status(400).send('No files were uploaded.');
        }
       
       console.log('adminCard' + card);
       
        
        if(cardName){
            res.json({
                accessToken : cardName,
                cardname: cardName
            });
        }
        else {
            res.status(403).json({message:"loginFailed"});
        }
    })
    .catch((err)=>{
        res.status(403).json({message:"login failed",error : err.toString()})
    })


   

})


module.exports = router;
