import { UsermeModel } from "~/models";
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
        province_id: null
      },
      reques: {
        error: null,
        items: null as UsermeModel.UserMeResponseItems | null,
        status: null as number | null,
        timestamp: null as number | null,
      },
      respons_query_data: null as UsermeModel.UserMeResponseItems | null,
      response_detail_query_data:
        null as UsermeModel.UserMeResponseItems | null,
    };
  },
});
