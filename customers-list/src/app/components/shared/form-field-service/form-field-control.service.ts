import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { FormField } from '../../../classes/form-fields/formField';
import { HttpService } from '../../../http.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class FormFieldControlService {

  constructor(private http: HttpService) {}

  /**
   * Creates form group from from fields objects
   * 
   * @param  {FormField[]} formFields
   * @returns FormGroup
   */
  createFormGroup(formFields: FormField[]): FormGroup {
    const group: {[key: string]: AbstractControl} = {};

    formFields.forEach(field => {
      group[field.key] =  new FormControl('');
      if (field.currentDateValidator) {
        const validators = this.convertDateValidatorsToDate(field);
        group[field.key].setValidators(validators);
      }
      
      if (field.validators && !field.currentDateValidator) {
        this.createValidators(group,field);
      }
    });
    return new FormGroup(group);
  }

  /**
   * Gets form fields from db
   * 
   * @returns Observable
   */
  getFormControls(): Observable<FormField[]> {
    return this.http.get('formFields').pipe(map(res => res.body));
  }

  /**
   * Creates standard validators
   * 
   * @param  {{[key:string]:AbstractControl}} group
   * @param  {FormField} field
   * @returns void
   */
  createValidators(group: {[key: string]: AbstractControl}, field: FormField): void {
    const validators = []
    Object.keys(field.validators).forEach(key => {
      if (key === 'required') {
        validators.push(Validators.required)
      } else {
        validators.push(Validators[key](field.validators[key]));
      }
    })
    group[field.key].setValidators(validators);
  } 


  /**
   * Creates validators for datepicker
   * 
   * @param  {FormField} field
   * @returns ValidatorFn[]
   */
  convertDateValidatorsToDate(field: FormField): ValidatorFn[] {
    const validators = [];
    const date = field.currentDateValidator.min;
    const minDate = moment().startOf(date as moment.unitOfTime.StartOf).format('YYYY-DD-MM');
    const duration  = moment.duration(field.currentDateValidator.max);
    const maxDate = moment(minDate, 'YYYY-DD-MM').add(duration).format('YYYY-DD-MM');
    const dateRange = {
      'min': minDate,
      'max': maxDate,
    }

    Object.keys(field.currentDateValidator).forEach(key => {
      if (key !== 'type') {
        field.validators[key] = new Date(dateRange[key]);
        validators.push(Validators[key](field.validators[key]));
      }
    })
    return validators;
  }
}