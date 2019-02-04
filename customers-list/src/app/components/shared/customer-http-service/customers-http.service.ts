import { Injectable }   from '@angular/core';
import { HttpService } from '../../../http.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QueryParams } from 'src/app/classes/queryParams';
import { Customer, CustomerDb } from 'src/app/classes/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerHttpService { 
  constructor(private _http: HttpService) { }

  /**
   * Gets all customers from data base
   * 
   * @param  {QueryParams} params
   * @returns Observable
   */
  getCustomersList(params: QueryParams): Observable<CustomerDb> {
    const queryParams = this._http.toQueryString(params);
    return this._http.get('customer?'+ queryParams)
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

    /**
   * Gets user by id
   * 
   * @param  {QueryParams} params
   * @returns Observable
   */
  getCustomerById(params: QueryParams): Observable<Customer> {
    const queryParams = this._http.toQueryString(params);
    return this._http.get('customer?' + queryParams).pipe(map(res => res.body[0]))
  }

  updateCustomerData(customerId: string, newData: Customer): Observable<any> {
    const stringifiedData = JSON.stringify(newData);
    return this._http.patch(`customer/${customerId}`, stringifiedData);
  }

}