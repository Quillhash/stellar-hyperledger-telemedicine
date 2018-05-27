import { Injectable, OnInit } from '@angular/core';

declare var openpgp:any
@Injectable()
export class CryptoService implements OnInit {

  constructor() { 
    
    
  }
  ngOnInit(){
    openpgp.initWorker({ path:'openpgp.worker.js' });
  }

  generateKeys(){
    var options = {
      userIds: [{ name:'Himanshu', email:'himanshuchawla2014@gmail.com' }], // multiple user IDs
      numBits: 2048,                                            // RSA key size
      passphrase: "a strong phrase"        // protects the private key
  };
  
  
  openpgp.generateKey(options).then(function(key) {
      var privkey = key.privateKeyArmored;
      console.log(privkey)
  // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
      var pubkey = key.publicKeyArmored;  
      console.log(pubkey)
      // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
  })
  .catch(err=>{
    console.log(err);
  })
  } 

}
