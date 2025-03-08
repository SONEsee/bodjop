export interface GetInvoicePrintResponse {
  error: null;
  items: GetInvoicePrintResponseItem;
  status: number;
  timestamp: string;
}

export interface GetInvoicePrintResponseItem {
  id: string;
  agency_id: string;
  total_devices: number;
  invoice_id: string;
  created_at: Date;
  updated_at: Date;
  status: number;
  total_average_amount: number;
  total_amount: number;
  total_debt: number;
  total_sale_amount: number;
  agency: Agency;
  invoice_calculations: InvoiceCalculation[];
  sale_date: Date;
}

export interface Agency {
  id: string;
  agent_code: string;
  fullname: string;
  nick_name: string;
  money_outstanding: number;
}

export interface InvoiceCalculation {
  id: string;
  invoice_detail_id: string;
  commissions_type: string;
  amount: number;
  percentage: number;
  total_amount: number;
  created_at: Date;
  updated_at: Date;
  is_commission: boolean;
}
