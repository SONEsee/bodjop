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
        province_id: null
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
      response_detail_query_data: null as UsermeModel.UserMeResponseItems | null,
      error: null as string | null, 
    };
  },
  actions:{
    async GetData(){
      try {
        this.request_query_data.loading = true;
        const res =await axios.get<UsermeModel.UserMeResponse>(`/api/v1/users/get-data`,{
          params:{
            ...this.request_query_data,
          
          }
        }
      );
      if(res.status === 200){
        this.respons_query_data = res.data;
        console.log('Response data:', res.data);
      }
      } catch (error) {
        
      }
    }
  }
//   actions: {
//     async GetLisData() {
//       try {
//         this.request_query_data.loading = true;
//         this.error = null; 

       
//         console.log('API URL:', axios.defaults.baseURL);
        
//         const res = await axios.get<UserGetdataModel.UserRespons>("/api/v1/users/get-data", {
//           params: {
//             ...this.request_query_data,
//           }
//         });

//         if (res.status === 200) {
//           this.respons_query_data = res.data;
//           console.log('Response data:', res.data);
//         }
//       } catch (error: any) {
//         console.error('API Error:', error);
        
//         this.error = error.response?.data?.message || error.message || 'Failed to load data';
//         throw error; 
//       } finally {
//         this.request_query_data.loading = false;
//       }
//     }
//   }
});