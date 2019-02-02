import { ToolBarData } from '../../classes/toolbarData';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  private userId: number;
  public toolBarData: ToolBarData;
  constructor(private _activatedRoute: ActivatedRoute) { 
    this.assignUserIdToLocalVariable();
  }

  ngOnInit() {
    this.createToolBarData();
    this.getUserById();
  }

  /**
   * Sets toolbar data
   * 
   * @returns void
   */
  createToolBarData(): void {
    this.toolBarData = new ToolBarData('Customers List', 'primary');
  }

  /**
   * Assign url param to variable
   * 
   * @returns void
   */
  assignUserIdToLocalVariable(): void {
    this.userId = this._activatedRoute.snapshot.params.id;
  }

  getUserById() {

  }
}
