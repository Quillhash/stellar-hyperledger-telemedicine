var express = require('express');
var router  = express.Router();

var BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

router.post('/adddoctor',async (req,res)=>{
    let businessNetworkConnection = new BusinessNetworkConnection();
    try {
        await businessNetworkConnection.connect('himanshuchawla@healthchain');
       //adding user to registry
    let assetRegistry = await businessNetworkConnection.getAssetRegistry('org.mpr.healthchain.personalDetails.PractitionerDetails');
        let factory = businessNetworkConnection.getBusinessNetwork().getFactory();
        let asset = factory.newResource('org.mpr.healthchain.personalDetails', 'PractitionerDetails', 'himanshuchawla@healthchain');
        let prac = factory.newRelationship('org.mpr.healthchain.participant','Practitioner','00921202015');
        asset.firstname = 'himanshu'
        asset.lastname = 'chawla'
        asset.email ='himanshuchawla2014@gmail.com'
        asset.dob = '30/may/1997'
        asset.practitioner= prac;
        await assetRegistry.add(asset);
        console.log("sucess doctor");
           
    }
    catch(error) {
        console.log(error + "error occured");
        process.exit(1);
    }
})

module.exports = router;