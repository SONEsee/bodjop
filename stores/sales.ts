import { SaleModels } from "@/models/";
import axios from "@/helpers/axios";

export const UseSaleStore = defineStore("sales", {
  state() {
    return {
      sale_request_create: {
        sale_date: null,
        items: [] as SaleModels.OnSaleCreateModelAndWinnerSale[],
      },
      sale_periods: [] as SaleModels.GetSalePeriodResponseItem[],
      sale_period_check: null as SaleModels.GetSalePeriodResponseItem | null,
      request_sale_get_data: {
        page: 1,
        limit: 20,
        q: null,
        loading: false,
        sale_date: null as Date | null,
      },
      response_sale_get_data:
        null as SaleModels.GetSaleListDataResponseItems | null,
      response_sale_detail: null as SaleModels.GetSaleDetailResponseItem | null,
    };
  },

  actions: {
    async GetSaleListData() {
      try {
        this.request_sale_get_data.loading = true;
        const dayjs = useDayjs();
        const res = await axios.get<SaleModels.GetSaleListDataResponse>(
          "/api/v1/sales/get-data",
          {
            params: {
              ...this.request_sale_get_data,
              sale_date:
                this.request_sale_get_data.sale_date !== null
                  ? dayjs(this.request_sale_get_data.sale_date).format(
                      "YYYY-MM-DD"
                    )
                  : "",
            },
          }
        );

        if (res.status === 200) {
          this.response_sale_get_data = res.data.items;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.request_sale_get_data.loading = false;
      }
    },

    async GetSaleDetail(id: string | null) {
      const globalStore = UseGlobalStore();
      try {
        globalStore.loading_overlay = true;
        if (id === null) {
          this.response_sale_detail = null;
          return;
        }

        const res = await axios.get<SaleModels.GetSaleDetailResponse>(
          `/api/v1/sales/get-detail/${id}`
        );
        if (res.status === 200) {
          this.response_sale_detail = res.data.items;
        }
      } catch (error) {
        console.error(error);
      } finally {
        globalStore.loading_overlay = false;
      }
    },

    async OnCancelSale(id: string) {
      const globalStore = UseGlobalStore();
      try {
        const notification = await CallSwal({
          icon: "warning",
          title: "ຄຳເຕືອນ",
          text: "ທ່ານກຳລັງຍົກເລີກຂໍ້ມູນການຂາຍທ່ານແນ່ໃຈແລ້ວບໍ່?",
          showCancelButton: true,
          confirmButtonText: "ຕົກລົງ",
          cancelButtonText: "ຍົກເລີກ",
        });

        if (notification.isConfirmed) {
          this.request_sale_get_data.loading = true;
          const res = await axios.delete(`/api/v1/sales/cancel/${id}`);
          this.request_sale_get_data.loading = false;
          if (res.status === 200) {
            const successNotification = await CallSwal({
              icon: "success",
              title: "ສຳເລັດ",
              text: "ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ",
            });
            if (successNotification.isConfirmed) {
              await this.GetSaleListData();
            } else {
              await this.GetSaleListData();
            }
          }
        }
      } catch (error) {
        console.error(error);
        DefaultSwalError(error);
      } finally {
        this.request_sale_get_data.loading = false;
      }
    },

    async GetSalePeriodListData() {
      try {
        const res = await axios.get<SaleModels.GetSalePeriodResponse>(
          "/api/v1/sales/get-period-data"
        );
        if (res.status === 200) {
          this.sale_periods = res.data?.items ?? [];
        }
      } catch (error) {
        console.error(error);
      }
    },

    async GetSalePeriodCheck(sale_date: Date | null) {
      try {
        if (sale_date === null) {
          return;
        }
        const dayjs = useDayjs();
        const saleDate = dayjs(sale_date).format("YYYY-MM-DD");
        const res = await axios.get<SaleModels.GetSalePeriodCheckResponse>(
          "/api/v1/sales/get-period-check",
          {
            params: {
              sale_date: saleDate,
            },
          }
        );

        if (res.status === 200) {
          const item = res.data.items;
          if (item.id != "") {
            this.sale_period_check = item;
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
