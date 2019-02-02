export interface Customer {
  id: number,
  type: number,
  name: string,
  country: string,
  websiteUrl: string
  numberOfEmployees: number,
  contractExpiryDate: string
}

export interface BigCustomer extends Customer {
  annualTurnover: string,
  complianceChecked: boolean
}

export interface CustomerDb  {
  data: Customer[],
  count: number
}