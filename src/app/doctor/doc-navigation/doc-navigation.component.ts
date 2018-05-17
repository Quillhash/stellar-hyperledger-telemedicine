import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-navigation',
  templateUrl: './doc-navigation.component.html',
  styleUrls: ['./doc-navigation.component.css']
})
export class DocNavigationComponent implements OnInit {
  public isCollapsed = true;
  public toggleCollapse = true;
  constructor() { }

  ngOnInit() {
  }

}
