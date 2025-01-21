<script lang="ts" setup>
import { COMMISSIONS } from "@/enum/commissions";
const agencyStore = UseAgencyStore();

const response_data = computed(() => {
  return agencyStore.response_detail_query_data;
});

const headers = ref([
  { title: "ລຳດັບ", sortable: false, key: "no" },
  { title: "ປະເພດ", key: "type" },
  { title: "ເປີເຊັນ", key: "percentage" },
  { title: "Actions", key: "actions" },
]);
</script>
<template>
  <section class="pt-4">
    <v-data-table
      :headers="headers"
      :items="response_data?.user_commissions ?? []"
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
          icon="mdi-eye"
          size="small"
          variant="text"
          v-if="
            item.type === COMMISSIONS.GOAL_DEVICE_COMMISSION ||
            item.type === COMMISSIONS.GOAL_AVERAGE_COMMISSION
          "
        ></v-btn>
      </template>
    </v-data-table>
  </section>
</template>
