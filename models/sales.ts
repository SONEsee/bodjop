export interface OnSaleCreateModel {
  // agency_code: string;
  pos_code: string;
  sale_amount: number;
  // sale_date: any;
  one_digits: number;
  two_digits: number;
  three_digits: number;
  four_digits: number;
  five_digits: number;
  six_digits: number;
  province_name: string;
  unit: string;
}

export interface WinnerSaleCreateModel {
  pos_code: string;
  sale_amount: number;
  // sale_date: any;
  one_digits: number;
  two_digits: number;
  three_digits: number;
  four_digits: number;
  five_digits: number;
  six_digits: number;
  province_name: string;
  unit: string;
}

export interface OnSaleCreateModelAndWinnerSale {
  pos_code: string;
  sale_amount: number;
  one_digits: number;
  two_digits: number;
  three_digits: number;
  four_digits: number;
  five_digits: number;
  six_digits: number;
  province_name: string;
  unit: string;
  winner_sales: WinnerSaleCreateModel[];
}

export interface GetSaleListDataResponse {
  error: null;
  items: GetSaleListDataResponseItems;
  status: number;
  timestamp: string;
}

export interface GetSaleListDataResponseItems {
  list_data: GetSaleListDataResponseItemsListData[];
  pagination: Pagination;
}

export interface GetSaleListDataResponseItemsListData {
  id: string;
  total_amount: number;
  total_devices: number;
  created_at: Date;
  updated_at: Date;
  sale_date: Date;
  created_by_user_id: string;
  status: number;
  user: User;
}

export interface Pagination {
  current_page: number;
  limit: number;
  total_count: number;
  total_page: number;
}

export interface GetSaleDetailResponse {
  error: null;
  items: GetSaleDetailResponseItem;
  status: number;
  timestamp: string;
}

export interface GetSaleDetailResponseItem {
  id: string;
  total_amount: number;
  total_devices: number;
  created_at: Date;
  updated_at: Date;
  created_by_user_id: string;
  status: number;
  user: User;
  sale_date: Date;
  sale_details: SaleDetail[];
}

export interface SaleDetail {
  id: string;
  sale_date: Date;
  pos_code: string;
  amount: number;
  agency_id: string;
  created_at: Date;
  updated_at: Date;
  device_id: string;
  is_invoice: boolean;
  sale_id: string;
  status: number;
  one_digits: number;
  two_digits: number;
  three_digits: number;
  four_digits: number;
  five_digits: number;
  six_digits: number;
  province_name: string;
  unit: string;
  agency: User;
}

export interface User {
  id: string;
  agent_code: string;
  fullname: string;
  nick_name: string;
}

export interface GetSalePeriodResponse {
  error: null;
  items: GetSalePeriodResponseItem[];
  status: number;
  timestamp: string;
}

export interface GetSalePeriodCheckResponse {
  error: null;
  items: GetSalePeriodResponseItem;
  status: number;
  timestamp: string;
}

export interface GetSalePeriodResponseItem {
  sale_date: Date;
  id: string;
}

export interface UploadSaleItemBody {
  sale_date: string | number;
  pos_code: string;
  sale_amount: number;
  agency_code: string;
}

export interface UploadSaleBody {
  sale_date: string;
  items: UploadSaleItemBody[];
}
