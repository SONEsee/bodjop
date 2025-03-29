import axios from "@/helpers/axios";

import { UserGetdataModel, UsermeModel } from "~/models";
export const UserManageStore = defineStore("usermanage", {
  state() {
    return {
      form_create_data: {
        fullname: null as string | null,
        phone_number: null as string | null,
        role: null as string | null,
        password: null as string | null,
        nick_name: null as string | null,
        username: null as string | null,
        profile_image: null as File | null,
        village_id: null,
        district_id: null,
        province_id: null,
        gender: null as number | null,
        status: null as number | null,
      },

      reques: {
        error: null,
        items: null as UsermeModel.UserMeResponseItems | null,
        status: null as number | null,
        timestamp: null as number | null,
      },
      response_query_data: null as UserGetdataModel.GetUserResponseItems | null,
      response_detail_query_data:
        null as UserGetdataModel.GetUserDetailResponseItems | null,
      request_query_data: {
        q: null as string | null,
        limit: 20,
        page: 1,
        loading: false,
      },
    };
  },

  actions: {
    async GetData() {
      try {
        this.request_query_data.loading = true;
        const res = await axios.get<UserGetdataModel.GetUserResponse>(
          `/api/v1/users/get-data`,
          {
            params: {
              ...this.request_query_data,
            },
          }
        );
        console.log(res);
        if (res.status === 200) {
          this.response_query_data = res.data.items;
          console.log(this.response_query_data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.request_query_data.loading = false;
      }
    },
    async OndeleteUser(id: string): Promise<string | Error> {
      const globalStore = UseGlobalStore();
      try {
        const notification = await CallSwal({
          icon: "warning",
          title: "ຄຳເຕືອນ?",
          text: `ທ່ານຕອ້ງລົບຜູ້ໃຊ້ງານນີ້ອອກແທ້ບໍບໍ່?`,
          showCancelButton: true,
          confirmButtonText: "ຕົກລົງ",
          cancelButtonText: "ຍົກເລີກ",
        });
        if (notification.isConfirmed) {
          globalStore.loading_overlay = true;
          const res = await axios.delete(`/api/v1/users/delete/${id}`);
          if (res.status === 200) {
            return id;
          }
        }
        return "";
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async Getdetail(id: string | null) {
      const globalStore = UseGlobalStore();
      try {
        if (id === null || id == "") {
          return;
        }
        globalStore.loading_overlay = true;
        const res = await axios.get<UserGetdataModel.GetUserDetailResponse>(
          `/api/v1/users/get-detail/${id}`
        );

        if (res.status == 200) {
          const item = res.data.items ?? null;
          this.response_detail_query_data = item;
          if (item !== null) {
            const province_id = item.village?.district?.province_id ?? null;
            const district_id = item.village?.district_id ?? null;
            await globalStore.GetDistrictData(province_id, null);
            await globalStore.GetVillagesData(
              district_id?.toString() ?? null,
              null
            );
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        globalStore.loading_overlay = false;
      }
    },

    async OnGetAndEditUser(id: string) {
      const globalStore = UseGlobalStore();
      try {
        globalStore.loading_overlay = true;
        await this.Getdetail(id);
        let item = this.response_detail_query_data;
        if (item != null) {
          const globalStore = UseGlobalStore();
          const provinceID = item?.village?.district?.province_id ?? null;
          const districtId = item?.village?.district_id ?? null;
          await globalStore.GetVillagesData(
            districtId?.toString() ?? null,
            null
          );
          await globalStore?.GetDistrictData(provinceID, null);
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
        console.error(error);
      } finally {
        globalStore.loading_overlay = false;
      }
    },
  },
});
