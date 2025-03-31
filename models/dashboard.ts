export interface MainCardDashboardResponse {
  error: null;
  items: MainCardItem[];
  status: number;
  timestamp: string;
}

export interface MainCardItem {
  icon: string;
  color: string;
  type: string;
  amount: number;
}

export interface MainGraphDataResponse {
  error: null;
  items: MainGraphDataResponseItem[];
  status: number;
  timestamp: string;
}

export interface MainGraphDataResponseItem {
  data: number[];
  categories: string[];
  type: string;
}
