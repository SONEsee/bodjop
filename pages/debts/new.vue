<script lang="ts" setup>
const agencyStore = UseAgencyStore();
const debtStore = UseDebtsStore();

const request = debtStore.request_new_debts;

onMounted(() => {
  agencyStore.GetAgencySelections(null);
});
</script>

<template>
  <section class="pa-6">
    <v-card class="pa-6" min-height="95vh" flat>
      <v-row>
        <v-col cols="12">
          <GlobalTextTitleLine :title="request.title[request.tab]" />
        </v-col>

        <v-col cols="12">
          <v-tabs-window v-model="request.tab">
            <v-tabs-window-item :value="1">
              <DebtsNewManageContentFirstStepper />
            </v-tabs-window-item>

            <v-tabs-window-item :value="2">
              <DebtsNewManageContentSecondStep />
            </v-tabs-window-item>
          </v-tabs-window>
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>
