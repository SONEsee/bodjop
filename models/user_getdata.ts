export interface UserRespons {
    error:     null;
    items:     Items;
    status:    number;
    timestamp: string;
   
}

export interface Items {
    list_data:  ListDatum[];
    pagination: Pagination;
}

export interface ListDatum {
    id:                 string;
    village_id:         number;
    fullname:           string;
    nick_name:          string;
    phone_number:       string;
    username:           string;
    created_at:         Date;
    created_by_user_id: string;
    role:               string;
    status:             number;
    gender:             number;
    image_profile:      string;
}

export interface Pagination {
    current_page: number;
    limit:        number;
    total_count:  number;
    total_page:   number;
}
