import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CustomerDb } from '../../classes/customer';
import { QueryParams } from '../../classes/queryParams';
import { HttpService } from '../../http.service'
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CustomersTableService {

  constructor() { }

  /**
   * Formats date string to MM/DD/YYYY format
   * 
   * @param  {string} date
   * @returns string
   */
  formatDate(date: string): string {
    return moment(date).format('YYYY-DD-MM');
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
}
