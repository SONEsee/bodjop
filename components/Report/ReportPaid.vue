<script setup lang="ts">
const title = "ຂໍ້ມູນລາຍງານການຊຳລະ";
const headers = [
  { title: "ວັນທີຊຳລະ", value: "Date" },
  { title: "ງວດວັນທີ", value: "Sale_Date" },
  { title: "ຮັບ/ຈ່າຍ", value: "Paid" },
  { title: "ລະຫັດຕົວແທນ", value: "AgencyCode" },
  { title: "ຈຳນວນເງິນ", value: "Money" },
 
];
interface Item {
  Date: string;
    Sale_Date: string;
    Paid: string;
    AgencyCode: string;
    Money: number;
   
}

const item = [
  
  {
    Date: "2023-10-04",
    Agency_Code: "P-14202001",
    Sale_Date: "2023-10-01",
    Paid: "ຈ່າຍ",
    AgencyCode: "P-14202001",
    Money: 1000000,
  },
  {
    Date: "2023-10-04",
    Agency_Code: "P-14202001",
    Sale_Date: "2023-10-01",
    Paid: "ຈ່າຍ",
    AgencyCode: "P-14202001",
    Money: 1000000,
  },
  {
    Date: "2023-10-04",
    Agency_Code: "P-14202001",
    Sale_Date: "2023-10-01",
    Paid: "ຈ່າຍ",
    AgencyCode: "P-14202001",
    Money: 1000000,
  },
  {
    Date: "2023-10-05",
    Agency_Code: "P-14202001",
    Sale_Date: "2023-10-01",
    Paid: "ຈ່າຍ",
    AgencyCode: "P-14202001",
    Money: 1000000,
  },
  {
    Date: "2023-10-05",
    Agency_Code: "P-14202001",
    Sale_Date: "2023-10-01",
    Paid: "ຈ່າຍ",
    AgencyCode: "P-14202001",
    Money: 1000000,
  },
  {
    Date: "2023-10-05",
    Agency_Code: "P-14202001",
    Sale_Date: "2023-10-01",
    Paid: "ຈ່າຍ",
    AgencyCode: "P-14202001",
    Money: 1000000,
  },
  {
    Date: "2023-10-05",
    Agency_Code: "P-14202001",
    Sale_Date: "2023-10-01",
    Paid: "ຈ່າຍ",
    AgencyCode: "P-14202001",
    Money: 1000000,
  },
];

import { ref, computed } from "vue";
const selectedDate = ref("");
const loading = ref(false);

const uniqueDates = computed(() => {
  const dates = new Set(item.map((i) => i.Date));
  return Array.from(dates);
});

const refresh = ref(false);
const refreshData = () => {
  refresh.value = !refresh.value;
  selectedDate.value = "";
  console.log("refresh");
  console.log(refresh.value);
  console.log(selectedDate.value);
};

const filteredItems = computed(() => {
  if (!selectedDate.value) {
    return item;
  }
  return item.filter((i) => i.Date === selectedDate.value);
});

const exportToExcel = () => {
  loading.value = true;
  try {
    let csvContent = "";

    const headerRow = headers.map((header) => `"${header.title}"`).join(",");
    csvContent += headerRow + "\n";

    filteredItems.value.forEach((row) => {
      const dataRow = headers
        .map((header) => {
          const value = row[header.value as keyof Item];

          return typeof value === "string" && value.includes(",")
            ? `"${value}"`
            : `"${value}"`;
        })
        .join(",");
      csvContent += dataRow + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);

    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const filename = selectedDate.value
      ? `report_${selectedDate.value}.xlsx`
      : `report_all_data_${formattedDate}.xlsx`;

    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log("Excel file exported successfully");
  } catch (error) {
    console.error("Error exporting to Excel:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-card>
    <div class="pa-4">
      <div>
        <v-col cols="12">
          <GlobalTextTitleLine :title="title" />
        </v-col>
      </div>
      <div>
        <v-row>
          <v-col cols="3">
            <v-autocomplete
              density="compact"
              label="ເລືອກວັນທີ"
              v-model="selectedDate"
              :items="uniqueDates"
              variant="outlined"
              clearable
              placeholder="ເລືອກວັນທີເພື່ອກັ່ນຕອງຂໍ້ມູນ"
              :loading="loading"
            ></v-autocomplete>
          </v-col>
          <v-col cols="4">
            <v-btn
              color="primary"
              flat
              prepend-icon="mdi-magnify"
              @click="refreshData"
              :loading="loading"
            >
              <p>ຄົ້ນຫາ</p>
            </v-btn>
          </v-col>
          <v-col cols="5">
            <div class="d-flex justify-end">
              <v-btn
                color="success"
                flat
                prepend-icon="mdi-file-excel"
                @click="exportToExcel"
                :loading="loading"
              >
                <p style="color: white">ສ້າງ Excel</p>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
      <div style="height: 100vh">
        <div class="d-flex justify-center" style="">
          <v-data-table
            :items="filteredItems"
            :headers="headers"
            density="compact"
            class=" text-no-wrap"
            hide-default-footer
            hover
            :loading="loading"
          ></v-data-table>
        </div>
      </div></div
  ></v-card>
</template>
