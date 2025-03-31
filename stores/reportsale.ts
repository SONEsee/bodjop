import axios from "@/helpers/axios";
import { RaportSaleModel } from "@/models";


export const useReportSaleStore = defineStore("reportsale", {
  state() {
    return {
      response_data_report: [] as RaportSaleModel.Item[],
      request_sale_report: {
        sale_date: null as Date | string | null, // ແກ້ໄຂປະເພດຂໍ້ມູນໃຫ້ຮັບ Date, string ຫຼື null
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
              // ກວດສອບວ່າມີຄ່າຫຼືບໍ່ກ່ອນຈະ format
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
  },
});