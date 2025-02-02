<script lang="ts" setup>
import { COMMISSIONS } from "@/enum/commissions";
const percentageValidate: string[] = [
  COMMISSIONS.STANDARD_COMMISSION.toString() ?? "N/A",
  COMMISSIONS.STRAIGHT_COMMISSION.toString() ?? "N/A",
  COMMISSIONS.WINNER_SALE_COMMISSION.toString() ?? "N/A",
];

const nonpercentageValidate: string[] = [
  COMMISSIONS.GOAL_AVERAGE_COMMISSION.toString() ?? "N/A",
  COMMISSIONS.GOAL_DEVICE_COMMISSION.toString() ?? "N/A",
];
const form = ref();
const agencyStore = UseAgencyStore();
const emit = defineEmits(["emitcommissionform"]);
const form_request = computed({
  get() {
    return agencyStore.commission_request;
  },
  set(value) {
    agencyStore.commission_request = value;
  },
});

const submitForm = async () => {
  try {
    const { valid } = await form.value.validate();
    if (valid) {
      emit("emitcommissionform", form_request.value);
      form_request.value.dialog = false;
    }
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <v-dialog
    :model-value="form_request.dialog"
    max-width="750"
    persistent
    scrollable
    scroll-strategy="block"
  >
    <v-form ref="form" @submit.prevent="submitForm">
      <v-card prepend-icon="mdi-map-marker" title="ເພີ່ມຂໍ້ມູນສ່ວນແບ່ງ">
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col cols="5">
                  <label>ປະເພດເປີເຊັນ</label>
                  <v-select
                    :items="GetCommissionList()"
                    variant="outlined"
                    hide-details="auto"
                    density="comfortable"
                    :rules="[(v: string) => !!v||'This field is required']"
                    v-model="form_request.type"
                    @update:model-value="form_request.special_commissions = []"
                  ></v-select>
                </v-col>

                <v-col
                  cols="5"
                  v-if="
                    form_request.type !== '' &&
                    form_request.type === COMMISSIONS.GOAL_AVERAGE_COMMISSION
                  "
                >
                  <label>ເປີເຊັນ Active </label>
                  <v-text-field
                    variant="outlined"
                    hide-details="auto"
                    density="comfortable"
                    v-model.number="form_request.active_percentage"
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="5"
                  v-if="
                    form_request.type != '' &&
                    percentageValidate.includes(form_request.type)
                  "
                >
                  <label>ເປີເຊັນ (%)</label>
                  <v-text-field
                    variant="outlined"
                    hide-details="auto"
                    density="comfortable"
                    v-model.number="form_request.percentage"
                    type="number"
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="2"
                  v-if="nonpercentageValidate.includes(form_request.type)"
                >
                  <div class="pt-6">
                    <v-tooltip text="ເພີ່ມເປີເຊັນຕາມຂັ້ນບັນໄດ" location="top">
                      <template v-slot:activator="{ props }">
                        <v-btn
                          v-bind="props"
                          variant="tonal"
                          color="primary"
                          icon="mdi-plus"
                          @click="agencyStore.onAddSpecialCommissions"
                        ></v-btn>
                      </template>
                    </v-tooltip>
                  </div>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" v-if="form_request.special_commissions.length > 0">
              <v-row>
                <v-col cols="12">
                  <h4>
                    ເປີເຊັນຕາມຂັ້ນບັນໄດ ({{
                      form_request.special_commissions.length
                    }})
                  </h4>
                </v-col>

                <v-col
                  cols="12"
                  v-for="(special, index) in form_request.special_commissions"
                  :key="`special-${index}`"
                  class="py-0 my-0"
                >
                  <v-row>
                    <v-col cols="4">
                      <label>ເລີ່ມຕົ້ນ</label>
                      <GlobalTextFieldNumber
                        :number="special.minimum_amount"
                        @input_number="special.minimum_amount = $event"
                        :rules="[]"
                        :density="'compact'"
                        :hide="'auto'"
                      />
                    </v-col>

                    <v-col cols="4">
                      <label>ຫາ</label>
                      <GlobalTextFieldNumber
                        :number="special.maximum_amount"
                        @input_number="special.maximum_amount = $event"
                        :rules="[]"
                        :density="'compact'"
                        :hide="'auto'"
                      />
                    </v-col>

                    <v-col cols="3">
                      <label>ເປີເຊັນທີ່ຈະໄດ້</label>
                      <v-text-field
                        variant="outlined"
                        hide-details="auto"
                        density="compact"
                        type="number"
                        v-model.number="special.percentage"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="1">
                      <div class="pt-8">
                        <v-btn
                          color="error"
                          icon="mdi-delete"
                          variant="text"
                          size="medium"
                          @click="agencyStore.onDeleteSpecialCommissions(index)"
                        ></v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" class="font-weight-black" type="submit"
            >ຕົກລົງ</v-btn
          >
          <v-btn
            color="grey"
            class="font-weight-black"
            @click="agencyStore.onCloseDialogCommission"
            >ຍົກເລີກ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
