export interface UserLoginResponse {
  error: null;
  items: Items;
  status: number;
  timestamp: string;
}

export interface Items {
  user: User;
  token: string;
  refresh_token: string;
}

export interface User {
  id: string;
  username: string;
  status: number;
  profile_image: string;
  role: string;
  fullname: string;
  nick_name: string;
  agent_code: string;
}




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
    password:           string;
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


export interface Items {
  list_data:  ListDatum[];
  pagination: Pagination;
}


export enum ImageProfile {
  NA = "N/A",
}

export enum Role {
  Admin = "ADMIN",
  Amin = "AMIN",
}

export interface Pagination {
  current_page: number;
  limit:        number;
  total_count:  number;
  total_page:   number;
}
export interface EditUserRespons {
    error:     null;
    items:     Items;
    status:    number;
    timestamp: string;
}

export interface Items {
    id:                 string;
    agent_code:         string;
    village_id:         number;
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
    image_profile:      string;
    username:           string;
    village:            Village;
}

export interface Village {
    id:           number;
    vill_name:    string;
    vill_name_en: string;
    district_id:  number;
    district:     District;
}

export interface District {
    id:          number;
    dr_name:     string;
    dr_name_en:  string;
    province_id: number;
    province:    Province;
}

export interface Province {
    id:         number;
    pr_name:    string;
    pr_name_en: string;
}
export interface GetUserDetailResponse {
  error:     null;
  items:     GetUserDetailResponseI;
  status:    number;
  timestamp: string;
}

export interface Items {
  id:                 string;
  agent_code:         string;
  village_id:         number;
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
  image_profile:      string;
  username:           string;
  last_login:         Date;
  refresh_token_id:   string;
  village:            Village;
}

export interface Village {
  id:           number;
  vill_name:    string;
  vill_name_en: string;
  district_id:  number;
  district:     District;
}

export interface District {
  id:          number;
  dr_name:     string;
  dr_name_en:  string;
  province_id: number;
  province:    Province;
}

export interface Province {
  id:         number;
  pr_name:    string;
  pr_name_en: string;
}
