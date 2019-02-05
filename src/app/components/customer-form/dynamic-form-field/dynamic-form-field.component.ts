import { FormField } from '../../../classes/form-fields/formField';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss']
})
export class DynamicFormFieldComponent {
  @Input() form: FormGroup;
  @Input() formField: FormField;
  public startDate: Date = new Date();

  /**
   * Checks if form field is invalid
   * 
   * @param  {string} ctrlName
   * @returns boolean
   */
  checkIfValid(ctrlName: string): boolean {
    return this.form.get(ctrlName).invalid;
  }

  /**
   * Returns error message
   * 
   * @returns string
   */
  getErrorMessage(): string {
    return this.formField.errorMessage;
  }

  /**
   * Validate date
   * 
   * @param  {string} value
   */
  validateDate(value: string) {
    const picketDate = moment(value).format('YYYY-DD-MM');
    const fromDate =  moment(this.formField.validators.min).format('YYYY-DD-MM');
    const endDate =  moment(this.formField.validators.max).format('YYYY-DD-MM');
    const checkIfBefore = moment(picketDate, 'YYYY-DD-MM').isBefore(fromDate);
    const checkIfAfter = moment(picketDate, 'YYYY-DD-MM' ).isAfter(endDate);

    if (checkIfBefore && !checkIfAfter) {
      this.form.get(this.formField.key).setErrors({'matDatepickerFilter': true});
    } else if (checkIfAfter && !checkIfBefore) {
      this.form.get(this.formField.key).setErrors({'matDatepickerFilter': true});
    } else if (!checkIfAfter && !checkIfBefore) {
      this.form.get(this.formField.key).setErrors({'matDatepickerFilter': null})
      this.form.get(this.formField.key).updateValueAndValidity();
    }
  }
}