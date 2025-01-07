export interface DeviceDetailidResponse {
    error:     null;
    items:     Items;
    status:    number;
    timestamp: string;
}

export interface Items {
    id:                  string;
    pos_no:              string;
    imei:                string;
    created_at:          Date;
    updated_at:          Date;
    created_by_user_id:  string;
    create_username:     string;
    create_fullname:     string;
    create_nickname:     string;
    status:              number;
    device_locations:    DeviceLocation[];
    device_transactions: DeviceTransaction[];
}

export interface DeviceLocation {
    id:         string;
    latitude:   number;
    longitude:  number;
    device_id:  string;
    created_at: Date;
    updated_at: Date;
}

export interface DeviceTransaction {
    id:         string;
    name:       string;
    name_en:    string;
    created_at: Date;
    status:     number;
}