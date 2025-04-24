<script lang="ts" setup>
import { onSaleExportExcelV2, onSaleExportExcel } from "@/helpers/xlsx";
import JSZip from "jszip";
import { saveAs } from "file-saver";
const loading = ref(false);
const title = ref("ລາຍລະອຽດການຂາຍ");
const saleStore = UseSaleStore();

const headers = ref([
  { title: "ລ/ດ", value: "no" },
  { title: "ງວດວັນທີ", value: "sale_date" },
  { title: "Pos code", value: "pos_code" },
  { title: "ລະຫັດຕົວແທນ", value: "agency.agent_code" },
  { title: "1 ໂຕ", value: "one_digits" },
  { title: "2 ໂຕ", value: "two_digits" },
  { title: "3 ໂຕ", value: "three_digits" },
  { title: "4 ໂຕ", value: "four_digits" },
  { title: "5 ໂຕ", value: "five_digits" },
  { title: "6 ໂຕ", value: "six_digits" },
  { title: "ຕົວແທນ", value: "agency.agent_code" },
  { title: "ຍອດລວມ", value: "amount" },
]);

const response_data = computed(() => {
  return saleStore.response_sale_detail;
});

const onExportExcel = async () => {
  try {
    loading.value = true;
    await saleStore.GetSalePrintPDfV2(response_data.value?.id ?? null);
    const res = await onSaleExportExcelV2(
      response_data.value?.sale_details ?? []
    );

    if (res instanceof Error) {
      return DefaultSwalError(res);
    }
  } catch (error) {
    console.error(error);
    DefaultSwalError(error);
  } finally {
    loading.value = false;
  }
};

const onExportPDF = async () => {
  try {
    const dayjs = useDayjs();
    loading.value = true;
    await saleStore.GetSalePrintPDf(response_data.value?.id ?? null);

    if (saleStore.sale_export_pdf.length > 0) {
      const zip = new JSZip();
      for (let i = 0; i < saleStore.sale_export_pdf.length; i++) {
        const item = saleStore.sale_export_pdf[i];
        const sale_date = dayjs(item.sale_date).format("DD-MM-YYYY");
        const res: Blob = await GeneratePDF(item);
        zip.file(`Daily Sale Report ${item.agency_code} ${sale_date}.pdf`, res);
      }
      const sale_date = dayjs(response_data.value?.sale_date).format(
        "DD-MM-YYYY"
      );
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, `Daily Sale Reports ${sale_date} .zip`);
    }
  } catch (error) {
    console.error(error);
    DefaultSwalError(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section v-if="response_data !== null">
    <v-row>
      <v-col cols="12">
        <GlobalTextTitleLine :title="title" />
      </v-col>

      <v-col cols="12" class="d-flex flex-wrap justify-end align-center">
        <div class="mr-3">ສະຖານະ:</div>
        <GlobalDefaultStatusChip :status="response_data?.status ?? 1" />
      </v-col>

      <v-col cols="12">
        <v-row>
          <v-col cols="3">
            <GlobalCardTitle
              :title="'ຍອດລວມຂາຍທັງໝົດ'"
              :text="formatnumber(response_data?.total_amount ?? 0)"
            />
          </v-col>
          <v-col cols="3">
            <GlobalCardTitle
              :title="'ສ້າງຂຶ້ນວັນທີ'"
              :text="FormatDatetime(response_data?.created_at)"
            />
          </v-col>
          <v-col cols="3">
            <GlobalCardTitle
              :title="'ງວດວັນທີ'"
              :text="FormatDate(response_data?.sale_date)"
            />
          </v-col>
          <v-col cols="3">
            <GlobalCardTitle
              :title="'ຄົນສ້າງ'"
              :text="response_data?.user?.fullname ?? 'N/A'"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" class="pt-6">
        <div class="d-flex flex-wrap justify-space-between">
          <div>
            <h4>
              ລາຍການທັງໝົດ ({{
                formatnumber(response_data?.sale_details.length)
              }})
            </h4>
          </div>

          <div class="d-flex flex-wrap">
            <div>
              <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    color="primary"
                    variant="flat"
                    prepend-icon="mdi-export"
                    :disabled="response_data?.status === 2"
                    class="mr-4"
                    :loading="loading"
                    >Export excel</v-btn
                  >
                </template>

                <v-list>
                  <v-list-item
                    @click="
                      onSaleExportExcel(response_data?.sale_details ?? [])
                    "
                  >
                    <v-list-item-title> ແບບລວມ </v-list-item-title>
                  </v-list-item>

                  <v-list-item @click="onExportExcel">
                    <v-list-item-title> ແຍກແບບຕົວແທນ </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>

            <div>
              <v-btn
                color="info"
                flat
                @click="onExportPDF"
                :loading="loading"
                prepend-icon="mdi-cloud-download"
                >Download PDF</v-btn
              >
            </div>
          </div>
        </div>

        <v-data-table
          :headers="headers"
          :items="response_data?.sale_details ?? []"
          :items-per-page="100"
          :items-per-page-options="GetItemPerPageOptions()"
        >
          <template v-slot:item.no="{ index }">
            {{ index + 1 }}
          </template>

          <template v-slot:item.sale_date="{ item }">
            {{ FormatDate(item.sale_date) }}
          </template>

          <template v-slot:item.amount="{ item }">
            {{ formatnumber(item.amount) }}
          </template>

          <template v-slot:item.one_digits="{ item }">
            {{ formatnumber(item.one_digits) }}
          </template>

          <template v-slot:item.two_digits="{ item }">
            {{ formatnumber(item.two_digits) }}
          </template>

          <template v-slot:item.three_digits="{ item }">
            {{ formatnumber(item.three_digits) }}
          </template>

          <template v-slot:item.four_digits="{ item }">
            {{ formatnumber(item.four_digits) }}
          </template>

          <template v-slot:item.five_digits="{ item }">
            {{ formatnumber(item.five_digits) }}
          </template>

          <template v-slot:item.six_digits="{ item }">
            {{ formatnumber(item.six_digits) }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </section>
</template>
