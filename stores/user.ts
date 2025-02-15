import { UsermeModel, UserGetdataModel } from "~/models";
import axios from "~/helpers/axios";

export const UseUserStore = defineStore("user", {
  state() {
    return {
      form_create_data: {
        fullname: null as string | null,
        phone_number: null as string | null,
        role: null as string | null,
        password: null as string | null,
        gender: 1,
        username: null as string | null,
        profile_image: null as File | null,
        village_id: null,
        district_id: null,
        province_id: null,
      },
      reques: {
        error: null,
        items: null as UsermeModel.UserMeResponseItems | null,
        status: null as number | null,
        timestamp: null as number | null,
      },
      request_query_data: {
        q: null as string | null,
        limit: 10,
        page: 1,
        loading: false,
      },
      respons_query_data: null as UserGetdataModel.UserRespons | null,
      response_detail_query_data:
        null as UsermeModel.UserMeResponseItems | null,
      error: null as string | null,
    };
  },
  actions: {
    async GetData() {
      try {
        this.request_query_data.loading = true;
        const res = await axios.get<UsermeModel.UserMeResponse>(
          `/api/v1/users/get-data`,
          {
            params: {
              ...this.request_query_data,
            },
          }
        );
        if (res.status === 200) {
          this.respons_query_data = res.data;
        }
      } catch (error) {}
    },
    async GetDetailData(id: string | null) {
      try {
        if (id === null || id == "") {
          return;
        }
        const res = await axios.get<UsermeModel.UserMeResponse>(
          `/api/v1/users/get-detail/${id}`
        );

        if (res.status === 200) {
          this.response_detail_query_data = res.data.items;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async onGetAndEditUser(id: string | null) {
      const globalStore = UseGlobalStore();
      try {
        globalStore.loading_overlay = true;
        await this.GetDetailData(id);

        let item = this.response_detail_query_data;
        if (item != null) {
          const globalStore = UseGlobalStore();
          const ProvinceID = item?.village?.district?.province_id ?? null;
          const districtId = item.village.district_id ?? null;
          await globalStore.GetVillagesData(
            districtId?.toString() ?? null,
            null
          );
          await globalStore?.GetDistrictData(ProvinceID, null);
          if (
            item.image_profile !== null &&
            item.image_profile != "" &&
            item.image_profile != "N/A"
          ) {
            item.image_profile = await globalStore.GetFileData(
              item.image_profile
            );
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        globalStore.loading_overlay = false;
      }
    },
  },
});
