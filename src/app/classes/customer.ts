export class Customer {
  id?: string;
  type: number;
  name: string;
  country: string;
  websiteUrl: string;
  numberOfEmployees: number;
  contractExpiryDate: string;
  annualTurnover?: string;
  complianceChecked?: boolean;

  constructor(data) {
    Object.keys(data).forEach(key => {
      this[key] = data[key];
    })
  }
}

export interface CustomerDb  {
  data: Customer[],
  count: number
}