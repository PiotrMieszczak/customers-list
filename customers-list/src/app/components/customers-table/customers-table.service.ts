import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Customer } from '../../classes/customer';
import { QueryParams } from '../../classes/queryParams';

import { HttpService } from '../../http.service'
import * as moment from 'moment';
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
  getCustomersList(params: QueryParams): Observable<Customer[]> {
    const queryParams = this._httpService.toQueryString(params);
    return this._httpService.get<Customer[]>('customer?'+ queryParams);
  }
}
