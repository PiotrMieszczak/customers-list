import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, combineLatest, of } from 'rxjs';
import { map, startWith, catchError,  switchMap } from 'rxjs/operators';

import { MatPaginator, MatSort } from '@angular/material';

import { CustomersTableService } from './customers-table.service';
import { Customer, CustomerDb } from '../../classes/customer';
import { CustomerHttpService } from '../shared/customer-http-service/customers-http.service';

@Component({
  selector: 'customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public toolBarData: string = 'Customers List';
  public dataSource$: Observable<Customer[]>;
  public displayedColumns: string[] = [
    'type', 
    'name', 
    'country', 
    'websiteUrl', 
    'numberOfEmployees', 
    
    'contractExpiryDate',
    'annualTurnover',
    'complianceChecked'
  ];
  private _guard$ = new Subject();
  private count: Subject<number> = new Subject<number>();
  public count$ = this.count.asObservable();

  constructor(private _customersTableService: CustomersTableService, private _router: Router,
    private _customerHttpService: CustomerHttpService) { }

  ngAfterViewInit() {
    this.getCustomersData();
  }

  /**
   * Gets customers data based on pagination and sort data
   * 
   * @returns void
   */
  getCustomersData(): void {
    this.dataSource$ = combineLatest(this.sort.sortChange.pipe(startWith({})), this.paginator.page.pipe(startWith({})))
      .pipe(
        // takeUntil(this._guard$),
        switchMap(([sortData, paginationData]) => {
          const params = this._customersTableService.createQueryParams(sortData, paginationData);
          return this._customerHttpService.getCustomersList(params)
            .pipe(
              map((customersDb: CustomerDb) => {
                this.count.next(customersDb.count);
                return customersDb.data.map(customer => {
                  customer.contractExpiryDate = this._customersTableService.formatDate(customer.contractExpiryDate);
                  return customer;
                })
              }),
              catchError(err => {
                // TO DO Error handling
                console.error(err);
                return of([]);
              })
            )
        })
      )
  }

  /**
   * Navigates to customers details subpage
   * 
   * @param  {number} id
   * @returns void
   */
  editCustomer(id: number): void {
    this._router.navigate(['customer', id]);
  }

  ngOnDestroy(): void {
    this._guard$.next();
  }
}
