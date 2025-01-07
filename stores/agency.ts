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
      },
    };
  },

  actions: {},
});
