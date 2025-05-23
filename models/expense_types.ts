export interface GetExpenseSelectionResponse {
  error: null;
  items: GetExpenseSelectionResponseItem[];
  status: number;
  timestamp: string;
}

export interface GetExpenseSelectionResponseItem {
  id: string;
  name: string;
  name_en: string;
  created_at: Date;
  updated_at: Date;
  created_by_user_id: string;
  delete_by_user_id: string;
  status: number;
  code: string;
}

export interface GetSaleExpenseTransasctionListDataResponse {
  error: null;
  items: GetSaleExpenseTransasctionListDataResponseItems;
  status: number;
  timestamp: string;
}

export interface GetSaleExpenseTransasctionListDataResponseItems {
  list_data: GetSaleExpenseTransasctionListDataResponseItemsListData[];
  pagination: Pagination;
}

export interface GetSaleExpenseTransasctionListDataResponseItemsListData {
  id: string;
  expense_type_id: string;
  amount: number;
  created_at: Date;
  updated_at: Date;
  created_by_user_id: string;
  description: string;
  agency_id: string;
  sale_date: Date;
  status: number;
  user: Agency;
  agency: Agency;
  expense_type: ExpenseType;
}

export interface Agency {
  id: string;
  agent_code: string;
  fullname: string;
  nick_name: string;
}

export interface ExpenseType {
  id: string;
  name: string;
  name_en: string;
  created_at: Date;
  status: number;
  code: string;
}

export interface Pagination {
  current_page: number;
  limit: number;
  total_count: number;
  total_page: number;
}

export interface GetSaleExpenseTransasctionDetailResponse {
  error: null;
  items: GetSaleExpenseTransasctionListDataResponseItemsListData;
  status: number;
  timestamp: string;
}

export interface ExpenseTypeTransactionUploadFile {
  sale_date: number | Date;
  agency_code: string;
  amount: number;
  expense_type: string;
  note: string;
}

export interface ExpenseTypeTransactionUploadFileResponse {
  sale_date: string | Date;
  agency_code: string;
  amount: number;
  expense_type: string;
  note: string;
}

export interface GetSaleExpenseTransactionExcel {
  error: null;
  items: GetSaleExpenseTransactionExcelItem[];
  status: number;
  timestamp: string;
}

export interface GetSaleExpenseTransactionExcelItem {
  sale_date: Date;
  agency_code: string;
  agency_name: string;
  expense_code: string;
  expense_name: string;
  exponse_name_en: string;
  amount: number;
  expense_create_at: Date;
  create_fullname: string;
}
