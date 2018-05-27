import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  payment:boolean=false
  checkups:boolean = false

  constructor() { }

  ngOnInit() {

     $('.modal-backdrop').remove();

  }

  onSelected(e){

    console.log(e);

    if(e == "payment") {
      console.log(e);
     this.payment=true;
     this.checkups = false;
     
    }
    else if(e == "checkups"){
      this.payment = false;
      this.checkups =true;

    }
    //todo
     //define other navigation options
     //set other navigation options to false

  }



}
