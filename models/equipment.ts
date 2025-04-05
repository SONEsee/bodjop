export interface EquipmentRespons {
    error:     null;
    items:     Item[];
    status:    number;
    timestamp: string;
}

export interface Item {
    agency_id:   string;
    agency_code: AgencyCode;
    pos_code:    string;
    imei:        DeviceID;
    device_id:   DeviceID;
}

export enum AgencyCode {
    Vte05 = "VTE-05",
}

export enum DeviceID {
    NA = "N/A",
}
