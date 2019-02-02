export interface Customer {
  id: number,
  type: number,
  name: string,
  country: string,
  websiteUrl: string
}

export interface SmallCustomer extends Customer {
  numberOfEmployees: number,
  contractExpiryDate: string
}

export interface BigCustomer extends SmallCustomer {
  annualTurnover: string,
  complianceChecked: boolean
}
