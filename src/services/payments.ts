import { formatCellPhone, removeMaskCPF } from 'utils';

import { api } from './api';

export interface Address {
  street: string;
  number: string;
  zipcode: string;
  reference: string;
  district: string;
  city: string;
  state: number;
  country: number;
}

export interface CreateCustomerProps {
  firstName: string;
  surname: string;
  identificationNumber: string;
  birthdate: string;
  email: string;
  phone: string;
  address: Address;
}

export interface Disputes {
  total: number;
  details: any[];
}

export interface Card {
  id: number;
  cardBrand: string;
  holderName: string;
  expirationMonth: number;
  expirationYear: number;
  firstDigits: string;
  lastDigits: string;
  isDefault: boolean;
}

export interface Order {
  id: number;
  storeId: number;
  status: string;
  number: string;
}

export interface Subscription {
  id: number;
  status: string;
  name: string;
  frequency: string;
  products?: any;
  total: number;
  lastPayment: string;
  nextPayment: string;
}

export interface Spent {
  total: number;
  sales: number;
  lastPayment: string;
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
  createdOn: string;
}

export interface IdentificationNumberResult {
  customer: Customer;
  spent: Spent;
  subscriptions: Subscription[];
  orders: Order[];
  cards: Card[];
  disputes: Disputes;
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

export interface SubscriptionDetailsResult {
  id: number;
  paymentType: string;
  lastPayment?: any;
  nextPayment: string;
  status: string;
  retries: number;
  maxRetries: number;
  daysBetweenRetries: number;
  metadata: {};
  createdOn: string;
  plan: Plan;
  customer?: any;
  productCategory?: any;
}

export async function createCustomer(values: CreateCustomerProps) {
  const { data } = await api.post('payments/customers', {
    firstName: values.firstName,
    surname: values.surname,
    identificationNumber: removeMaskCPF(values.identificationNumber),
    birthdate: values.birthdate,
    phone: formatCellPhone(values.phone),
    email: values.email,
    address: {
      street: values.address.street,
      number: values.address.number,
      zipcode: values.address.zipcode,
      reference: values.address.reference,
      district: values.address.district,
      city: values.address.city,
      state: values.address.state,
      country: values.address.country,
    },
  });

  return { data };
}

export async function updateCustomer(values: CreateCustomerProps, id: string) {
  const { data } = await api.put(`payments/customers/${id}`, {
    firstName: values.firstName,
    surname: values.surname,
    identificationNumber: removeMaskCPF(values.identificationNumber),
    birthdate: values.birthdate,
    phone: formatCellPhone(values.phone),
    email: values.email,
    address: {
      street: values.address.street,
      number: values.address.number,
      zipcode: values.address.zipcode,
      reference: values.address.reference,
      district: values.address.district,
      city: values.address.city,
      state: values.address.state,
      country: values.address.country,
    },
  });

  return { data };
}

export async function getPlansList() {
  const { data } = await api.get('payments/plans/list');

  return { data };
}

export async function subscribePlan(
  planId: number,
  customerId: string,
  type: string,
  cardId?: number,
) {
  const { data } = await api.post('payments/subscriptions', {
    planId,
    customerId,
    payment: {
      type,
      cardId,
    },
  });

  return { data };
}

export async function getCustumerCreditCards(customerId: string) {
  const { data } = await api.get(`payments/customers/${customerId}/cards`);

  return { data };
}

export async function deleteCustumerCreditCard(
  customerId: string,
  cardId: number,
) {
  const { data, status } = await api.delete(
    `payments/customers/${customerId}/cards/${cardId}`,
  );

  return { data, status };
}

export async function createCustumerCreditCard(
  customerId: string,
  card: {
    holderName: string;
    expirationMonth: number;
    expirationYear: number;
    cardNumber: string;
    securityCode: string;
  },
) {
  const { data } = await api.post(
    `payments/customers/${customerId}/cards`,
    card,
  );

  return { data };
}

export async function getCustumerByIdentificationNumber(
  identificationNumber: string,
) {
  const { data } = await api.get<IdentificationNumberResult>(
    `payments/customers/${identificationNumber}`,
  );

  return { data };
}

export function getCustomerSubscriptionDetails(subscriptionId: string) {
  return api.get<SubscriptionDetailsResult>(
    `payments/subscriptions/${subscriptionId}`,
  );
}

export function getOrdersList(customerId: string) {
  return api.get(`payments/customers/${customerId}/orders`);
}
