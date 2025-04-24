<script lang="ts" setup>
const reportStore = UseReportStore();
const request = reportStore.request_get_sales;

const response_data = computed(() => {
  return reportStore.response_get_sales;
});

onMounted(() => {
  //   reportStore.GetReportSaleData();
});
</script>

<template>
  <section class="pa-6">
    <v-card min-height="95vh" flat class="pa-6">
      <v-row>
        <v-col cols="12">
          <GlobalTextTitleLine :title="'ລາຍງານການຂາຍແບບລວມ'" />
        </v-col>

        <v-col cols="12">
          <v-row>
            <v-col cols="3">
              <label>ເດືອນ</label>
              <MonthPicker
                :date="request.date"
                :required="false"
                @on-set-month="request.date = $event"
              />
            </v-col>

            <v-col cols="3">
              <div class="pt-6">
                <v-btn
                  color="primary"
                  flat
                  :loading="request.loading"
                  @click="reportStore.GetReportSaleData"
                  >ຄົ້ນຫາ</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" class="d-flex flex-nowrap">
          <div style="width: 100%">
            <v-table class="custom-table">
              <thead>
                <tr>
                  <th
                    v-for="(header, index) in response_data?.headers ?? []"
                    :key="`header-${index}`"
                  >
                    {{ header }}
                  </th>
                </tr>
              </thead>
              <tbody
                v-if="
                  response_data != null && response_data.list_data.length > 0
                "
              >
                <tr
                  v-for="(item, index) in response_data.list_data"
                  :key="`item-${index}`"
                  :style="
                    item.is_main_group ? 'background-color: #e9e9e9;' : ''
                  "
                >
                  <td
                    v-for="(agency, indexAgency) in item.xaxis"
                    :key="`agency-${indexAgency}`"
                  >
                    {{
                      typeof agency === "number" ? formatnumber(agency) : agency
                    }}
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>

<style scoped>
.custom-table {
  width: 100%;
  border-collapse: collapse;
  /* font-family: Arial, sans-serif; */
}

/* Header styling */
/* .custom-table th {
  background-color: #f4f4f4;
  color: #333;
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #ddd;
} */

/* Data cell styling */
.custom-table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

/* Optional: alternating row background for readability */
/* .custom-table tr:nth-child(even) {
  background-color: #f9f9f9;
} */

/* Highlight rows where item.is_main_group is true with a red bottom border */
.red-bottom-border {
  border-bottom: 2px solid red;
}

/* Optional: hover effect for rows */
.custom-table tr:hover {
  /* background-color: #e9e9e9; */
  background-color: #f9f9f9;
}
</style>
