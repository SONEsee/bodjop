import { ReportModel } from "@/models/";
import axios from "@/helpers/axios";

export const UseReportStore = defineStore("reports", {
  state() {
    return {
      request_invoice_report: {
        sale_date: null,
        loading: false,
      },
      response_invoice_report: [] as ReportModel.GetInvoiceReportResponseItem[],
    };
  },

  actions: {
    async GetInvoiceReport() {
      try {
        this.request_invoice_report.loading = true;
        const dayjs = useDayjs();
        const res = await axios.get<ReportModel.GetInvoiceReportResponse>(
          "/api/v1/reports/invoices/get-data",
          {
            params: {
              ...this.request_invoice_report,
              sale_date:
                this.request_invoice_report.sale_date != null
                  ? dayjs(this.request_invoice_report.sale_date).format(
                      "YYYY-MM-DD"
                    )
                  : "",
            },
          }
        );
        if (res.status === 200) {
          this.response_invoice_report = res.data.items;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.request_invoice_report.loading = false;
      }
    },
  },
});
