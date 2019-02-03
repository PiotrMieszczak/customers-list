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
      const validators = !!field.minLength ? [Validators.required, Validators.minLength(field.minLength)] : Validators.required;
      group[field.key] = field.required ? new FormControl('', validators) : new FormControl('');
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
}