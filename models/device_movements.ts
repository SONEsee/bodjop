export interface GetDeviceMovementResponse {
  error: null;
  items: GetDeviceMovementResponseItem;
  status: number;
  timestamp: string;
}

export interface GetDeviceMovementResponseItem {
  list_data: ListDatum[];
  pagination: Pagination;
}

export interface ListDatum {
  id: string;
  created_by_user_id: string;
  total_pos_quantity: number;
  created_at: Date;
  updated_at: Date;
  movement_type: string;
  agency_id: string;
  movement_date: Date;
  status: number;
  user: User;
}

export interface User {
  id: string;
  agent_code: string;
  fullname: string;
  nick_name: string;
}

export interface Pagination {
  current_page: number;
  limit: number;
  total_count: number;
  total_page: number;
}

export interface GetDeviceMovementDetailResponse {
  error: null;
  items: GetDeviceMovementDetailResponseItem;
  status: number;
  timestamp: string;
}

export interface GetDeviceMovementDetailResponseItem {
  id: string;
  created_by_user_id: string;
  total_pos_quantity: number;
  created_at: Date;
  updated_at: Date;
  movement_type: string;
  agency_id: string;
  movement_date: Date;
  user: User;
  agency: Agency;
  status: number;
  device_movement_details: DeviceMovementDetail[];
}

export interface Agency {
  id: string;
  agent_code: string;
  fullname: string;
  nick_name: string;
  money_outstanding?: number;
}

export interface DeviceMovementDetail {
  id: string;
  device_movement_id: string;
  device_id: string;
  device_movement_date: Date;
  created_at: Date;
  updated_at: Date;
  pos_no: string;
  imei: string;
  agency_id: string;
}
