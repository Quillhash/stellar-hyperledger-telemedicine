const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const AdminConnection = require('composer-admin').AdminConnection;

var Create = require('/home/himanshu/healthchain/healthchain/node_modules/composer-cli/lib/cmds/card/lib/create.js')
var express =  require('express');

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
       }
        else if(req.body.userType == "Practitioner"){
            let participantRegistry = await businessNetworkConnection.getParticipantRegistry('org.mpr.healthchain.participant.Practitioner');
            let factory = businessNetworkConnection.getBusinessNetwork().getFactory();
            let participant = factory.newResource('org.mpr.healthchain.participant', 'Practitioner', req.body.participantId);
            participant.authPractitioners = [];
            participant.records= [];
            await participantRegistry.add(participant);
            console.log("sucess patient");

        }
        
       
        //req.body.participantId must be in the format  participant#participantId where participant can be doctor,patient
        //participantId is the id added when participant is added to registry
        //userId is any id name given to identity
        let result = await businessNetworkConnection.issueIdentity('org.mpr.healthchain.participant'+req.body.participantId,req.body.userId);

        console.log(`userID = ${result.userID}`);
        console.log(`userSecret = ${result.userSecret}`);
        var exp =  await adminConnection.exportCard('admin@healthchain');
        var bNetwork = exp.metadata.businessNetwork;
        var connPro= exp.connectionProfile;
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
        var filename=  await Create.createCard(metadata,connPro,options);
        console.log(filename)



        await businessNetworkConnection.disconnect();
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}
)
module.exports = router;

