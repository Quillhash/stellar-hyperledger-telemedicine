const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const AdminConnection = require('composer-admin').AdminConnection;
var nodemailer = require('nodemailer');
var fs = require('fs');




// for linux var Create = require('/home/himanshu/healthchain/healthchain/node_modules/composer-cli/lib/cmds/card/lib/create.js')
//for windows
var Create = require('./../../node_modules/composer-cli/lib/cmds/card/lib/create.js')
var express =  require('express');
//var adminCard = fs.readFileSync('/home/himanshu/healthchain/healthchain/admin@healthchain.card');
var router = express.Router();
//require req body fields:-
////userType is type of participant ,Patient | Practitioner
//req.body.participantId must be in the format  participant#participantId where participant can be doctor,patient
        //participantId is the id added when participant is added to registry
        //userId is any id name given to identity

router.post('/register',async (req,res)=> {
    let options = {};
    
    let adminConnection = new AdminConnection();
    let businessNetworkConnection = new BusinessNetworkConnection();
    try {
        await businessNetworkConnection.connect('admin@healthchain');
       //adding user to registry
       //userType is type of participant ,Patient | Practitioner
       if(req.body.userType == "Patient"){
        let participantRegistry = await businessNetworkConnection.getParticipantRegistry('org.mpr.healthchain.participant.Patient');
        let factory = businessNetworkConnection.getBusinessNetwork().getFactory();
        let participant = factory.newResource('org.mpr.healthchain.participant', 'Patient', req.body.participantId);
        participant.authPractitioners = [];
        participant.records= [];
       
        await participantRegistry.add(participant);
        console.log("sucess patient");
           
       
        //req.body.participantId must be in the format  participant#participantId where participant can be doctor,patient
        //participantId is the id added when participant is added to registry
        //userId is any id name given to identity
        let result = await businessNetworkConnection.issueIdentity('org.mpr.healthchain.participant.Patient#'+req.body.participantId,req.body.userId);

        console.log(`userID = ${result.userID}`);
        console.log(`userSecret = ${result.userSecret}`);
        var exp =  await adminConnection.exportCard('admin@healthchain');

        var bNetwork = exp.metadata.businessNetwork;
        console.log(exp)
        console.log("himanshu"+bNetwork)
        var connPro= exp.connectionProfile;
        console.log(JSON.stringify(exp.connectionProfile));
        options.participantId = req.body.participantId;
        options.issuer = false;
        options.newUserId = result.userID;
        options.card = 'admin@healthchain'
        let metadata = {
            userName : result.userID,
            version: 1,
            enrollmentSecret: result.userSecret,
            businessNetwork: bNetwork

        };
        var fileName=  await Create.createCard(metadata,connPro,options);
        console.log(fileName)

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'himanshuchawla2014@gmail.com',
              pass: ''
            }
          });
        var file = fs.readFileSync(fileName);
          
        console.log(file)
        console.log(file.toString('utf8'))
        console.log(req.body.participantId);
        console.log(req.body.userType);
        console.log(req.body.userId);
        console.log(req.body.userEmail);
        var mailOptions = {
            from: 'himanshuchawla2014@gmail.com',
            to: req.body.userEmail,
            subject: 'Sending Email using Node.js',
            html : '<p>Hi,</p>' + req.body.userId + '<p>,use the attached card file to login as</p>' + req.body.userType ,
            attachments: [
                {   // utf-8 string as an attachment
                    filename: fileName,
                    content: file
                }]
          };
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          }); 
        res.status(200).json({"registered":"success"})

        await businessNetworkConnection.disconnect();
       }
        else if(req.body.userType == "Doctor"){
            let participantRegistry = await businessNetworkConnection.getParticipantRegistry('org.mpr.healthchain.participant.Practitioner');
            let factory = businessNetworkConnection.getBusinessNetwork().getFactory();
            let participant = factory.newResource('org.mpr.healthchain.participant', 'Practitioner', req.body.participantId);
            participant.patients = [];
            participant.publicKey = '90493039409';
            participant.accessKeys = [];
            
            await participantRegistry.add(participant);
            console.log("sucess doctor");
               
       
        //req.body.participantId must be in the format  participant#participantId where participant can be doctor,patient
        //participantId is the id added when participant is added to registry
        //userId is any id name given to identity
        let result = await businessNetworkConnection.issueIdentity('org.mpr.healthchain.participant.Practitioner#'+req.body.participantId,req.body.userId);

        console.log(`userID = ${result.userID}`);
        console.log(`userSecret = ${result.userSecret}`);
        var exp =  await adminConnection.exportCard('admin@healthchain');
        var bNetwork = exp.metadata.businessNetwork;
        var connPro= exp.connectionProfile;
        options.participantId = req.body.participantId;
        options.issuer = false;
        options.newUserId = result.userID;
        options.card = adminCard
        let metadata = {
            userName : result.userID,
            version: 1,
            enrollmentSecret: result.userSecret,
            businessNetwork: bNetwork

        };
        var fileName=  await Create.createCard(metadata,connPro,options);
        console.log(fileName)

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'himanshuchawla2014@gmail.com',
              pass: ''
            }
          });
        var file = fs.readFileSync(fileName);
          
        console.log(file)
        console.log(req.body.participantId);
        console.log(req.body.userType);
        console.log(req.body.userId);
        console.log(req.body.userEmail);
        var mailOptions = {
            from: 'himanshuchawla2014@gmail.com',
            to: req.body.userEmail,
            subject: 'Sending Email using Node.js',
            html : '<p>Hi,</p>' + req.body.userId + '<p>,use the attached card file to login as</p>' + req.body.userType ,
            attachments: [
                {   // utf-8 string as an attachment
                    filename: fileName,
                    content: file
                }]
          };
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          }); 
        res.status(200).json({"registered":"success"})

        await businessNetworkConnection.disconnect();

        }
     
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}
)
module.exports = router;

