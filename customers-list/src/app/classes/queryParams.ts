export class QueryParams {
  private whereElement: Object = {};
  private _limit: number = 10;
  private _start: number;
  private _sort: string;
  private _order: string;

  constructor() { }

  /**
   * Condition for data request
   *
   * @param {string} column
   * @param {any} parameters
   */
  public where(column: string, parameters: any): void {
    this.whereElement[column] = parameters;
  }

  /**
   * Definition of data limit
   * 
   * @param  {number} limit
   * @returns void
   */
  public limit(limit: number): void {
    this._limit = limit;
  }

  /**
   * Definition of data offset
   * 
   * @param  {number} offset
   * @returns void
   */
  public offset(offset: number): void {
    this._start = offset;
  }

  /**
   * Definition of data order
   *
   * @param {string} column
   * @param direction
   */
  public sortBy(column: string, direction: string = 'ASC'): void {
    this._sort = column;
    this._order = direction;
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