var express =  require('express');

var router = express.Router();

router.post('/',(req,res)=>{

    console.log(req.body.participantId);
    console.log(req.body.userType);
    console.log(req.body.userId);
    console.log(req.body.userEmail);
})

module.exports = router;