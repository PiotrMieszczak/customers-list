import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, Subject, combineLatest, of } from 'rxjs';
import { map, takeUntil, startWith, catchError,  switchMap, shareReplay } from 'rxjs/operators';

import { MatPaginator, MatSort } from '@angular/material';

import { CustomersTableService } from './customers-table.service';
import { ToolBarData } from './../../classes/toolbarData';
import { QueryParams } from '../../classes/queryParams';
import { Customer, CustomerDb } from '../../classes/customer';

@Component({
  selector: 'customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public toolBarData: ToolBarData;
  public dataSource$: Observable<Customer[]>;
  public displayedColumns: string[] = [
    'type', 
    'name', 
    'country', 
    'website', 
    'numberOfEmployees', 
    'contractExpiryDate',
    'annualTurnover',
    'complianceChecked'
  ];
  private _guard$ = new Subject();
  private count: Subject<number> = new Subject<number>();
  public count$ = this.count.asObservable();

  constructor(private _customersTableService: CustomersTableService) { }

  ngOnInit() {
    this.createToolBarData();
  }

  ngAfterViewInit() {
    this.getCustomersData();
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
   * Gets customers data based on pagination and sort data
   * 
   * @returns void
   */
  getCustomersData(): void {
    this.dataSource$ = combineLatest(this.sort.sortChange.pipe(startWith({})), this.paginator.page.pipe(startWith({})))
      .pipe(
        // takeUntil(this._guard$),
        switchMap(([sortData, paginationData]) => {
          const params = this.createQueryParams(sortData, paginationData);
          return this._customersTableService.getCustomersList(params)
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
        }),
        shareReplay(1)
      )
  }

  /**
   * Creates query params based on sort and pagination data
   * 
   * @param  {} sortData
   * @param  {} pagData
   * @returns QueryParams
   */
  createQueryParams(sortData, pagData): QueryParams {
    const params = new QueryParams();
    params.sortBy(sortData.active, sortData.direction);
    params.setLimit(pagData.pageSize);
    params.setOffset(pagData.index);
    const page = pagData.pageIndex ? pagData.pageIndex + 1 : 1;
    params.setPage(page);
    return params;
  }

  /**
   * Creates columns names
   * 
   * @param  {string} columnName
   * @returns string
   */
  createDisplayedColumnName(columnName: string): string {
    return columnName.split(/(?=[A-Z])/).join(' ').toLocaleUpperCase();
  }

  ngOnDestroy(): void {
    this._guard$.next();
  }
}
