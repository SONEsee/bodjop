import axios from "@/helpers/axios";
import { DashboardModel } from "@/models";

export const UseDashboardStore = defineStore("dashboard", {
  state() {
    return {
      response_main_card: [] as DashboardModel.MainCardItem[],
      request_main_card: {
        loading: false,
      },
      response_graph_data: [] as DashboardModel.MainGraphDataResponseItem[],
      request_graph_data: {
        loading: false,
      },
    };
  },

  actions: {
    async GetMainCardDashboard() {
      try {
        this.request_main_card.loading = true;
        const res = await axios.get<DashboardModel.MainCardDashboardResponse>(
          "/api/v1/dashboard/main-card"
        );
        if (res.status === 200) {
          this.response_main_card = res.data.items;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.request_main_card.loading = false;
      }
    },

    async GetGraphDataDashboard() {
      try {
        this.request_graph_data.loading = true;
        const res = await axios.get<DashboardModel.MainGraphDataResponse>(
          "/api/v1/dashboard/graph-data"
        );
        if (res.status === 200) {
          this.response_graph_data = res.data.items;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.request_graph_data.loading = false;
      }
    },
  },
});
