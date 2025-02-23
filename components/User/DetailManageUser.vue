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
        <!-- <v-col cols="12">
          <GlobalTextTitleLine :title="title" />
        </v-col> -->
  
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
                <!-- :image_url="response_data?.image_profile ?? 'N/A'" -->
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
  
                <v-col cols="4" >
                  <GlobalCardTitle
                    :title="'ແຂວງ / Provinces'"
                    :text="
                      respons?.village?.district?.province?.pr_name ?? 'N/A'
                    "
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
      <!-- <div class="container mx-auto p-4">
        <div class="bg-white rounded-lg shadow-lg p-6">
        
          <div class="border-b pb-4 mb-4">
            <h1 class="text-2xl font-bold text-gray-800">{{respons?.fullname }}</h1>
            <p class="text-gray-600">{{respons?.username }}</p>
          </div>
    
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="border-b pb-2">
                <h2 class="text-lg font-semibold mb-2">ຂໍ້ມູນສ່ວນຕົວ</h2>
                <div class="space-y-2">
                  <p><span class="font-medium">ຊື່ເຕັມ:</span> {{respons?.fullname }}</p>
                  <p><span class="font-medium">ຊື່ຫຼິ້ນ:</span> {{respons?.nick_name || 'N/A' }}</p>
                  <p><span class="font-medium">ເບີໂທ:</span> {{respons?.phone_number }}</p>
                  <p><span class="font-medium">ເພດ:</span> {{ (respons?.gender) }}</p>
                </div>
              </div>
    
              <div class="border-b pb-2">
                <h2 class="text-lg font-semibold mb-2">ຂໍ້ມູນບ້ານ</h2>
                <div class="space-y-2">
                  <p><span class="font-medium">ບ້ານ:</span> {{respons?.village.vill_name }}</p>
                  <p><span class="font-medium">ເມືອງ:</span> {{respons?.village.district.dr_name }}</p>
                  <p><span class="font-medium">ແຂວງ:</span> {{respons?.village.district.province.pr_name }}</p>
                </div>
              </div>
            </div>
    
            <div class="space-y-4">
              <div class="border-b pb-2">
                <h2 class="text-lg font-semibold mb-2">ຂໍ້ມູນລະບົບ</h2>
                <div class="space-y-2">
                  <p><span class="font-medium">ສະຖານະ:</span> {{ (respons?.status) }}</p>
                  <p><span class="font-medium">ບົດບາດ:</span> {{respons?.role }}</p>
                  <p><span class="font-medium">ວັນທີສ້າງ:</span> {{ (respons?.created_at) }}</p>
                  <p><span class="font-medium">ວັນທີແກ້ໄຂ:</span> {{ (respons?.updated_at) }}</p>
                </div>
              </div>
    
              <div class="border-b pb-2">
                <h2 class="text-lg font-semibold mb-2">ຂໍ້ມູນການເງິນ</h2>
                <div class="space-y-2">
                  <p><span class="font-medium">ຍອດເງິນຄ້າງ:</span> {{ (respons?.money_outstanding) }} ກີບ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </template>