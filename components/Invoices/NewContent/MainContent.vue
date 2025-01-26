<script lang="ts" setup>
const title = ref("ສ້າງໃບຮຽກເກັບເງິນ");
const invoiceStore = UseInvoiceStore();
const saleStore = UseSaleStore();
const agencyStore = UseAgencyStore();

const request = invoiceStore.request_create_invoice_agency;

const sale_periods = computed(() => {
  return saleStore.sale_periods;
});
</script>

<template>
  <section>
    <v-row>
      <v-col cols="12">
        <GlobalTextTitleLine :title="title" />
      </v-col>

      <v-col cols="12">
        <v-row>
          <v-col cols="3">
            <label>ເລືອກງວດວັນທີ</label>
            <v-select
              :items="sale_periods"
              variant="outlined"
              hide-details
              density="comfortable"
              item-title="sale_date"
              item-value="sale_date"
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
            <label>ເລືອກຕົວແທນ</label>
            <v-select
              :items="agencyStore.agency_selections"
              variant="outlined"
              hide-details
              density="comfortable"
              item-title="fullname"
              item-value="id"
              return-object
              v-model="request.agency_id"
              clearable
            >
              <template v-slot:selection="{ item }">
                {{ item.title }}
              </template>
            </v-select>
          </v-col>

          <v-col cols="2">
            <div class="pt-8">
              <v-btn color="primary" flat>ຄົ້ນຫາ</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" v-if="request.agency_id !== null">
        <v-row>
          <v-col cols="12" class="pt-5">
            <h3>ຂໍ້ມູນຕົວແທນ</h3>
          </v-col>

          <v-col cols="3">
            <GlobalCardTitle
              :title="'ຊື່ແລະນາມສະກຸນ'"
              :text="request?.agency_id?.fullname ?? 'N/A'"
            />
          </v-col>

          <v-col cols="3">
            <GlobalCardTitle
              :title="'ລະຫັດຕົວແທນ'"
              :text="request?.agency_id?.agent_code ?? 'N/A'"
            />
          </v-col>

          <v-col cols="3">
            <GlobalCardTitle
              :title="'ຊື່ຫຼິ້ນ'"
              :text="request?.agency_id?.nick_name ?? 'N/A'"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </section>
</template>
