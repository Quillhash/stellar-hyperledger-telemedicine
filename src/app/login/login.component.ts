import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Http} from '@angular/http'
import {CryptoService} from './../service/crypto.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') frm:NgForm;
   registering:boolean = false;
   selectedFile:File;
   uploading:boolean = false;
   uploaded:boolean = false;
   fileSelected : boolean ;
   attempt:number = 0;

   registered:boolean = false;
  constructor(private http:Http,private crypto:CryptoService) { }

  ngOnInit() {
  }
register(f:NgForm){
  //this.crypto.generateKeys();

  this.registering = true;
  let formData = f.form.value;
  let resBody = {
    participantId:formData.participantId,
    userId : formData.userId,
    userType : formData.userType,
    userEmail : formData.userEmail,
  }
  this.http.post("http://localhost:4800/identity/register",resBody)
  .subscribe((result)=>{
    this.registering = false;
    this.registered =  true;
    console.log(result.json())

  },(error)=>{
    this.registering = false;
    this.registered = false;

    console.log(error);
  })
}

login(lg:NgForm){
  if(this.selectedFile.name.length>0){
    this.uploading = true;
    let formData = new FormData();
    formData.append('card',this.selectedFile,this.selectedFile.name);
    
    this.http.post("http://localhost:4800/auth/login",formData)
    .subscribe((result)=>{
      this.uploaded = true;
      this.uploading = false;
     
      console.log(result.json());
  
    },(err)=>{
      
      console.log(err);
    })
    
   }
   else{
     console.log("plz select a file to be uploaded")
     this.fileSelected =false;
     this.attempt = this.attempt + 1;
     return false
   }
}

fileChangeEvent(e){
  this.selectedFile = <File>e.target.files[0];
 
  

  
 }

}
