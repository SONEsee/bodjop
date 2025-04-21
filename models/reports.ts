export interface GetInvoiceReportResponse {
  error: null;
  items: GetInvoiceReportResponseItem[];
  status: number;
  timestamp: string;
}

export interface GetInvoiceReportResponseItem {
  invoice_id: string;
  invoice_code: string;
  sale_date: Date;
  agency_code: string;
  agency_name: string;
  sales: number;
  basic_com: number;
  basic_com_percent: number;
  ontime_com: number;
  ontime_percent: number;
  normal_prize: number;
  bill_prize: number;
  borrow_amount: number;
  prize_com: number;
  refill_card: number;
  other_expense: number;
  settle_amount: number;
  check_amount: number;
}

export interface GetPaymentInvoiceTransactionReportResponse {
  error: null;
  items: GetPaymentInvoiceTransactionReportResponseItem[];
  status: number;
  timestamp: string;
}

export interface GetPaymentInvoiceTransactionReportResponseItem {
  id: string;
  invoice_detail_id: string;
  invoice_code: string;
  sale_date: Date;
  payment_type: number;
  payment_amount: number;
  image_url: string;
  agency_code: string;
  fullname: string;
  total_settle_amount: number;
}

export interface GetReportSaleTotalResponse {
  error: null;
  items: GetReportSaleTotalResponseItem;
  status: number;
  timestamp: string;
}

export interface GetReportSaleTotalResponseItem {
  agencycode_group: string[];
  headers: string[];
  list_data: GetReportSaleTotalResponseItemListData[];
}

export interface GetReportSaleTotalResponseItemListData {
  agency_id: string;
  agency_code: string;
  agency_main_group: string;
  is_main_group: boolean;
  xaxis: Array<number | string>;
}
