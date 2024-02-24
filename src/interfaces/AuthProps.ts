export interface AppMetadata {
  provider: string;
  providers: string[];
}

export interface Adress {
  city: string;
  country?: any;
  district: string;
  number: string;
  reference: string;
  state?: any;
  street: string;
  zipCode: string;
}

export interface UserMetadata {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  picture: string;
  provider_id: string;
  sub: string;
  otp: string;
  phone: string;
  address: Adress;
  identification_number: string;
  birthdate: string;
  last_name: string;
  customer_id: string;
  stocks: string[];
  subscription_id: string;
}

export interface IdentityData {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  picture: string;
  provider_id: string;
  sub: string;
}

export interface Identity {
  id: string;
  user_id: string;
  identity_data: IdentityData;
  provider: string;
  last_sign_in_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Factor {
  id: string;
  created_at: string;
  updated_at: string;
  status: string;
  factor_type: string;
}

export interface UserProps {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: Date;
  phone: string;
  confirmed_at: Date;
  last_sign_in_at: Date;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  factors: Factor[];
  identities: Identity[];
  created_at: Date;
  updated_at: Date;
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

export interface PlanProps {
  id: number;
  paymentType: string;
  lastPayment?: any;
  nextPayment: string;
  status: string;
  retries: number;
  maxRetries: number;
  daysBetweenRetries: number;
  createdOn: string;
  plan: Plan;
  customer?: any;
  productCategory?: any;
}
