export class QueryParams {
  private whereElement: Object = {};
  private _limit: number = 50;
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
  public limit(limit: number = 10): void {
    this._limit = limit;
  }

  /**
   * Definition of data offset
   * 
   * @param  {number} offset
   * @returns void
   */
  public offset(offset: number = 0): void {
    this._start = offset;
  }

  /**
   * Definition of data order
   *
   * @param {string} column
   * @param direction
   */
  public sortBy(column: string = 'name', direction: string = 'ASC'): void {
    this._sort = column;
    this._order = direction;
  }
}