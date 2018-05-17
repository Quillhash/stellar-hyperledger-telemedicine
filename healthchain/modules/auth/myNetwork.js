const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection
const IdCard = require('composer-common').IdCard
const NetworkCardStoreManager = require('composer-common').NetworkCardStoreManager;
const BusinessNetworkCardStore = require('composer-common').BusinessNetworkCardStore;
const AdminConnection = require('composer-admin').AdminConnection

class MyNetwork {
    
     constructor(cardName){
     this.cardName =  cardName
     this.connection =  new BusinessNetworkConnection();
    }
 /*this function is static because we will call this directly from classname i.e without creating instance of class,because at the time of login we don,t know
 about the class constructor param (cardName).We will get card name only after user logged in successfully.So we will use cardName in class intance during ping and
 log out function*/
    static importCardFromNetwork(cardData) {
        var walletType = {type : "composer-wallet-filesystem"};

        const cardStore = NetworkCardStoreManager.getCardStore(walletType);
        var _idCardData,_idCardName;
        var adminConnection = new AdminConnection(walletType);
        var businessNetworkConnection = new BusinessNetworkConnection();
        return IdCard.fromArchive(cardData)

    .then((idCardData)=>{
            _idCardData = idCardData;
            return BusinessNetworkCardStore.getDefaultCardName(idCardData)
    }) .then((idcardName)=>{
                _idCardName = idcardName;
                return cardStore.put(_idCardName,_idCardData)
            })
               
                .then(()=>{
                    return adminConnection.importCard("patient1",_idCardData)
                })
                    .then((imported)=>{
                        if(imported){
                            console.log(imported)
                            console.log("imported");
                            console.log(_idCardName)
                            return businessNetworkConnection.connect(_idCardName)
                         
                        }
                        else{
                            console.log("not imported");
                            return null;
                        }
                    })
                    .then((businessDefinition)=>{
                        console.log(businessDefinition)
                        if(!businessDefinition){
                            console.log("not defined");
                            return null;
                        }
                        return _idCardName
                    })
             
    
        


    }


}

module.exports = MyNetwork;