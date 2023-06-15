export interface CreditCardProps {
  id: number;
  created_at: Date;
  user_id: string;
  card_number: string;
  card_name: string;
  limit: number;
  background: string;
  color: string;
  maturity: number;
  closure: number;
}
