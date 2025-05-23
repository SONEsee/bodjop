import { DeviceModels, UserModel } from "@/models";
import axios from "@/helpers/axios";
export const UseDeviceStore = defineStore("devices", {
  state() {
    return {
      response_device_selections:
        [] as DeviceModels.DeviceSelectionResponseItem[],
      request_device_movement: {
        window: 1,
        form_request_option: "2",
        movement_date: new Date(),
        device_id: null as DeviceModels.DeviceSelectionResponseItem | null,
        agency_id: null as UserModel.User | null,
        list_device_id: [] as DeviceModels.DeviceSelectionResponseItem[],
        device_file_upload: [] as DeviceModels.DeviceMovementFileUpload[],
      },

      request_device_option: null,
      request_device_uploads: [] as DeviceModels.DeviceUploadFileRequest[],
    };
  },

  actions: {
    async GetDeviceSelections(deviceStatus: number, q: string | null) {
      try {
        const res = await axios.get<DeviceModels.DeviceSelectionResponse>(
          "/api/v1/devices/get-selections",
          {
            params: {
              device_status: deviceStatus,
              q: q,
            },
          }
        );
        if (res.status === 200) {
          this.response_device_selections = res.data.items;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
