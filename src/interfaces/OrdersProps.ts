export interface Subscription {
  id: number;
  planName: string;
  planId: number;
  maxCharges: number;
  chargeDaysBefore: number;
  tax?: any;
  planFrequency: string;
  status: string;
}

export interface Card {
  cardBrand: string;
  holderName: string;
  expirationMonth: number;
  expirationYear: number;
  firstDigits: string;
  lastDigits: string;
}

export interface Payment {
  id: number;
  number: string;
  amount: number;
  type: string;
  installments: number;
  card: Card;
  acquirer: string;
  statementDescriptor: string;
  lateFee?: any;
  interestOrFine?: any;
  discount?: any;
  createdOn: string;
  receivedOn: string;
  status: string;
}

export interface Address {
  street: string;
  number: string;
  zipCode: string;
  reference: string;
  district: string;
  city: string;
  state: string;
  country: string;
}

export interface Customer {
  id: number;
  firstName: string;
  surname: string;
  identificationNumber: string;
  birthdate: string;
  email: string;
  phone: string;
  address: Address;
}

export interface OrdersProp {
  id: number;
  storeId: number;
  storeName: string;
  number: string;
  includeFeeTransfer: boolean;
  amount: number;
  netAmount: number;
  fee: number;
  splits: any[];
  currency: string;
  description: string;
  status: string;
  createdOn: string;
  customer: Customer;
  products: any[];
  payment: Payment;
  payments: any[];
  receivables: any[];
  fxPayment?: any;
  tax?: any;
  subscription: Subscription;
  isMultiplePayments: boolean;
  paymentLink?: any;
  metadata: {};
  chargeDaysBefore?: any;
  warrantyDays?: any;
  whenShouldIssueNfe?: any;
  sendNfeToCustomer?: any;
  printableLink?: any;
  xmlLink?: any;
}
