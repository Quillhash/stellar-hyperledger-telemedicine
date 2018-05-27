import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-patient-navigation',
  templateUrl: './patient-navigation.component.html',
  styleUrls: ['./patient-navigation.component.css']
})
export class PatientNavigationComponent implements OnInit {
  
  sidebarName:string;
  constructor(private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem("accessToken").length >0){
      this.sidebarName = localStorage.getItem("accessToken")
    }
    else{
      this.sidebarName = '';
    }
  }

  logout(){
    localStorage.clear();

    this.router.navigate([''])
    
  }

}
