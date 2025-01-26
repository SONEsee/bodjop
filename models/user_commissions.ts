export interface UserCommission {
  id: string;
  percentage: number;
  user_id: string;
  status: number;
  type: string;
  active_percentage: number;
  special_commissions: SpecialCommission[];
}

export interface SpecialCommission {
  id: string;
  user_commission_id: string;
  minimum_amount: number;
  maximum_amount: number;
  percentage: number;
}
