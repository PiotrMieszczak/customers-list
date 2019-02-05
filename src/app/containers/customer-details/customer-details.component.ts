import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable  } from 'rxjs';
import { tap,} from 'rxjs/operators';

import { Customer } from '../../classes/customer';
import { QueryParams } from '../../classes/queryParams';
import { ToolBarData } from '../../classes/toolbarData';
import { CustomerHttpService } from '../../components/shared/customer-http-service/customers-http.service';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  public userData$: Observable<Customer>;
  private userId: number;
  public toolBarData: ToolBarData;

  constructor(private _activatedRoute: ActivatedRoute, private _customerHttpService: CustomerHttpService) { 
    this.assignUserIdToLocalVariable();
  }

  ngOnInit() {
    this.getUser();
  }

  /**
   * Sets toolbar data
   * 
   * @returns void
   */
  createToolBarData(header: string): void {
    this.toolBarData = new ToolBarData(header, 'primary');
  }

  /**
   * Assign url param to variable
   * 
   * @returns void
   */
  assignUserIdToLocalVariable(): void {
    this.userId = this._activatedRoute.snapshot.params.id;
  }

  /**
   * Gets user data from service
   * 
   * @returns void
   */
  getUser(): void {
    const params = new QueryParams();
    params.where('id', this.userId);
    this.userData$ = this._customerHttpService.getCustomerById(params)
      .pipe(
        tap(customer => {
          this.createToolBarData(customer.name);
        }),
      )
  }
}
