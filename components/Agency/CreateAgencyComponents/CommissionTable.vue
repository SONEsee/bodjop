<script lang="ts" setup>
import { AgencyModel } from "@/models/";
import { COMMISSIONS } from "@/enum/commissions";
const agencyStore = UseAgencyStore();

const request = agencyStore.form_create_data;
const headers = ref([
  { title: "ລຳດັບ", sortable: false, key: "no" },
  { title: "ປະເພດ", key: "type" },
  { title: "ເປີເຊັນ", key: "percentage" },
  { title: "Actions", key: "actions" },
]);

function onSetCommissionForm(item: AgencyModel.CommissionAgency) {
  request.commissions.push({
    percentage: item.percentage,
    active_percentage: item.active_percentage,
    special_commissions: item.special_commissions,
    type: item.type,
    id: null,
  });
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
          v-if="
            item.type === COMMISSIONS.GOAL_AVERAGE_COMMISSION ||
            item.type === COMMISSIONS.GOAL_DEVICE_COMMISSION
          "
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
