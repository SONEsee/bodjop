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

export interface GetInvoiceDataResponse {
  error: null;
  items: GetInvoiceDataResponseItem;
  status: number;
  timestamp: string;
}

export interface GetInvoiceDataResponseItem {
  list_data: ListDatum[];
  pagination: Pagination;
}

export interface ListDatum {
  id: string;
  created_by_user_id: string;
  created_at: Date;
  updated_at: Date;
  status: number;
  user: User;
}

export interface GetInvoiceDetailResponse {
  error: null;
  items: GetInvoiceDetailResponseItem;
  status: number;
  timestamp: string;
}

export interface GetInvoiceDetailResponseItem {
  id: string;
  created_by_user_id: string;
  created_at: Date;
  updated_at: Date;
  status: number;
  user: User;
  invoice_details: InvoiceDetail[];
}

export interface InvoiceDetail {
  id: string;
  agency_id: string;
  total_devices: number;
  invoice_id: string;
  status: number;
  total_average_amount: number;
  total_amount: number;
  total_debt: number;
  total_sale_amount: number;
  agency: User;
  invoice_calculations: InvoiceCalculation[];
}

export interface User {
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

export interface GetListInvoiceDebtResponse {
  error: null;
  items: GetListInvoiceDebtResponseItem[];
  status: number;
  timestamp: string;
}

export interface NewGetListInvoiceDebtResponse {
  error: null;
  items: NewGetListInvoiceDebtResponseItem[];
  status: number;
  timestamp: string;
}

export interface NewGetListInvoiceDebtResponseItem {
  invoice_detail_id: string;
  invoice_id: string;
  sale_date: Date;
  innitial_amount: number;
  debt_amount: number;
  amount: number;
}

export interface GetListInvoiceDebtResponseItem {
  invoice_detail_id: string;
  invoice_id: string;
  sale_date: Date;
  innitial_amount: number;
  debt_amount: number;
}

export interface GetInvoicePaymentTransactionResponse {
  error: null;
  items: GetInvoicePaymentTransactionResponseItem;
  status: number;
  timestamp: string;
}

export interface GetInvoicePaymentTransactionResponseItem {
  list_data: GetInvoicePaymentTransactionResponseItemListdata[];
  pagination: Pagination;
}

export interface GetInvoicePaymentTransactionResponseItemListdata {
  id: string;
  invoice_detail_id: string;
  sale_date: Date;
  payment_amount: number;
  username: string;
  fullname: string;
  created_at: Date;
}

export interface Pagination {
  current_page: number;
  limit: number;
  total_count: number;
  total_page: number;
}
