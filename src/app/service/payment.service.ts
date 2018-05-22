import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { TransferState } from '@angular/platform-browser';
import { reject } from 'q';

declare var StellarSdk:any;
@Injectable()
export class PaymentService implements OnInit{

    private server:any;
    results:any;
    transferResult:any;

    constructor(private http:Http) { 
      this.server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
      StellarSdk.Network.useTestNetwork();
      
    }
    ngOnInit(){
      
    
    }

  // function to create account in stellar test network
 
  createAccount(){
  
    let pair = StellarSdk.Keypair.random();
    let secretKey = pair.secret();
    let publicKey = pair.publicKey();
    let promise =  new Promise((resolve,reject)=>{
      this.http.get(`https://friendbot.stellar.org?addr=${publicKey}`)
      .toPromise()
      .then(()=>{
        this.server.loadAccount(publicKey)
        .then((account)=>{
          this.results = account;
            
          resolve([this.results,secretKey]);
        })
      
      },
    msg=>
      reject(msg))
    })
  return promise;
  }


// function to transfer stellar in stellar test network.
transferStellar(sourceSecret:String,receiverKey:String,stellarAmount:number){
  let sourceKeys = StellarSdk.Keypair.fromSecret(sourceSecret);
  let promise = new Promise((resolve,reject)=>{
 //checking if destination account exist or not
    this.server.loadAccount(receiverKey)
    .catch(StellarSdk.NotFoundError, function (error) {
      console.log(error);
      throw new Error('The destination account does not exist!');
     
     
    }) 
    .then(()=>{
     // loading the source account
      return this.server.loadAccount(sourceKeys.publicKey());
    })
    .then((sourceAccount)=>{
      let transaction =new  StellarSdk.TransactionBuilder(sourceAccount)
      .addOperation(StellarSdk.Operation.payment({
          destination:receiverKey,
          asset:StellarSdk.Asset.native(),
          amount:stellarAmount

      }))
      .addMemo(StellarSdk.Memo.text("Send by a happy patient"))
      .build();
      transaction.sign(sourceKeys);
      return this.server.submitTransaction(transaction);
    })
    .then((result)=> {
      return this.server.loadAccount(sourceKeys.publicKey())
    })
    
    .then((account)=>{
      resolve(account)
    })
    
    .catch(function(error) {
      console.error('Something went wrong!', error);
      reject(`end term${error}`)
});

  })
 

return promise;

}

createEscrow(createrSecret:String,serviceProviderKey:String,serviceTakerKey:String){
  let  escrowKey = StellarSdk.Keypair.random();
  let  escrowPubKey = escrowKey.publicKey();
 
  let createrkeyPair = StellarSdk.Keypair.fromSecret(createrSecret);
  let promise = new Promise((resolve,reject)=>{
 this.server.loadAccount(createrkeyPair.publicKey())

  .then((ownerAccount)=>{

    let transaction = new StellarSdk.TransactionBuilder(ownerAccount)
    .addOperation(StellarSdk.Operation.createAccount({
        destination: escrowPubKey,
        startingBalance: '2.5000000'
    }))
    .build();
 
 transaction.sign(createrkeyPair);
 return this.server.submitTransaction(transaction);
  })
  .then((results)=>{
    return this.server.loadAccount(escrowPubKey);
  })
  .then((escrowAccount)=>{
   
    let transaction = new StellarSdk.TransactionBuilder(escrowAccount)
   .addOperation(StellarSdk.Operation.setOptions({
       signer: {
           ed25519PublicKey: serviceTakerKey,
           weight: 1
       }
   }))
   .addOperation(StellarSdk.Operation.setOptions({
       masterWeight: 0,
       lowThreshold: 2,
       medThreshold: 2,
       highThreshold: 2,
       signer: {
           ed25519PublicKey: serviceProviderKey,
           weight: 1
       }
     
    }))
    .build();
 
     transaction.sign(escrowKey);
     return StellarSdk.server.submitTransaction(transaction);
 

  })
  .then(()=>{
   return this.server.loadAccount(escrowPubKey);
  })
  .then((esAccount)=>{
    //todo: save the signers in db and number of signers.
    console.log(esAccount);
    resolve(esAccount);

  })
 .catch((err)=>{
  console.log(err);
   reject(err);
   
 })
  
  })
return promise;
}
//function to send stellar to escrow
sendStellarToEscrow(sourceSecret:string,escrowPubKey:String,stellarAmount:number){
let sourceKeys = StellarSdk.keypair.fromSecret(sourceSecret);
let promise = new Promise((resolve,reject)=>{
this.server.loadAccount(sourceKeys.publicKey())
.then((sourceAccount)=>{
 
  let transaction= new StellarSdk.TransactionBuilder(sourceAccount)
   .addOperation(StellarSdk.Operation.payment({
       destination:escrowPubKey,
       asset: StellarSdk.Asset.native(),
       amount:stellarAmount
       
}))
.build();
transaction.sign(sourceKeys);
this.server.submitTransaction(transaction);
})
.then((results)=>{

  console.log(results);
  this.server.loadAccount(escrowPubKey);

})
.then((escrowAccount)=>{
  console.log(escrowAccount);
  resolve(escrowAccount);
})
.catch((err)=>{
  console.log(err);
  reject(err);
})

});

return promise;

}



buildTransaction(destinationPubKey:String,escrowSecret:string,timeBound:number,stellarAmount:number){
  //destinationPubKey is receiver key
  //sourceSecret is escrow secret
  //timebound is the time only after which the transaction can be submitted from escrow.
  let escrowKeys =  StellarSdk.Keypair.fromSecret(escrowSecret);
  let promise = new Promise((resolve,reject)=>{
    this.server.loadAccount(escrowKeys.publicKey())
    .then((sourceAccount)=>{
     
      resolve([destinationPubKey,stellarAmount,sourceAccount,escrowKeys.publicKey()]);
      //todo: save destinationPubKey ,amount ,sourceaccount,escrowPublickey in a database
      //escrowPublicKey is the ID for database document
      
  
  })
  .catch((err)=>{
    reject(err)
  })
})
return promise;
  
}
// function to sign escrow transactions to withdraw stellar from escrow.
signTransaction(escrowPubKey:string,signerSecret:string){
  
  console.log(escrowPubKey)
  console.log(signerSecret)
  let sourceAccount;// todo get the sourceAccount from database using escrowPublickey
  
 let promise = new Promise((resolve,reject)=>{
     
      return new StellarSdk.TransactionBuilder(sourceAccount)
      .addOperation(StellarSdk.Operation.payment({
          destination:escrowPubKey,
          asset: StellarSdk.Asset.native(),
        //amount: //todo : get the amount from database.Which gets stored in db using build transaction function
        //todo specify timeBound property
   }))
   .build()
  
     .then((transaction)=>{
       console.log(transaction);
       //<todo>//check if transaction is already signed by required parties
       //check if signerSecret is valid signer
       //above checks can be done only after database integeration
       transaction.sign(signerSecret);
       //check if timeBound is achieved and enough signers have signed the transaction then call the 
       //this.server.submitTransaction(transaction)

     })
     .then((result)=>{
      resolve(result)
     })
     .catch((err)=>{
      console.log(err);
      reject(`end error${err}`);

     })
    
  })
  return promise;

}


//function to create a pre authorised transaction.
createPreAuthTransaction(secretKey:string,destinationKey:string,stellarAmount:number)
{
  //secretKey is escrow account secret key
  //destinationKey is the key of serviceTaker
  //Amount of stellar locked in escrow
   let preAuthTx;
   let keypair = StellarSdk.Keypair.fromSecret(secretKey);
   let promise = new Promise((resolve,reject)=>{
     // Get an account object
    let account = this.server.loadAccount(keypair.publicKey())
    .then((account)=>{

       // Increment this account object's sequence number
    account.incrementSequenceNumber()

    // Create a valid transaction with the incremented sequence number.
    // Notice that we don't have to sign this tx because once it is
    // added as a signer to the account it is valid.
    // This tx can obviously be anything.
    // Once this tx is submitted, the signer is removed.
    preAuthTx = new StellarSdk.TransactionBuilder(account)
    .addOperation(StellarSdk.Operation.payment({
        destination: destinationKey,
        asset: StellarSdk.Asset.native(),
        amount: stellarAmount
        //<!todo!> set the time bound property
    }))
    .build()
    
    })
    .then(()=>{
      // Get the account object again.
    // This time don't increment the sequence number.
    account = this.server.loadAccount(keypair.publicKey());

    // Set the preAuthTx as a signer on the account
    var transaction = new StellarSdk.TransactionBuilder(account)
            .addOperation(StellarSdk.Operation.setOptions({
                signer: {
                    preAuthTx: preAuthTx.hash(),
                    weight: 1
                  }
            }))
            .build()
            
            transaction.sign(keypair)
    

    this.server.submitTransaction(transaction)
          })
.then((results)=>{

    // Return the preAuthTx.
    // This tx is ready to go and as long as the sequence number is
    // still valid, can be propgated at any time.
  console.log(results)
  resolve(preAuthTx);
  // <!-- todo save the preAuthTx in database by for submittion after time bound !>

})
  .catch ((err)=> {
    console.log(err)
    reject(err)
})

   })
return promise;

}
}