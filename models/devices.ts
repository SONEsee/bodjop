export interface DeviceSelectionResponse {
  error: null;
  items: DeviceSelectionResponseItem[];
  status: number;
  timestamp: string;
}

export interface DeviceSelectionResponseItem {
  id: string;
  pos_code: string;
  imei: string;
  status: number;
  device_status: number;
}

export interface DeviceMovementFileUpload {
  movement_date: string | Date;
  pos_code: string;
  agency_code: string;
}

export interface DeviceMovementFileUploadV2 {
  MOVEMENT_DATE: number | Date;
  POS_CODE: string | number;
  AGENCY_CODE: string;
}

export interface DeviceUploadFileRequest {
  pos_code: string;
  imei: string;
}

export interface DeviceAgencyUploadFile {
  agency_code: string;
  imei: string;
  pos_code: string;
  device_id: string;
}
