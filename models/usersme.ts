export interface UserMeResponse {
    error: null;
    items: Items;
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
    status:             number;
    money_outstanding:  number;
    gender:             number;
    image_profile:      string;
    username:           string;
}
