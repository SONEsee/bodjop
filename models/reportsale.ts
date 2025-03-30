export interface SaleResponse {
  error: null;
  items: Item[];
  status: number;
  timestamp: string;
}

export interface Item {
  sale_date: Date;
  agency_code: string;
  total_sale_amount: number;
  pos_code: string;
}
