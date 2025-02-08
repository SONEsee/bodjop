<script setup lang="ts">
import { UserCommissionModels } from "@/models/";
import { COMMISSIONS } from "@/enum/commissions";

const emit = defineEmits(["onCloseDialog"]);
defineProps<{
  commission: UserCommissionModels.UserCommission | null;
  dialog: boolean;
}>();
</script>

<template>
  <v-dialog :model-value="dialog" width="720" persistent scrollable>
    <v-card prepend-icon="mdi-update" title="ຂໍ້ມູນເປີເຊັນ">
      <v-row class="pa-4" v-if="commission !== null">
        <v-col cols="6">
          <GlobalCardTitle
            :title="'ປະເພດເປີເຊັນ'"
            :text="GetCommissionLabel(commission.type)"
          />
        </v-col>
        <v-col
          cols="6"
          v-if="commission.type === COMMISSIONS.GOAL_AVERAGE_COMMISSION"
        >
          <GlobalCardTitle
            :title="'ເປີເຊັນ Actives'"
            :text="formatnumber(commission.active_percentage)"
          />
        </v-col>

        <v-col cols="12">
          <v-row>
            <v-col cols="12">
              <div class="font-weight-black">
                ເປີເຊັນຕາມຂັ້ນບັນໄດ ({{
                  formatnumber(commission.special_commissions.length)
                }})
              </div>
            </v-col>

            <v-col cols="12">
              <v-row
                v-for="(special, index) in commission.special_commissions"
                :key="`special-${index}`"
              >
                <v-col cols="4">
                  <GlobalCardTitle
                    :title="'ເລີ່ມ'"
                    :text="formatnumber(special.minimum_amount)"
                  />
                </v-col>

                <v-col cols="4">
                  <GlobalCardTitle
                    :title="'ຫາ'"
                    :text="formatnumber(special.maximum_amount)"
                  />
                </v-col>

                <v-col cols="4">
                  <GlobalCardTitle
                    :title="'ເປີເຊັນ'"
                    :text="formatnumber(special.percentage)"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <template v-slot:actions>
        <v-btn
          class="ms-auto font-weight-black"
          @click="emit('onCloseDialog', false)"
          text="ຕົກລົງ"
          color="primary"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
