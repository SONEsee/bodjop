<script setup lang="ts">
const agent = useReportSaleStore();
const request = agent.request_agency_devices;
import { ref, computed } from "vue";
const title = "ຂໍ້ມູນລາຍງານອຸປະກອນ";
const headers = [
  { title: "Agent", value: "agency_code" },
  { title: "POS", value: "pos_code" },
  { title: "IMEI", value: "imei" },
  { title: "Province", value: "device_id" },
];

const selectedAgent = ref("");

const refresh = ref(false);

const exportToExcel = () => {
  request.loading = true;
  try {
    let csvContent = "";

    const headerRow = headers.map((header) => `"${header.title}"`).join(",");
    csvContent += headerRow + "\n";

    items.value.forEach((item) => {
      const rowData = headers
        .map((header) => `"${item[header.value] || ""}"`)
        .join(",");
      csvContent += rowData + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);

    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    let filename = "";
    if (selectedAgent.value) {
      const agentInfo = data.value.find((a) => a.id === selectedAgent.value);
      filename = `equipment_report_${
        agentInfo?.agent_code || selectedAgent.value
      }_${formattedDate}.xlsx`;
    } else {
      filename = `equipment_report_all_${formattedDate}.xlsx`;
    }

    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log("Excel file exported successfully");
  } catch (error) {
    console.error("Error exporting to Excel:", error);
  } finally {
    request.loading = false;
  }
};

const data = computed(() => {
  return agent.agent_data_report;
});
const items = computed(() => {
  return agent.respose_equipment_report;
});
onMounted(() => {
  agent.GetAgentData();
  agent.GetEnquipmentData();
});

const refreshData = () => {
  refresh.value = !refresh.value;
  agent.GetEnquipmentData(selectedAgent.value || null);
};
</script>

<template>
  <v-card>
    <div class="pa-4">
      <div>
        <v-col cols="12">
          <GlobalTextTitleLine :title="title" />
        </v-col>
      </div>
      <div>
        <v-row>
          <v-col cols="3">
            <v-autocomplete
              density="compact"
              label="ເລືອຕົວແທນ"
              :items="data"
              item-title="fullname"
              item-value="id"
              variant="outlined"
              clearable
              :loading="request.loading"
              v-model="selectedAgent"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :subtitle="item.raw.agent_code"
                  :title="item.raw.fullname"
                ></v-list-item>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="4">
            <v-btn
              color="primary"
              flat
              prepend-icon="mdi-magnify"
              @click="refreshData"
              :loading="request.loading"
            >
              <p>ຄົ້ນຫາ</p>
            </v-btn>
          </v-col>
          <v-col cols="5">
            <div class="d-flex justify-end">
              <v-btn
                color="success"
                flat
                prepend-icon="mdi-file-excel"
                @click="exportToExcel"
                :loading="request.loading"
              >
                <p style="color: white">ສ້າງ Excel</p>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
      <div style="height: 100vh">
        <div class="d-flex justify-center">
          <v-data-table
            :items="items"
            :headers="headers"
            density="compact"
            class="text-no-wrap"
            hover
            :loading="request.loading"
          ></v-data-table>
        </div>
      </div></div
  ></v-card>
</template>
