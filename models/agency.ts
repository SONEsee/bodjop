import type { GetIdentitiesResponse } from "./identities";
import type { User } from "./users";
import type { UserCommission } from "./user_commissions";

export interface IdentitiesAgency {
  type: string;
  identity_no: string;
  file: File;
}

export interface CommissionAgency {
  percentage: number;
  id: string | null;
  active_percentage: number;
  type: string;
  special_commissions: CommissionSpecialAgency[];
}

export interface CommissionSpecialAgency {
  minimum_amount: number;
  maximum_amount: number;
  percentage: number;
  id: string | null;
  active_percentage: number;
}

export interface GetAgencyResponse {
  error: null;
  items: GetAgencyResponseItems;
  status: number;
  timestamp: string;
}

export interface GetAgencyDetailResponse {
  error: null;
  items: GetDetailAgencyResponse | null;
  status: number;
  timestamp: string;
}

export interface GetAgencyResponseItems {
  list_data: GetAgencyResponseItemsListData[];
  pagination: Pagination;
}

export interface GetAgencyResponseItemsListData {
  id: string;
  agent_code: string;
  village_id: number;
  fullname: string;
  nick_name: string;
  phone_number: string;
  agent_type: string;
  created_at: Date;
  updated_at: Date;
  created_by_user_id: string;
  role: string;
  status: number;
  money_outstanding: number;
  gender: number;
  image_profile: string;
  username: string;
  village: Village;
}

export interface GetDetailAgencyResponse {
  id: string;
  agent_code: string;
  village_id: number | null;
  fullname: string;
  nick_name: string;
  phone_number: string;
  agent_type: string;
  created_at: Date;
  updated_at: Date;
  created_by_user_id: string;
  role: string;
  status: number;
  money_outstanding: number;
  gender: number;
  image_profile: string | File;
  username: string;
  village: Village;
  user_identities: GetIdentitiesResponse[];
  user_commissions: UserCommission[];
}

export interface Pagination {
  current_page: number;
  limit: number;
  total_count: number;
  total_page: number;
}

export interface Village {
  id: number;
  vill_name: string;
  vill_name_en: string;
  district_id: number | null;
  district: District;
}

export interface District {
  id: number;
  dr_name: string;
  dr_name_en: string;
  province_id: number;
  province: Province;
}

export interface Province {
  id: number;
  pr_name: string;
  pr_name_en: string;
}

export interface GetAgencySelectionResponse {
  error: null;
  items: User[];
  status: number;
  timestamp: string;
}

export interface GetAgencyDeviceResponse {
  error: null;
  items: GetAgencyDeviceResponseItem;
  status: number;
  timestamp: string;
}

export interface GetAgencyDeviceResponseItem {
  list_data: ListDatum[];
  pagination: Pagination;
}

export interface ListDatum {
  id: string;
  device_id: string;
  agency_id: string;
  status: number;
  created_at: Date;
  updated_at: Date;
  device: Device;
}

export interface Device {
  id: string;
  pos_no: string;
  imei: string;
  status: number;
  device_status: number;
  device_id: string;
  latest_agency_id: string;
}

export interface GetAgencyMemberResponse {
  error: null;
  items: GetAgencyMemberResponseItem;
  status: number;
  timestamp: string;
}

export interface GetAgencyMemberResponseItem {
  list_data: GetAgencyMemberResponseItemListData[];
  pagination: Pagination;
}

export interface GetAgencyMemberResponseItemListData {
  fullname: string;
  tel: string;
  percentage: number;
}
