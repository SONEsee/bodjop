export interface AgencyRespons {
    error:     null;
    items:     Item[];
    status:    number;
    timestamp: string;
}

export interface Item {
    id:                string;
    agent_code:        string;
    fullname:          string;
    nick_name:         string;
    money_outstanding: number;
}
