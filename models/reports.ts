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
