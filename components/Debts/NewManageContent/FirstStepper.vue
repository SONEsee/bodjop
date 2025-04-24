<script lang="ts" setup>
import _ from "lodash";

const agencyStore = UseAgencyStore();
const debtStore = UseDebtsStore();
const headers = ref([
  { title: "actions", value: "prints" },
  // { title: "ລ/ດ", value: "no" },
  { title: "ງວດວັນທີ", value: "sale_date" },
  { title: "ລົງຍອດ", value: "innitial_amount" },
  { title: "ຍອດຍັງເຫຼືອ", value: "debt_amount" },
  { title: "actions", value: "actions" },
]);

const request = debtStore.request_new_debts;
const debounceOfSearchAgency = useDebounceFn((value: string | null) => {
  agencyStore.GetAgencySelections(value);
}, 1000);

const response_data = computed(() => {
  return request.invoices;
});

const sumAmount = computed(() => {
  return _.sumBy(response_data.value, "debt_amount");
});
</script>

<template>
  <section>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="3">
            <label>ຕົວແທນ / Agency</label>
            <v-autocomplete
              :items="agencyStore.agency_selections"
              variant="outlined"
              hide-details
              density="comfortable"
              item-title="fullname"
              item-value="id"
              return-object
              clearable
              no-filter
              @update:search="debounceOfSearchAgency"
              v-model="request.agency"
            >
              <template v-slot:selection="{ item }">
                {{ item.title }} - {{ item.raw?.agent_code ?? "N/A" }}
              </template>
              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :subtitle="item.raw.agent_code"
                  :title="item.raw.fullname"
                ></v-list-item>
              </template>
            </v-autocomplete>
          </v-col>

          <v-col cols="3">
            <label>ຈຳນວນເງິນ</label>
            <GlobalTextFieldNumber
              :hide="'auto'"
              :rules="[]"
              :number="request.amount"
              :density="'comfortable'"
              @input_number="request.amount = $event"
            />
          </v-col>

          <v-col cols="2">
            <div class="pt-7">
              <v-btn
                color="primary"
                prepend-icon="mdi-magnify"
                flat
                @click="
                  debtStore.GetAgencyInvoiceDebtsData(
                    request.agency?.id ?? null
                  )
                "
                >ຄົ້ນຫາ</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row>
          <v-col cols="3">
            <GlobalCardTitle
              :title="'ຈຳນວນໃບເກັບເງິນ'"
              :text="formatnumber(response_data.length)"
            />
          </v-col>

          <v-col cols="3">
            <GlobalCardTitle
              :title="'ລວມເງິນທີ່ຄາດວ່າຈະໄດ້ຮັບ'"
              :text="formatnumber(sumAmount)"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="response_data"
          density="comfortable"
          :loading="request.loading"
        >
          <template v-slot:item.prints="{ item }">
            <v-tooltip text="ພິມເອກະສານແບບ PDF" location="top">
              <template v-slot:activator="{ props }">
                <v-btn
                  color="primary"
                  variant="text"
                  icon="mdi-file-pdf-box"
                  size="small"
                  v-bind="props"
                  @click="
                    openPath(
                      `/prints/commission_pdf?id=${item.invoice_detail_id}`
                    )
                  "
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
                      `/prints/commission_pdf?id=${item.invoice_detail_id}&&print_type=image`
                    )
                  "
                />
              </template>
            </v-tooltip>
          </template>
          <template v-slot:item.no="{ index }">
            {{ index + 1 }}
          </template>

          <template v-slot:item.innitial_amount="{ item }">
            {{ formatnumber(item.innitial_amount) }}
          </template>

          <template v-slot:item.debt_amount="{ item }">
            {{ formatnumber(item.debt_amount) }}
          </template>

          <template v-slot:item.sale_date="{ item }">
            {{ FormatDate(item.sale_date) }}
          </template>

          <template v-slot:item.actions="{ item, index }">
            <div>
              <v-btn
                color="error"
                variant="text"
                icon="mdi-delete"
                size="small"
                @click="request.invoices.splice(index, 1)"
              ></v-btn>
            </div>
          </template>
        </v-data-table>
      </v-col>

      <v-col cols="12">
        <div class="d-flex flex-wrap justify-center py-2">
          <div>
            <v-btn
              color="primary"
              width="165px"
              flat
              @click="debtStore.OnGotoNextStep"
              :disabled="request.invoices.length === 0"
              >ຕໍ່ໄປ</v-btn
            >
          </div>
        </div>
      </v-col>
    </v-row>
  </section>
</template>
