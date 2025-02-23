export interface GetUserResponse {
    error:     null;
    items:     GetUserResponseItems;
    status:    number;
    timestamp: string;
}

export interface GetUserResponseItems {
    list_data:  GetUserResponseItemsListDatum[];
    pagination: Pagination;
}

export interface GetUserResponseItemsListDatum {
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


export interface GetUserDetailResponse {
    error:     null;
    items:     GetUserDetailResponseItems | null;
    status:    number;
    timestamp: string;
}

export interface GetUserDetailResponseItems {
    id:                 string;
    agent_code:         string;
    village_id:         number | null;
    fullname:           string;
    nick_name:          string;
    phone_number:       string;
    agent_type:         string;
    created_at:         Date;
    updated_at:         Date;
    created_by_user_id: string;
    role:               string;
    password:           string;
    status:             number;
    money_outstanding:  number;
    gender:             number;
    image_profile:      string |  File;
    username:           string;
    last_login:         Date;
    refresh_token_id:   string;
    village:            Village;
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
