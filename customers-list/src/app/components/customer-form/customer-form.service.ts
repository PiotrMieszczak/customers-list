import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { Customer } from '../../classes/customer';
import { FormField } from '../../classes/form-fields/formField';

@Injectable({
  providedIn: 'root'
})
export class CustomerFormService {
  constructor() { }

    /**
   * Filter form fields by user object fields
   * 
   * @param  {FormField[]} formFields
   * @returns FormField
   */
  filterFormFieldsByUserData(formFields: FormField[], customerData: Customer): FormField[] {
    return formFields.filter(field => {
      return field.types.includes(customerData.type)
    })
  }

  /**
   * Patches controls value based on customer data
   * 
   * @param  {FormGroup} formGroup
   * @returns void
   */
  patchInitialControlsValue(formGroup: FormGroup, customerData: Customer): FormGroup {
    Object.keys(customerData).forEach((key) => { 
      const ctrl: AbstractControl = formGroup.get(key);
      if (ctrl) {
        ctrl.patchValue(customerData[key]);
      } 
    })

    return formGroup;
  }
}
