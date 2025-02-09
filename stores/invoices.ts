import { UserModel, InvoiceModels } from "@/models/";
import axios from "@/helpers/axios";
export const UseInvoiceStore = defineStore("invoices", {
  state() {
    return {
      request_create_invoice_agency: {
        sale_date: null as string | null,
        agency_id: null as UserModel.User | null,
        loading: false,
      },

      response_get_for_create:
        null as InvoiceModels.GetInvoiceForCreateResponseItems | null,
    };
  },

  actions: {
    async GetInvoiceForCreate() {
      try {
        this.request_create_invoice_agency.loading = true;
        const dayjs = useDayjs();
        const res = await axios.get<InvoiceModels.GetInvoiceForCreateResponse>(
          "/api/v1/invoices/get-data-summarize",
          {
            params: {
              ...this.request_create_invoice_agency,
              sale_date: dayjs(
                this.request_create_invoice_agency.sale_date
              ).format("YYYY-MM-DD"),
              agency_id: this.request_create_invoice_agency?.agency_id?.id,
            },
          }
        );

        if (res.status === 200) {
          this.response_get_for_create = res.data.items;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.request_create_invoice_agency.loading = false;
      }
    },
  },
});
