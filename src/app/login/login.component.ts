import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Http} from '@angular/http'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') frm:NgForm;
   registering:boolean = false;

   registered:boolean = false;
  constructor(private http:Http) { }

  ngOnInit() {
  }
register(f:NgForm){
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
}
