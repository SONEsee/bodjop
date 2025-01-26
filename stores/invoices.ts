import { UserModel } from "@/models/";
export const UseInvoiceStore = defineStore("invoices", {
  state() {
    return {
      request_create_invoice_agency: {
        sale_date: null as string | null,
        agency_id: null as UserModel.User | null,
      },
    };
  },

  actions: {},
});
