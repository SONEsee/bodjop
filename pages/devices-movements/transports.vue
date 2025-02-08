<script lang="ts" setup>
const agencyStore = UseAgencyStore();
const deviceStore = UseDeviceStore();

const request = deviceStore.request_device_movement;

onMounted(() => {
  agencyStore.GetAgencySelections(null);
  deviceStore.GetDeviceSelections(1, null);
});
</script>

<template>
  <section class="pa-6">
    <v-card class="pa-6" flat min-height="95vh">
      <v-row>
        <v-col cols="12">
          <v-window v-model="request.window">
            <v-window-item :value="1">
              <v-card min-height="80vh" flat>
                <DeviceMovementsNewComponentFirstStep />
              </v-card>
            </v-window-item>

            <v-window-item :value="2">
              <v-card min-height="95vh" flat>
                <DeviceMovementsNewComponentSecondStep />
              </v-card>
            </v-window-item>
          </v-window>
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>
