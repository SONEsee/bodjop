import axios from "@/helpers/axios";
import { RaportSaleModel, AgentModel, EquipmentModel } from "@/models";

export const useReportSaleStore = defineStore("reportsale", {
  state() {
    return {
      request_agency_devices: {
        loading: false,
      },
      agent_data_report: [] as AgentModel.Item[],
      response_data_report: [] as RaportSaleModel.Item[],
      respose_equipment_report: [] as EquipmentModel.Item[],
      request_sale_report: {
        sale_date: null as Date | string | null,
      },
      loading: false,
    };
  },
  actions: {
    async GetReportSaleData() {
      this.loading = true;
      const dayjs = useDayjs();
      try {
        const res = await axios.get<RaportSaleModel.SaleResponse>(
          `/api/v1/reports/sales/get-data`,
          {
            params: {
              sale_date: this.request_sale_report.sale_date
                ? dayjs(this.request_sale_report.sale_date).format("YYYY-MM-DD")
                : null,
            },
          }
        );

        if (res.status === 200) {
          this.response_data_report = res.data.items;
          console.log("test", this.response_data_report);
        }
      } catch (error) {
        console.error("Error fetching report sale data:", error);
      } finally {
        this.loading = false;
      }
    },

    async GetAgentData() {
      this.loading = true;
      try {
        const res = await axios.get<AgentModel.AgencyRespons>(
          `/api/v1/agency/get-selection-data`
        );
        if (res.status === 200) {
          this.agent_data_report = res.data.items;
        }
      } catch (error) {
        console.error("Error fetching agent data:", error);
      }
    },
    async GetEnquipmentData(agencyId: string | null = null) {
      this.request_agency_devices.loading = true;
      try {
        let url = `/api/v1/reports/devices/get-data`;

        const res = await axios.get<EquipmentModel.EquipmentRespons>(url, {
          params: {
            agency_id: agencyId ?? "",
          },
        });

        if (res.status === 200) {
          this.respose_equipment_report = res.data.items;
        }
      } catch (error) {
        console.error("Error fetching equipment data:", error);
      } finally {
        this.request_agency_devices.loading = false;
      }
    },
  },
});
