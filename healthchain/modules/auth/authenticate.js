var express =  require('express');
var myNetwork = require('./myNetwork');
var router = express.Router();
var fs = require('fs');

var card = fs.readFileSync('/home/himanshu/healthchain/healthchain/admin@healthchain.card');

router.post('/login',(req,res)=>{
    
    myNetwork.importCardFromNetwork(card).then((cardName)=>{
        if(cardName){
            res.json({
                accessToken : cardName,
                cardName: cardName
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
