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
