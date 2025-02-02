import axios from "@/helpers/axios";
import { DeviceMovementModels } from "@/models";
export const UseDeviceMovementStore = defineStore("device_movements", {
  state() {
    return {
      request_get_device_movement: {
        page: 1,
        limit: 20,
        loading: false,
      },
      response_device_movement_data:
        null as DeviceMovementModels.GetDeviceMovementResponseItem | null,
      response_detail_data:
        null as DeviceMovementModels.GetDeviceMovementDetailResponseItem | null,
    };
  },

  actions: {
    async GetDeviceMovementData() {
      try {
        this.request_get_device_movement.loading = true;
        const res =
          await axios.get<DeviceMovementModels.GetDeviceMovementResponse>(
            "/api/v1/device-movements/get-data",
            {
              params: {
                ...this.request_get_device_movement,
              },
            }
          );

        if (res.status === 200) {
          this.response_device_movement_data = res.data.items;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.request_get_device_movement.loading = false;
      }
    },

    async GetDetailData(id: string | null) {
      const globalStore = UseGlobalStore();
      try {
        if (id === null) {
          return;
        }
        globalStore.loading_overlay = true;
        const res =
          await axios.get<DeviceMovementModels.GetDeviceMovementDetailResponse>(
            `/api/v1/device-movements/get-detail/${id}`
          );
        if (res.status === 200) {
          this.response_detail_data = res.data.items;
        }
      } catch (error) {
        console.error(error);
      } finally {
        globalStore.loading_overlay = false;
      }
    },
  },
});
