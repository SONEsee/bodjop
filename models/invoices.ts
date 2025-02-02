export interface GetInvoiceForCreateResponse {
  error: null;
  items: GetInvoiceForCreateResponseItems;
  status: number;
  timestamp: string;
}

export interface GetInvoiceForCreateResponseItems {
  total_sale_amount: number;
  total_devices: number;
  total_amount: number;
  total_average_amount: number;
  total_agency_debt: number;
  sales: Sale[];
}

export interface Sale {
  is_commission: boolean;
  type: string;
  amount: number;
  percentage: number;
  total_amount: number;
}
