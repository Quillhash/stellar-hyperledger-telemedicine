import { Component, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-doc-navigation',
  templateUrl: './doc-navigation.component.html',
  styleUrls: ['./doc-navigation.component.css']
})
export class DocNavigationComponent implements OnInit {
  @Output() onNavSelected: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  loadAppointments(){
 this.onNavSelected.emit("appointments")
  }
}
