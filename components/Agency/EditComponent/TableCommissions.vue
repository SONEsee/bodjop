<script lang="ts" setup>
import { AgencyModel, UserCommissionModels } from "@/models/";

import axios from "@/helpers/axios";
const agencyStore = UseAgencyStore();
const globalStore = UseGlobalStore();
const loading = ref(false);

const request = agencyStore.response_detail_query_data;
const user_commission = agencyStore.commission_request;
const headers = ref([
  { title: "ລຳດັບ", sortable: false, key: "no" },
  { title: "ປະເພດ", key: "type" },
  { title: "ເປີເຊັນ", key: "percentage" },
  { title: "Actions", key: "actions" },
]);

async function onSetCommissionForm(item: AgencyModel.CommissionAgency) {
  try {
    let text =
      item.id === null
        ? "ທ່ານກຳລັງເພີ່ມຂໍ້ມູນເປີເຊັນທ່ານແນ່ໃຈແລ້ວບໍ່"
        : "ທ່ານກຳລັງບັນທຶກຂໍ້ມູນເປີເຊັນທ່ານແນ່ໃຈແລ້ວບໍ່";

    const notification = await CallSwal({
      icon: "warning",
      title: "ຄຳເຕືອນ",
      text: text,
      showCancelButton: true,
      confirmButtonText: "ຕົກລົງ",
      cancelButtonText: "ຍົກເລີກ",
    });

    if (notification.isConfirmed) {
      agencyStore.commission_request.dialog = false;
      globalStore.loading_overlay = true;
      let path =
        item.id === null
          ? `/api/v1/agency/commissions/new/${request?.id}`
          : `/api/v1/agency/commissions/update/${item.id}`;

      const res = await axios.post(path, item);
      globalStore.loading_overlay = false;
      if (res.status === 200) {
        const notification = await CallSwal({
          icon: "success",
          title: "ສຳເລັດ",
          text: "ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ",
        });

        if (notification.isConfirmed) {
          await agencyStore.onGetAndEditAgency(request?.id ?? null);
          agencyStore.onCloseDialogCommission();
        } else {
          await agencyStore.onGetAndEditAgency(request?.id ?? null);
          agencyStore.onCloseDialogCommission();
        }
      }
    } else if (notification.isDismissed) {
      agencyStore.commission_request.dialog = true;
    }
  } catch (error) {
    console.error(error);
    DefaultSwalError(error);
  } finally {
    globalStore.loading_overlay = false;
  }
}

const onDeleteUserCommissions = async (id: string) => {
  try {
    const notification = await CallSwal({
      icon: "warning",
      title: "ຄຳເຕືອນ",
      text: "ທ່ານກຳລັງລົບເປີເຊັນທ່ານແນ່ໃຈແລ້ວບໍ່?",
      showCancelButton: true,
      confirmButtonText: "ຕົກລົງ",
      cancelButtonText: "ຍົກເລີກ",
    });

    if (notification.isConfirmed) {
      loading.value = true;
      const res = await axios.delete(`/api/v1/agency/commissions/delete/${id}`);
      if (res.status === 200) {
        const notification = await CallSwal({
          icon: "success",
          title: "ສຳເລັດ",
          text: "ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ",
        });

        if (notification.isConfirmed) {
          await agencyStore.onGetAndEditAgency(request?.id ?? null);
          agencyStore.onCloseDialogCommission();
        } else {
          await agencyStore.onGetAndEditAgency(request?.id ?? null);
          agencyStore.onCloseDialogCommission();
        }
      }
    }
  } catch (error) {
    console.error(error);
    return DefaultSwalError(error);
  } finally {
    loading.value = false;
  }
};

async function onOpenDialogForEdit(item: UserCommissionModels.UserCommission) {
  user_commission.id = item.id;
  user_commission.active_percentage = item.active_percentage;
  user_commission.percentage = item.percentage;
  user_commission.special_commissions = item.special_commissions;
  user_commission.type = item.type;
  user_commission.dialog = true;
}
</script>
<template>
  <section>
    <v-data-table
      :headers="headers"
      :items="request?.user_commissions ?? []"
      density="comfortable"
    >
      <template v-slot:item.no="{ index }">
        {{ index + 1 }}
      </template>

      <template v-slot:item.percentage="{ item }">
        {{ item.special_commissions.length > 0 ? "-" : item.percentage }}
      </template>

      <template v-slot:item.type="{ item }">
        {{ GetCommissionLabel(item.type) }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          color="primary"
          variant="text"
          icon="mdi-pencil"
          size="small"
          @click="onOpenDialogForEdit(item)"
        ></v-btn>

        <v-btn
          color="error"
          icon="mdi-delete"
          size="small"
          variant="text"
          :loading="loading"
          @click="onDeleteUserCommissions(item.id)"
        ></v-btn>
      </template>
    </v-data-table>

    <AgencyCreateAgencyComponentsDialogCreateComissions
      @emitcommissionform="onSetCommissionForm"
    />
  </section>
</template>
