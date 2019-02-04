import { CustomerHttpService } from 'src/app/components/shared/customer-http-service/customers-http.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, } from '@angular/forms';
import { Customer } from 'src/app/classes/customer';
import { FormFieldControlService } from '../shared/form-field-service/form-field-control.service';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { CustomerFormService } from './customer-form.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  @Input() customerData: Customer;
  public field;
  public form$: Observable<FormGroup>;
  public form;
  public controls = [];

  constructor(private _formFieldControlService: FormFieldControlService, private _customerFormService: CustomerFormService,
    private _customerHttpService: CustomerHttpService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getFormGroup();
  }

  /**
   * Gets form fields data from service, creates formGroup object
   * 
   * @returns void
   */
  getFormGroup(): void {
    const customer = {...this.customerData};
    this.form$ = this._formFieldControlService.getFormControls()
      .pipe(
        map(formFields => {
          return this._customerFormService.filterFormFieldsByUserData(formFields, customer);
        }),
        map((formFields) => {
          this.controls =  Object.assign(formFields);
          const formGroup = this._formFieldControlService.createFormGroup(formFields);
          return this._customerFormService.patchInitialControlsValue(formGroup, customer);
        }),
      )
  }

  /**
   * Submit new data
   * 
   * @param  {Customer} controlsValue
   * @returns void
   */
  onSubmit(controlsValue: Customer): void {
    this._customerHttpService.updateCustomerData(this.customerData.id, controlsValue).subscribe(
      () => {},
      () => {},
      () => {
        this._snackBar.open('Save successful', 'OK', {duration: 3000})
      }
    )
  }
}
