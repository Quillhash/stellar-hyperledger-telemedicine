const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

var express =  require('express');

var router = express.Router();

router.post('/patients',async ()=> {
    let businessNetworkConnection = new BusinessNetworkConnection();

    try {
        await businessNetworkConnection.connect('admin@healthchain');
        var statement = 'SELECT org.mpr.healthchain.participant.Patient';

        var query = await businessNetworkConnection.buildQuery(statement);
        var result = await businessNetworkConnection.query(query);
        console.log(result);
        
        await businessNetworkConnection.disconnect();
        console.log("sucess");
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
})
router.post('/doctors',async ()=> {
    let businessNetworkConnection = new BusinessNetworkConnection();

    try {
        await businessNetworkConnection.connect('admin@healthchain');
        var statement = 'SELECT org.mpr.healthchain.participant.Practitioner';

        var query = await businessNetworkConnection.buildQuery(statement);
        var result = await businessNetworkConnection.query(query);
        console.log(result);
        
        await businessNetworkConnection.disconnect();
        console.log("sucess");
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
})


module.exports = router