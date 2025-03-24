<script lang="ts" setup>
import { AgencyModel } from "@/models/";
const agencyStore = UseAgencyStore();

const request = agencyStore.form_create_data;
const headers = ref([
  { title: "ລຳດັບ", sortable: false, key: "no" },
  { title: "ປະເພດ", key: "type" },
  { title: "ເປີເຊັນ", key: "percentage" },
  { title: "Actions", key: "actions" },
]);

function onSetCommissionForm(item: AgencyModel.CommissionAgency) {
  let indexNumber = localStorage.getItem("index_number");
  if (indexNumber === null) {
    request.commissions.push({
      percentage: item.percentage,
      active_percentage: item.active_percentage,
      special_commissions: item.special_commissions,
      type: item.type,
      id: null,
    });
  } else {
    const rangeNumber = Number(indexNumber);
    if (rangeNumber != -1) {
      request.commissions[rangeNumber] = item;
    }
  }
}

function OnEditCommission(item: AgencyModel.CommissionAgency, index: number) {
  agencyStore.commission_request = {
    ...item,
    dialog: false,
  };

  agencyStore.commission_request.dialog = true;

  localStorage.setItem("index_number", index.toString() ?? "N/A");
}
</script>
<template>
  <section>
    <v-data-table
      :headers="headers"
      :items="agencyStore.form_create_data.commissions ?? []"
      density="comfortable"
    >
      <template v-slot:item.no="{ index }">
        {{ index + 1 }}
      </template>

      <template v-slot:item.percentage="{ item }">
        {{ item.special_commissions.length > 0 ? "-" : item.percentage }}
      </template>

      <template v-slot:item.type="{ item }">
        {{ GetCommissionOrExpenseTypeLabel(item.type) ?? "" }}
      </template>

      <template v-slot:item.actions="{ item, index }">
        <v-btn
          color="primary"
          variant="text"
          icon="mdi-pencil"
          size="small"
          @click="OnEditCommission(item, index)"
        ></v-btn>

        <v-btn
          color="error"
          icon="mdi-delete"
          size="small"
          variant="text"
          @click="request.commissions.splice(index, 1)"
        ></v-btn>
      </template>
    </v-data-table>

    <AgencyCreateAgencyComponentsDialogCreateComissions
      @emitcommissionform="onSetCommissionForm"
    />
  </section>
</template>
