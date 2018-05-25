

import { Component, OnInit, EventEmitter, Output, OnDestroy, ViewChild } from '@angular/core';
import * as jsPDF from 'jspdf'
import { NgForm } from '@angular/forms';
import {Http,Headers} from '@angular/http';



@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit,OnDestroy{
 @ViewChild('export') exp:NgForm;
  online:boolean =false;
  fileSelected:boolean= true;
  attempt:number = 0;
  selectedFile:File;
  uploaded:boolean=false
  uploading:boolean=false;
  url:string;
  constructor(private http:Http) { }

  ngOnInit() {
    
  }


  goOnline()
  {
    this.online = true;
  }
  downloadReport(f:NgForm)
{
  let formData = f.form.value;
  let doc = new jsPDF({orientation: 'landscape'
  });
  

  doc.setFont("helvetica");
  doc.setFontType("bold");
  doc.setFontSize(15);
  doc.setTextColor(40);
 
  
  
  doc.text("Medical report",130,5);
  
  doc.text("Hospital name:-",10,20);

  doc.text(formData.hospital,60,20);
  doc.text("Patient Id:-",10,30);
  doc.text(formData.patientId,60,30);
  doc.text("Age:-",10,40);
  doc.text(formData.patientAge,60,40);
  doc.text("Sex:-",10,50);
  doc.text(formData.patientSex,60,50);
  doc.text("Doctor Name",10,60);
  doc.text(formData.doctorName,60,60);
  doc.text('Doctor Specialisation:-',10,70);
  doc.text(formData.doctorSpec,70,70);
  doc.text("Patient details:-",10,80);
  doc.text(formData.patientDetails,15,90);
  doc.text("Treatment details:-",10,110);
  doc.text(formData.treatmentDetails,15,120);
  doc.text("Recommendations:-",10,140)
  doc.text(formData.recommendations,15,150);
  doc.save("test.pdf");
} 
 

exportReport(){

 if(this.selectedFile.name.length>0){
  this.uploading = true;
  let formData = new FormData();
  formData.append('ipfs',this.selectedFile,this.selectedFile.name);
  
  this.http.post("http://localhost:4800/ipfs/upload",formData)
  .subscribe((result)=>{
    this.uploaded = true;
    this.uploading = false;
    this.url = result.json().url;
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
 
  console.log(this.exp)
  console.log(e.target.files[0]['name'])

  
 }


ngOnDestroy(){
    
  }


}
