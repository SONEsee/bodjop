<script lang="ts" setup>
// const title = ref("ລາຍລະອຽດຕົວແທນ / Detail of Agency");
const agencyStore = UseAgencyStore();

const response_data = computed(() => {
  return agencyStore.response_detail_query_data;
});
</script>

<template>
  <section v-if="response_data !== null">
    <v-row>
      <!-- <v-col cols="12">
        <GlobalTextTitleLine :title="title" />
      </v-col> -->

      <v-col cols="12">
        <v-row>
          <v-col cols="12" class="d-flex flex-wrap justify-end align-center">
            <div class="mr-2">
              <v-tooltip text="ແກ້ໄຂຂໍ້ມູນຕົວແທນ" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    icon="mdi-pencil"
                    variant="text"
                    @click="goPath(`/agency/edit?id=${response_data.id}`)"
                    size="medium"
                    class="mr-3"
                    v-bind="props"
                  ></v-btn>
                </template>
              </v-tooltip>

              <!-- <v-btn
                color="primary"
                icon="mdi-pencil"
                variant="text"
                size="small"
                @click="goPath(`/agency/edit?id=${response_data.id}`)"
              ></v-btn> -->
            </div>
            <div class="d-flex">
              ສະຖານະ:
              <span class="pl-4">
                <GlobalDefaultStatusChip :status="response_data?.status" />
              </span>
            </div>
          </v-col>

          <v-col md="4" class="d-flex align-center justify-center">
            <div>
              <!-- :image_url="response_data?.image_profile ?? 'N/A'" -->
              <GlobalAvatarProfileImage
                :image_url="response_data?.image_profile ?? ''"
              />
            </div>
          </v-col>

          <v-col cols="8">
            <v-row>
              <v-col cols="4">
                <GlobalCardTitle
                  :title="'ຊື່ ແລະ ນາມສະກຸນ / Fullname'"
                  :text="response_data?.fullname ?? 'N/A'"
                />
              </v-col>

              <v-col cols="4">
                <GlobalCardTitle
                  :title="'ຊື່ຫຼິ້ນ / Nickname'"
                  :text="response_data?.nick_name ?? 'N/A'"
                />
              </v-col>

              <v-col cols="4">
                <GlobalCardTitle
                  :title="'ເບີໂທລະສັບ / phone number'"
                  :text="response_data?.phone_number ?? 'N/A'"
                />
              </v-col>

              <v-col cols="4">
                <GlobalCardTitle
                  :title="'ລະຫັດຕົວແທນ / Agency code'"
                  :text="response_data?.agent_code ?? 'N/A'"
                />
              </v-col>

              <v-col cols="4">
                <GlobalCardTitle
                  :title="'ສິດການເຂົ້າໃຊ້ງານ / Role access'"
                  :text="GetAgencyTypeLabel(response_data?.agent_type ?? 'N/A')"
                />
              </v-col>

              <v-col cols="4">
                <GlobalCardTitle
                  :title="'ແຂວງ / Provinces'"
                  :text="
                    response_data?.village?.district?.province?.pr_name ?? 'N/A'
                  "
                />
              </v-col>

              <v-col cols="4">
                <GlobalCardTitle
                  :title="'ເມືອງ / Districts'"
                  :text="response_data?.village?.district?.dr_name ?? 'N/A'"
                />
              </v-col>

              <v-col cols="4">
                <GlobalCardTitle
                  :title="'ບ້ານ / Villages'"
                  :text="response_data?.village?.vill_name ?? 'N/A'"
                />
              </v-col>

              <v-col cols="4">
                <GlobalCardTitle
                  :title="'ຊື້ຜູ້ໃຊ້ງານ / Username'"
                  :text="response_data?.username ?? 'N/A'"
                />
              </v-col>

              <v-col cols="4">
                <GlobalCardTitle
                  :title="'ຄ້າງໜີ້ / Debt'"
                  :text="formatnumber(response_data?.money_outstanding)"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" class="pt-12">
        <v-row>
          <v-col cols="6">
            <h4>ການໃຫ້ເປີເຊັນ / Commissions</h4>

            <div>
              <AgencyDetailContentTableCommissions />
            </div>
          </v-col>

          <v-col cols="6">
            <h4>
              ເອກະສານລະບຸຕົວຕົນ / Identifications ({{
                formatnumber(response_data?.user_identities.length ?? 0)
              }})
            </h4>
            <div>
              <AgencyDetailContentTableIdentities />
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </section>
</template>
