<script lang="ts" setup>
const invoiceStore = UseInvoiceStore();

const response_data = computed(() => {
  return invoiceStore.repsonse_get_detail_invoice_data;
});

const headers = ref([
  { title: "ລ/ດ", value: "no" },
  { title: "ຍອດຂາຍທັງໝົດ", value: "total_sale_amount" },
  { title: "ຈຳນວນອຸປະກອນ", value: "total_devices" },
  { title: "ຍອດຂາຍສະເລ່ຍ", value: "total_average_amount" },
  //   { title: "ສະຖານະ", value: "status" },
  { title: "ຍອດລວມທັງໝົດ", value: "total_amount" },
  { title: "Actions", value: "actions" },
]);
</script>

<template>
  <section>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="response_data?.invoice_details ?? []"
        >
          <template v-slot:item.no="{ index }">
            {{ index + 1 }}
          </template>

          <template v-slot:item.total_sale_amount="{ item }">
            {{ formatnumber(item.total_sale_amount) }}
          </template>

          <template v-slot:item.total_devices="{ item }">
            {{ formatnumber(item.total_devices) }}
          </template>

          <template v-slot:item.total_average_amount="{ item }">
            {{ formatnumber(item.total_average_amount) }}
          </template>

          <template v-slot:item.total_amount="{ item }">
            {{ formatnumber(item.total_amount) }}
          </template>

          <template v-slot:item.actions="{ item }">
            <v-tooltip text="ພິມເອກະສານແບບ PDF" location="top">
              <template v-slot:activator="{ props }">
                <v-btn
                  color="primary"
                  variant="text"
                  icon="mdi-file-pdf-box"
                  size="small"
                  v-bind="props"
                  @click="openPath(`/prints/commission_pdf?id=${item.id}`)"
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
                      `/prints/commission_pdf?id=${item.id}&&print_type=image`
                    )
                  "
                />
              </template>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </section>
</template>
