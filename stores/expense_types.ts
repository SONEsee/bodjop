import { ExpenseTypeModels } from "@/models";
import axios from "@/helpers/axios";
export const UseExpenseTypeStore = defineStore("expense_types", {
  state() {
    return {
      request_get_data: {
        page: 1,
        limit: 20,
        q: null,
        loading: false,
      },

      response_get_data:
        null as ExpenseTypeModels.GetSaleExpenseTransasctionListDataResponseItems | null,

      expense_type_selections:
        [] as ExpenseTypeModels.GetExpenseSelectionResponseItem[],
    };
  },

  actions: {
    async GetExpenseTypeSelectionData() {
      try {
        const res =
          await axios.get<ExpenseTypeModels.GetExpenseSelectionResponse>(
            "/api/v1/expense-types/get-data-selections"
          );
        if (res.status === 200) {
          this.expense_type_selections = res.data.items;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async GetListDataSaleExpenseTypeTransaction() {
      try {
        this.request_get_data.loading = true;
        const res =
          await axios.get<ExpenseTypeModels.GetSaleExpenseTransasctionListDataResponse>(
            "/api/v1/sale-expense-transactions/get-data",
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
  },
});
