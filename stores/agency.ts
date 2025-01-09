import { AgencyModel } from "@/models";
import axios from "@/helpers/axios";
export const UseAgencyStore = defineStore("agency", {
  state() {
    return {
      form_create_data: {
        fullname: null as string | null,
        nick_name: null as string | null,
        phone_number: null as string | null,
        agency_code: null as string | null,
        agency_type: null as string | null,
        province_id: null,
        district_id: null,
        village_id: null,
        username: null as string | null,
        password: null as string | null,
        confirm_password: null as string | null,
        status: null,
        profile_image: null as File | null,
        identities: [] as AgencyModel.IdentitiesAgency[],
      },

      identity_request: {
        type: null as string | null,
        dialog: false,
        identity_no: null as string | null,
        file: null as File | null,
      },

      request_query_data: {
        q: null as string | null,
        limit: 20,
        page: 1,
        loading: false,
      },

      response_query_data: null as AgencyModel.GetAgencyResponseItems | null,
      response_detail_query_data:
        null as AgencyModel.GetDetailAgencyResponse | null,
    };
  },

  actions: {
    async GetListData() {
      try {
        this.request_query_data.loading = true;
        const res = await axios.get<AgencyModel.GetAgencyResponse>(
          "/api/v1/agency/get-data",
          {
            params: {
              ...this.request_query_data,
            },
          }
        );
        if (res.status === 200) {
          this.response_query_data = res.data.items;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.request_query_data.loading = false;
      }
    },

    async GetDetailAgencyData(id: string | null) {
      try {
        if (id === null || id == "") {
          return;
        }

        const res = await axios.get<AgencyModel.GetAgencyDetailResponse>(
          `/api/v1/agency/get-detail/${id}`
        );
        if (res.status === 200) {
          this.response_detail_query_data = res.data.items;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
