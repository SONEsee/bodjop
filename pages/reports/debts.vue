<script lang="ts" setup>
import _ from "lodash";

const sales = UseSaleStore();
const report = UseReportStore();
const agencyStore = UseAgencyStore();

const request = report.request_get_debts;

const response_data = computed(() => {
  return report.response_get_debts;
});

const sumCommitAmount = computed(() => {
  return _.sumBy(response_data.value, "commit_amount");
});
const sumDebtAmount = computed(() => {
  return _.sumBy(response_data.value, "debt_amount");
});

const sale_periods = computed(() => {
  return sales.sale_periods;
});

const debounceAgencySearch = useDebounceFn(async (value: string) => {
  await agencyStore.GetAgencySelections(value ?? null);
}, 1200);

onMounted(() => {
  sales.GetSalePeriodListData();
  agencyStore.GetAgencySelections(null);
  report.GetDebtReportData();
});
</script>

<template>
  <section class="pa-6">
    <v-card class="pa-6" flat min-height="95vh">
      <v-row>
        <v-col cols="12">
          <GlobalTextTitleLine :title="'ລາຍງານຍອກໜີ້ຄ້າງຈ່າຍ'" />
        </v-col>

        <v-col cols="12">
          <v-row>
            <v-col cols="3">
              <label>ງວດວັນທີ</label>
              <v-select
                :items="sale_periods"
                variant="outlined"
                hide-details
                density="comfortable"
                item-title="sale_date"
                item-value="sale_date"
                clearable
                v-model="request.sale_date"
                :item-props="
                  (item) => {
                    return {
                      title: 'ງວດວັນທີ',
                      subtitle: FormatDate(item.sale_date),
                    };
                  }
                "
              >
                <template v-slot:selection="{ item }">
                  {{ FormatDate(item.value) }}
                </template>
              </v-select>
            </v-col>

            <v-col cols="3">
              <label>ຕົວແທນ / Agency</label>
              <v-autocomplete
                :items="agencyStore.agency_selections"
                variant="outlined"
                hide-details
                density="comfortable"
                item-title="fullname"
                item-value="id"
                clearable
                no-filter
                @update:search="debounceAgencySearch"
                v-model="request.agency_id"
              >
                <template v-slot:selection="{ item }">
                  {{ item.title }} - {{ item.raw?.agent_code ?? "N/A" }}
                </template>
                <template v-slot:item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    :subtitle="item.raw.agent_code"
                    :title="item.raw.fullname"
                  ></v-list-item>
                </template>
              </v-autocomplete>
            </v-col>

            <v-col cols="2">
              <div class="pt-7">
                <v-btn
                  color="primary"
                  flat
                  :loading="request.loading"
                  @click="report.GetDebtReportData"
                  >ຄົ້ນຫາ</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" class="d-flex flex-nowrap">
          <v-table style="width: 100%">
            <thead>
              <tr>
                <th class="text-left">actions</th>
                <th class="text-left">ລຳດັບ</th>
                <th class="text-left">ຕົວແທນ</th>
                <th class="text-left">ຊື່ ແລະ ນາມສະກຸນ</th>
                <th class="text-left">ງວດວັນທີ</th>
                <th class="text-left">ລວມຍອດງວດນີ້ທັງໝົດ</th>
                <th class="text-left">ຍອດຍັງເຫຼືອ</th>
                <!-- <th class="text-left">ສະຖານະ</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in response_data" :key="`item-${index}`">
                <td>
                  <v-tooltip text="ພິມເອກະສານແບບ PDF" location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        color="primary"
                        variant="text"
                        icon="mdi-file-pdf-box"
                        size="small"
                        v-bind="props"
                        @click="
                          openPath(
                            `/prints/commission_pdf?id=${item.invoice_detail_id}`
                          )
                        "
                      />
                    </template>
                  </v-tooltip>

                  <v-tooltip text="ພິມເອກະສານແບບຮູບ" location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        color="info"
                        variant="text"
                        icon="mdi-image"
                        size="small"
                        v-bind="props"
                        @click="
                          openPath(
                            `/prints/commission_pdf?id=${item.invoice_detail_id}&&print_type=image`
                          )
                        "
                      />
                    </template>
                  </v-tooltip>
                </td>

                <td>{{ index + 1 }}</td>
                <td>{{ item.agency_code }}</td>
                <td>{{ item.agency_name }}</td>
                <td>{{ FormatDate(item.sale_date) }}</td>
                <td>{{ formatnumber(item.commit_amount) }}</td>
                <td>{{ formatnumber(item.debt_amount) }}</td>
                <!-- <td><GlobalAgencyDebtStatus :status="item.status" /></td> -->
              </tr>

              <tr v-if="response_data.length > 0">
                <td colspan="5" class="font-weight-black text-center">ລວມ:</td>
                <td>{{ formatnumber(sumCommitAmount) }}</td>
                <td>{{ formatnumber(sumDebtAmount) }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>

<style scoped>
table {
  /* font-family: arial, sans-serif; */
  border-collapse: collapse;
  width: 100%;
}

/* td,
th {
  border: 0.2px solid #dddddd;
  text-align: left;
  padding: 8px;
} */

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
