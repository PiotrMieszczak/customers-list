import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Customer, CustomerDb } from '../../classes/customer';
import { QueryParams } from '../../classes/queryParams';

import { HttpService } from '../../http.service'
import * as moment from 'moment';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CustomersTableService {

  constructor(private _httpService: HttpService) { }

  /**
   * Formats date string to MM/DD/YYYY format
   * 
   * @param  {string} date
   * @returns string
   */
  formatDate(date: string): string {
    return moment(date).format('MM/DD/YYYY');
  }

  /**
   * Gets all customers from data base
   * 
   * @param  {QueryParams} params
   * @returns Observable
   */
  getCustomersList(params: QueryParams): Observable<CustomerDb> {
    const queryParams = this._httpService.toQueryString(params);
    return this._httpService.get('customer?'+ queryParams)
       .pipe(
         map(data => {
           const customerData: CustomerDb = {
             data: data.body,
             count:  data.headers.getAll('x-total-count')
           }
           return customerData;
       })
      )
  }
}
