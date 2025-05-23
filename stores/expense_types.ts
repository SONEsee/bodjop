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
        sale_date: null,
      },

      response_get_data:
        null as ExpenseTypeModels.GetSaleExpenseTransasctionListDataResponseItems | null,

      expense_type_selections:
        [] as ExpenseTypeModels.GetExpenseSelectionResponseItem[],
      response_get_detail:
        null as ExpenseTypeModels.GetSaleExpenseTransasctionListDataResponseItemsListData | null,
      response_sale_expense_data:
        [] as ExpenseTypeModels.GetSaleExpenseTransactionExcelItem[],
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
      const dayjs = useDayjs();
      try {
        this.request_get_data.loading = true;

        const res =
          await axios.get<ExpenseTypeModels.GetSaleExpenseTransasctionListDataResponse>(
            "/api/v1/sale-expense-transactions/get-data",
            {
              params: {
                ...this.request_get_data,
                sale_date:
                  this.request_get_data.sale_date === null
                    ? ""
                    : dayjs(this.request_get_data.sale_date).format(
                        "YYYY-MM-DD"
                      ),
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

    async GetDetailData(id: string | null) {
      const globalStore = UseGlobalStore();
      globalStore.loading_overlay = true;
      try {
        if (id == null) {
          return;
        }

        const res =
          await axios.get<ExpenseTypeModels.GetSaleExpenseTransasctionDetailResponse>(
            `/api/v1/sale-expense-transactions/get-detail/${id}`
          );
        if (res.status === 200) this.response_get_detail = res.data.items;
      } catch (error) {
        console.error(error);
      } finally {
        globalStore.loading_overlay = false;
      }
    },

    async GetExportSaleExpenseData() {
      try {
        this.request_get_data.loading = true;
        const res =
          await axios.get<ExpenseTypeModels.GetSaleExpenseTransactionExcel>(
            "/api/v1/sale-expense-transactions/get-export-data"
          );

        if (res.status === 200) {
          this.response_sale_expense_data = res.data.items;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.request_get_data.loading = false;
      }
    },
  },
});
