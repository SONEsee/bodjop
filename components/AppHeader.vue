<script lang="ts" setup>
const user = GetUserLocalStorage();

const items = ref([
  {
    title: "ໜ້າຫຼັກ",
    menu: [{ text: "Dashboard", icon: "mdi-clock", to: "/" }],
  },
  {
    title: "ຈັດການຂໍ້ມູນ",
    menu: [
      { text: "ຈັດການຕົວແທນ", icon: "mdi-account-group", to: "/agency" },
      { text: "ຈັດການຂໍ້ມູນການຂາຍ", icon: "mdi-sale", to: "/sales" },
      {
        text: "ຈັດການຂໍ້ມູນໃບຮຽກເກັບເງິນ",
        icon: "mdi-invoice",
        to: "/invoices",
      },
      {
        text: "ຈັດການປະເພດລາຍຈ່າຍ",
        icon: "mdi-cash-edit",
        to: "/expense_type_managements",
      },
      {
        text: "ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ",
        icon: "mdi-cash-sync",
        to: "/sale_expense_transactions",
      },
      {
        text: "ເພີ່ມຂໍ້ມູນການຕັດໜີ້",
        icon: "mdi-cash-100",
        to: "/debts/new",
      },
      {
        text: "ຈັດການຂໍ້ມູນອຸປະກອນ",
        icon: "mdi-devices",
        to: "/devices",
      },
      {
        text: "ກະຈາຍອຸປະກອນ",
        icon: "mdi-transfer",
        to: "/devices-movements",
      },
      {
        text: "ຈັດການຜູ້ໃຊ້ງານ",
        icon: "mdi-account-cog",
        to: "/manageuser",
      },
    ],
  },
  {
    title: "ລາຍງານ",
    icon: "mdi-file-document",
    menu: [
      {
        text: "ລາຍງານຂໍ້ມູນໃບຮຽກເກັບເງິນ",
        icon: "mdi-account-credit-card",
        to: "/reports/invoices",
      },
      {
        text: "ລາຍງານຂໍ້ມູນການຕັດຍອດ",
        icon: "mdi-credit-card",
        to: "/reports/payment-transactions",
      },
      {
        text: "ລາຍງານການຂາຍແບບລວມ",
        icon: "mdi-printer-pos-check-outline",
        to: "/reports/sales",
      },
      {
        text: "ລາຍງານການໜີ້ຄ້າງ",
        icon: "mdi-account-file-text",
        to: "/reports/debts",
      },
      {
        text: "ລາຍງານການຂາຍ",
        icon: "mdi-printer-pos",
        to: "/reports/reports_agency",
      },
      {
        text: "ລາຍງານອຸປະກອນ",
        icon: "mdi-monitor-cellphone-star",
        to: "/reports/equipment",
      },
    ],
  },
]);

const drawer = ref(true);
const rail = ref(false);
</script>

<template>
  <v-app-bar :elevation="2" color="primary">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>32Lottery App Bar</v-app-bar-title>
    <v-menu width="220px">
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <GlobalProfileImage
            :image_url="user?.profile_image ?? 'N/A'"
            :size="'48'"
          />
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <div class="mx-auto text-center">
            <GlobalProfileImage
              :image_url="user?.profile_image ?? 'N/A'"
              :size="'80'"
            />

            <h3>{{ user?.fullname ?? "N/A" }}</h3>
            <p class="mt-1">{{ user?.username ?? "N/A" }}</p>

            <v-divider class="my-3"></v-divider>
            <v-btn variant="text" rounded @click="goPath('/profile')">
              Profile
            </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn variant="text" rounded @click="onLogout"> Logout </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" permanent :rail="rail" order="1">
    <v-list nav density="comfortable">
      <div v-for="(item, i) in items" :key="`item-${i}`">
        <v-list-subheader class="font-weight-black">{{
          item.title
        }}</v-list-subheader>

        <v-list-item
          color="primary"
          v-for="(menu, indexMenu) in item.menu"
          :key="`menu-${indexMenu}`"
          :value="menu"
          rounded="xl"
          :to="menu.to"
        >
          <template v-slot:prepend>
            <v-icon :icon="menu.icon"></v-icon>
          </template>

          <v-list-item-title v-text="menu.text"></v-list-item-title>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>
