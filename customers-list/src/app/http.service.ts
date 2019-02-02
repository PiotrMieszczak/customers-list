import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { pick } from 'lodash';

import { AppSettings } from './app.settings';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HttpService {

  constructor(
    private http: HttpClient,
    private settings: AppSettings
  ) { }

  /**
   * Send GET request.
   *
   * @param {string} url
   * @returns {Observable<any>}
   * @memberof HttpService
   */
  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.settings.apiUrl + url);
  }


  
  /**
   * Parse any object or array to query string
   *
   * @param  {Array<any>|Object} data
   * @param  {any} prefix=undefined
   * @returns string
   */
  public toQueryString(data: Array<any> | Object, prefix: any = undefined): string {
    let str = [], p;
    for (p in data) {
      if (data[p]) {
        if (data.hasOwnProperty(p)) {
          const k = prefix
            ? prefix + '[' + p + ']'
            : p;
            const v = data[p];

          str.push((v !== null && typeof v === 'object') ? this.toQueryString(v, k) : k + '=' + v);
        }
      } else {
        continue;
      }
    }

    str = str.filter(value => value !== '');
    return str.join('&');
  }
}
