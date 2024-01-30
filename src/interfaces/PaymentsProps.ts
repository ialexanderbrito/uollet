/* eslint-disable prettier/prettier */
export interface Pix {
  id: number;
  amount: number;
  copyPaste: string;
  url: string;
  expirationDate: string;
  initializationType: string;
}

export interface PaymentBoleto {
  id: number;
  number: string;
  amount: number;
  type: string;
  installments: number;
  acquirer: string;
  statementDescriptor: string;
  dueDate: string;
  barcode: string;
  boletoUrl: string;
  lateFee?: any;
  interestOrFine?: any;
  discount?: any;
  createdOn: string;
  receivedOn?: any;
  status: string;
}

export interface PaymentPix extends PaymentBoleto {
  id: number;
  number: string;
  amount: number;
  type: string;
  installments: number;
  pix: Pix;
  acquirer: string;
  statementDescriptor: string;
  lateFee?: any;
  interestOrFine?: any;
  discount?: any;
  createdOn: string;
  receivedOn?: any;
  status: string;
}

export interface Order {
  id: number;
  number: string;
  includeFeeTransfer: boolean;
  amount: number;
  fxAmount: number;
  currency: string;
  netAmount: number;
  fee: number;
  description: string;
  status: string;
  createdOn: string;
  payment: PaymentPix;
  splits: any[];
  fxPayment?: any;
  paymentLink?: any;
  userTracking?: any;
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

export interface Plan {
  id: number;
  name: string;
  description: string;
  amount: number;
  products: any[];
  currency: string;
  gracePeriod: number;
  frequency: string;
  status: string;
  maxCharges: number;
  chargeDaysBefore: number;
  tax?: any;
  isVisible: boolean;
  paymentTypes: number[];
}

export interface Metadata { }

export interface PaymentsProps {
  id: number;
  paymentType: string;
  lastPayment?: any;
  nextPayment: string;
  status: string;
  retries: number;
  maxRetries: number;
  daysBetweenRetries: number;
  metadata: Metadata;
  createdOn: string;
  plan: Plan;
  customer: Customer;
  productCategory?: any;
  orders: Order[];
}
