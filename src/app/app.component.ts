import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare var StellarSdk: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(){
    $('.modal-backdrop').remove();
  }
  
  
  
}
