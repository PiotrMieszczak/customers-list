import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Customer } from '../../classes/customer';
import { QueryParams } from '../../classes/queryParams';

import { HttpService } from './../../http.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {
  constructor(private http: HttpService) { }

  /**
   * Gets user by id
   * 
   * @param  {QueryParams} params
   * @returns Observable
   */
  getCustomerById(params: QueryParams): Observable<Customer> {
    const queryParams = this.http.toQueryString(params);
    return this.http.get('customer?' + queryParams).pipe(map(res => res.body[0]))
  }
}
