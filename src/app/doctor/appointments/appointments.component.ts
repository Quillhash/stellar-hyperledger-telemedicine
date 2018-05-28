import { Component, OnInit, EventEmitter, Output, OnDestroy, ViewChild } from '@angular/core';




@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit,OnDestroy {
 report :boolean = false;
  constructor() { }

  ngOnInit() {
    
  }

generateReport(){
  this.report = true;
}
  


ngOnDestroy(){
    this.report = false;
  }


}
