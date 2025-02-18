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

      request_get_data: {
        limit: 20,
        page: 1,
        loading: false,
      },

      response_get_data:
        null as InvoiceModels.GetInvoiceDataResponseItem | null,
      repsonse_get_detail_invoice_data:
        null as InvoiceModels.GetInvoiceDetailResponseItem | null,
      response_invoice_debts:
        [] as InvoiceModels.GetListInvoiceDebtResponseItem[],

      request_invoice_payment_transactions: {
        page: 1,
        limit: 20,
        q: null as string | null,
        loading: false,
      },
      response_invoice_payment_transactions:
        null as InvoiceModels.GetInvoicePaymentTransactionResponseItem | null,
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

    async GetInvoiceData() {
      try {
        this.request_get_data.loading = true;
        const res = await axios.get<InvoiceModels.GetInvoiceDataResponse>(
          "/api/v1/invoices/get-data",
          {
            params: {
              ...this.request_get_data,
            },
          }
        );

        if (res.status === 200) {
          this.response_get_data = res.data.items;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.request_get_data.loading = false;
      }
    },

    async GetInvoiceDetailData(id: string | null) {
      const globalStore = UseGlobalStore();
      try {
        globalStore.loading_overlay = true;
        if (id === null) {
          return;
        }
        const res = await axios.get<InvoiceModels.GetInvoiceDetailResponse>(
          `/api/v1/invoices/get-detail/${id}`
        );
        if (res.status === 200) {
          this.repsonse_get_detail_invoice_data = res.data.items ?? null;
        }
      } catch (error) {
        console.error(error);
      } finally {
        globalStore.loading_overlay = false;
      }
    },

    async GetInvoiceDebtData(id: string | null) {
      try {
        if (id === null) {
          return;
        }

        const res = await axios.get<InvoiceModels.GetListInvoiceDebtResponse>(
          `/api/v1/agency/get-debts/${id}`
        );
        if (res.status === 200) {
          this.response_invoice_debts = res.data.items;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async GetAgencyInvoicePaymentAmount(id: string | null) {
      try {
        if (!id) {
          return;
        }
        this.request_invoice_payment_transactions.loading = true;
        const res =
          await axios.get<InvoiceModels.GetInvoicePaymentTransactionResponse>(
            `/api/v1/agency/get-invoice-payment/${id}`,
            {
              params: {
                ...this.request_invoice_payment_transactions,
              },
            }
          );
        if (res.status === 200) {
          this.response_invoice_payment_transactions = res.data.items;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.request_invoice_payment_transactions.loading = false;
      }
    },
  },
});
