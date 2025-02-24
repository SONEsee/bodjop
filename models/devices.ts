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
