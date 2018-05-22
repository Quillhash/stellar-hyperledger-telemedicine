import { Component, OnInit,Output,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-patient-navigation',
  templateUrl: './patient-navigation.component.html',
  styleUrls: ['./patient-navigation.component.css']
})
export class PatientNavigationComponent implements OnInit {
  @Output() onNavSelected: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  loadPayment() {
    this.onNavSelected.emit("payment")

  }
  loadCheckup(){
    this.onNavSelected.emit("checkups")

  }

}
