import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FormField } from '../../../classes/form-fields/formField';
import { HttpService } from '../../../http.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
      if (field.validators) {
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
}