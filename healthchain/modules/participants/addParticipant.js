const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

var express =  require('express');

var router = express.Router();
var fs = require('fs');
router.post('/add',async ()=> {
    let businessNetworkConnection = new BusinessNetworkConnection();

    try {
        await businessNetworkConnection.connect('admin@healthchain');
        let participantRegistry = await businessNetworkConnection.getParticipantRegistry('org.mpr.healthchain.participant.Patient');
        let factory = businessNetworkConnection.getBusinessNetwork().getFactory();
        let participant = factory.newResource('org.mpr.healthchain.participant', 'Patient', 'patient1@health.org');
        participant.authPractitioners = [];
        participant.records= [];
        await participantRegistry.add(participant);
        
        await businessNetworkConnection.disconnect();
        console.log("sucess");
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
})


module.exports = router