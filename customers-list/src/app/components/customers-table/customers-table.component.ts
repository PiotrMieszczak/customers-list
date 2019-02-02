import { ToolBarData } from './../../classes/toolbarData';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements OnInit {
  public toolBarData: ToolBarData;

  constructor() { }

  ngOnInit() {
    this.createToolBarData();
  }


  createToolBarData() {
    this.toolBarData = new ToolBarData('Customers List', 'primary');
  }
}
