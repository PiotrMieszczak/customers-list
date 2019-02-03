import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Customer } from '../../classes/customer';
import { QueryParams } from '../../classes/queryParams';
import { ToolBarData } from '../../classes/toolbarData';

import { CustomerDetailsService } from './customer-details.service';
import { tap, catchError, map } from 'rxjs/operators';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  public userData$: Observable<Customer>;
  private userId: number;
  public toolBarData: ToolBarData;

  constructor(private _activatedRoute: ActivatedRoute, private _customerService: CustomerDetailsService) { 
    this.assignUserIdToLocalVariable();
  }

  ngOnInit() {
    this.getUser();
  }

  /**
   * Sets toolbar data
   * 
   * @returns void
   */
  createToolBarData(header: string): void {
    this.toolBarData = new ToolBarData(header, 'primary');
  }

  /**
   * Assign url param to variable
   * 
   * @returns void
   */
  assignUserIdToLocalVariable(): void {
    this.userId = this._activatedRoute.snapshot.params.id;
  }

  /**
   * Gets user data from service
   * 
   * @returns void
   */
  getUser(): void {
    const params = new QueryParams();
    params.where('id', this.userId);
    this.userData$ = this._customerService.getCustomerById(params)
      .pipe(
        tap(customer => {
          this.createToolBarData(customer.name);
        }),
      )
  }
}