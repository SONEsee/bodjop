import { UserModel, InvoiceModels } from "@/models";
import { INVOICE_DEBT_STATUS } from "@/enum/invoice_debts";
import axios from "@/helpers/axios";
export const UseDebtsStore = defineStore("debts", {
  state() {
    return {
      request_new_debts: {
        agency: null as UserModel.User | null,
        loading: false,
        tab: 1,
        title: {
          1: "ລົງເງິນຕັກໜີ້ / (Submit debts)",
          2: "ກຳນົດວົງເງິນຕັດໜີ້",
        } as { [key: number]: string },
        amount: null as number | null,
        file_image: null as File | null,
        invoices: [] as InvoiceModels.NewGetListInvoiceDebtResponseItem[],
      },
    };
  },

  actions: {
    async GetAgencyInvoiceDebtsData(id: string | null) {
      try {
        this.request_new_debts.loading = true;
        if (id === "") {
          return;
        }

        const res =
          await axios.get<InvoiceModels.NewGetListInvoiceDebtResponse>(
            `/api/v1/agency/get-debts-payment/${id}`
          );
        if (res.status === 200) {
          let items = res.data.items;
          this.request_new_debts.invoices = [];
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            this.request_new_debts.invoices.push({
              ...item,
              amount: 0,
              payment_type: 1,
              payment_date: null,
            });
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.request_new_debts.loading = false;
      }
    },

    async OnGotoNextStep() {
      try {
        if (this.request_new_debts.invoices.length === 0) {
          return;
        }

        if (this.request_new_debts.amount !== null) {
          let leftAmount = this.request_new_debts.amount;
          for (let i = 0; i < this.request_new_debts.invoices.length; i++) {
            let invoice = this.request_new_debts.invoices[i];
            if (leftAmount > 0) {
              const maxiumAmount = Math.min(leftAmount, invoice.debt_amount);
              invoice.amount = maxiumAmount;
              leftAmount = leftAmount - maxiumAmount;
            }
          }

          this.request_new_debts.tab = 2;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
