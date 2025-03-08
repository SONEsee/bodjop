<script lang="ts" setup>
import axios from "@/helpers/axios";
const title = ref("ສ້າງໃບຮຽກເກັບເງິນ");
const invoiceStore = UseInvoiceStore();
const saleStore = UseSaleStore();
const agencyStore = UseAgencyStore();
const loading = ref(false);

const request = invoiceStore.request_create_invoice_agency;

const sale_periods = computed(() => {
  return saleStore.sale_periods;
});

const invoice_for_create = computed(() => {
  return invoiceStore.response_get_for_create;
});

const onRequestForCreate = async () => {
  try {
    if (request.agency_id === null || request.sale_date === null) {
      return;
    }

    await invoiceStore.GetInvoiceForCreate();
  } catch (error) {
    console.error(error);
  }
};

const onCreateInvoice = async () => {
  try {
    const notification = await CallSwal({
      icon: "warning",
      title: "ຄຳເຕືອນ",
      text: `ທ່ານກຳລັງສ້າງໃບຮຽກເກັບເງິນສຳຫຼັບຕົວແທນ ${request?.agency_id?.fullname} ທ່ານແນ່ໃຈແລ້ວບໍ່?`,
      showCancelButton: true,
      confirmButtonText: "ຕົກລົງ",
      cancelButtonText: "ຍົກເລີກ",
    });

    if (notification.isConfirmed) {
      loading.value = true;
      const dayjs = useDayjs();
      const res = await axios.post("/api/v1/invoices/new", {
        sale_date: dayjs(request.sale_date).format("YYYY-MM-DD"),
        agency_id: request.agency_id?.id ?? null,
      });

      if (res.status === 200) {
        const notification = await CallSwal({
          icon: "success",
          title: "ສຳເລັດ",
          text: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
        });

        if (notification.isConfirmed) {
          delayGoPath("/invoices");
        } else {
          delayGoPath("/invoices");
        }
      }
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
                {{ item.title }} - {{ item.raw?.agent_code ?? "N/A" }}
              </template>
            </v-select>
          </v-col>

          <v-col cols="2">
            <div class="pt-8">
              <v-btn
                color="primary"
                flat
                @click="onRequestForCreate()"
                :loading="request.loading"
                >ຄົ້ນຫາ</v-btn
              >
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

          <v-col cols="3">
            <GlobalCardTitle
              :title="'ໜີ້ທີ່ຍັງເຫຼືອ'"
              :text="formatnumber(request?.agency_id?.money_outstanding ?? 0)"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row>
          <v-col cols="12" class="d-flex flex-wrap justify-space-between">
            <div>
              <h3>ຂໍ້ມູນໃບຮຽກເກັບເງິນ</h3>
            </div>

            <div>
              <v-btn
                color="info"
                width="160px"
                flat
                :loading="loading"
                :disabled="invoice_for_create === null"
                @click="onCreateInvoice()"
                >ບັນທຶກ</v-btn
              >
            </div>
          </v-col>

          <v-col
            cols="12"
            class="d-flex flex-wrap justify-center"
            v-if="invoice_for_create !== null"
          >
            <InvoicesNewContentInvoiceCreatePDF
              :item="invoice_for_create ?? null"
              :agency_fullname="request?.agency_id?.fullname ?? 'N/A'"
              :agency_nickname="request?.agency_id?.nick_name ?? 'N/A'"
              :sale_date="request?.sale_date ?? ''"
              :agency_code="request?.agency_id?.agent_code ?? 'N/A'"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </section>
</template>
