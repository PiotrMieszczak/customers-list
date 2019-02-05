export interface FormField {
  value: string | number;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  state: boolean;
  types: number[];
  validators?;
  errorMessage?: string
  dateValidators?: DateValidator[];
  currentDateValidator?: DateValidator;
  minDate?: string;
  maxDate?: string;
}

interface DateValidator {
  type: number,
  min: string,
  max: object
}


interface ExpiryTimeDef {
  duration: number,
  step: string
}