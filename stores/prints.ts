import { PrintsModels } from "@/models";
import axios from "@/helpers/axios";
export const UsePrintStore = defineStore("prints", {
  state() {
    return {
      invoice_detail: null as PrintsModels.GetInvoicePrintResponseItem | null,
    };
  },

  actions: {
    async getInvoicePrint(id: string | null) {
      try {
        if (id === null) {
          return;
        }

        const res = await axios.get<PrintsModels.GetInvoicePrintResponse>(
          `/api/v1/invoices/print-detail/${id}`
        );

        if (res.status === 200) {
          this.invoice_detail = res.data.items;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
