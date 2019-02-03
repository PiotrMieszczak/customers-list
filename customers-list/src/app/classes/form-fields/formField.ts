import { Validators } from '@angular/forms';

export class FormField {
  value: string | number;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  state: boolean;
  types: number[];
  validators?: any[];
  errorMessage?: string
}