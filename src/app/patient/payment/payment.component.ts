import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from '../../service/payment.service';
import { NgForm } from '@angular/forms';
import { NgModuleData } from '@angular/core/src/view';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild('f') frm:NgForm;
  
  @ViewChild('es') frmEscrow:NgForm;
  

  
 
  private server:any;
  loading:boolean = false;
  transfering:boolean=false;
  escrow:boolean =  false;
  accounts:any = [];
   secret:any=[];
  
  
  constructor(private paymentService:PaymentService) { 


  }

  ngOnInit() {

    // to do :- Get the accounts from data base and use the public key to get secret key from browser storage.

    let s =  localStorage.getItem("GJSHSKKHSJ");
    console.log(s)
    this.accounts.push({name:"himanshu",publicKey:"GJSHSKKHSJ",balance:1000,secret:s})
    
    

  }

  createAccount(){
    this.accounts.push({name:"subham",publicKey:"GJSHSKKHSJ",balance:1000,secret:"SKHUI"})
    localStorage.setItem("GJSHSKKHSJ","SKHUI");
   

   /* this.loading= true
    this.paymentService.createAccount().then((result)=>{
    this.loading = false;
   
    console.log(result);
  })
.catch((err)=>{
  console.log(err);
});
*/
  }
buildTransaction(f:NgForm){
  let formData = f.form.value;
  
  this.paymentService.buildTransaction(formData.sourceSecret,formData.receiverId,formData.amount,formData.timeBound)
  .then((result)=>{
    
    this.frm.reset();
   console.log(result);
  })
  .catch((err)=>{
   console.log("error comed up")
    console.log(err)

  })
}

createEscrow(f:NgForm)
{

  this.escrow= true
  console.log(f.form.value);
  let formData = f.form.value;
  console.log(formData.receiverId);
  
  this.paymentService.createEscrow(formData.sourceSecret,formData.providerId,formData.receiverId)
  .then((result)=>{
    this.escrow = false;
    this.frmEscrow.reset();
   console.log(result);
  })
  .catch((err)=>{
   console.log("error comed up")
    console.log(err)

  })

}
  transferStellar(f:NgForm){
    this.transfering = true
    console.log(f.form.value);
    let formData = f.form.value;
    console.log(formData.receiverId);
    
    this.paymentService.transferStellar(formData.sourceSecret,formData.receiverId,formData.amount)
    .then((result)=>{
      this.transfering = false;
      this.frm.reset();
     console.log(result);
    })
    .catch((err)=>{
     console.log("error comed up")
      console.log(err)
  
    })
  
  }
 

}
