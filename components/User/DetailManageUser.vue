<script setup lang="ts">
const globalStore = UseGlobalStore();
const userStore = UserManageStore();
const respons = computed({
  get() {
    return userStore.response_detail_query_data;
  },
  set(value) {
    userStore.response_detail_query_data = value;
  },
});
</script>
<template>
  <section v-if="respons !== null">
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="12" class="d-flex flex-wrap justify-end align-center">
            <div class="mr-2">
              <v-btn
                color="primary"
                icon="mdi-pencil"
                variant="text"
                size="small"
                @click="goPath(`/agency/edit?id=${respons.id}`)"
              ></v-btn>
            </div>
            <div class="d-flex">
              ສະຖານະ:
              <span class="pl-4">
                <GlobalDefaultStatusChip :status="respons?.status" />
              </span>
            </div>
          </v-col>

          <v-col md="4" class="d-flex align-center justify-center">
            <div>
              <GlobalAvatarProfileImage
                :image_url="respons?.image_profile ?? ''"
              />
            </div>
          </v-col>

          <v-col cols="8">
            <v-row>
              <v-col cols="4">
                <GlobalCardTitle
                  :title="'ຊື່ ແລະ ນາມສະກຸນ / Fullname'"
                  :text="respons?.fullname ?? 'N/A'"
                />
              </v-col>

              <v-col cols="4">
                <GlobalCardTitle
                  :title="'ຊື່ຫຼິ້ນ / Nickname'"
                  :text="respons?.nick_name ?? 'N/A'"
                />
              </v-col>

              <v-col cols="4">
                <GlobalCardTitle
                  :title="'ເບີໂທລະສັບ / phone number'"
                  :text="respons?.phone_number ?? 'N/A'"
                />
              </v-col>

              <v-col cols="4">
                <GlobalCardTitle
                  :title="'ສິດການເຂົ້າໃຊ້ງານ / Role access'"
                  :text="respons.role ?? 'N/A'"
                />
              </v-col>

              <v-col cols="4">
                <GlobalCardTitle
                  :title="'ແຂວງ / Provinces'"
                  :text="respons?.village?.district?.province?.pr_name ?? 'N/A'"
                />
              </v-col>

              <v-col cols="4">
                <GlobalCardTitle
                  :title="'ເມືອງ / Districts'"
                  :text="respons?.village?.district?.dr_name ?? 'N/A'"
                />
              </v-col>

              <v-col cols="4">
                <GlobalCardTitle
                  :title="'ບ້ານ / Villages'"
                  :text="respons?.village?.vill_name ?? 'N/A'"
                />
              </v-col>

              <v-col cols="4">
                <GlobalCardTitle
                  :title="'ຊື້ຜູ້ໃຊ້ງານ / Username'"
                  :text="respons?.username ?? 'N/A'"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </section>
</template>
