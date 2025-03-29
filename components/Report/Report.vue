<script setup lang="ts">
const title = "ຂໍ້ມູນລາຍງານ";
const headers = [
  { title: "Date", value: "Date" },
  { title: "Agency Code", value: "Agency_Code" },
  { title: "Full Name", value: "FullName" },
  { title: "Sales", value: "Sales" },
  { title: "QTY", value: "QTY" },
  { title: "Avg Sales", value: "AvgSales" },
  { title: "Target", value: "TarGet" },
  { title: "Basic Commission", value: "Basic_Commiss" },
  { title: "On Time Commission", value: "On_Time_Cone" },
  { title: "Target Commission", value: "Taget_Commis" },
  { title: "Last Update", value: "LasstUpdate" },
];
interface Item {
  Date: string;
  Agency_Code: string;
  FullName: string;
  Sales: number;
  QTY: number;
  AvgSales: number;
  TarGet: string;
  Basic_Commiss: string;
  On_Time_Cone: string;
  Taget_Commis: string;
  LasstUpdate: string;
}

const item = [
  {
    Date: "2023-10-01",
    Agency_Code: "P-14202001",
    FullName: "Sone SEEDAVANH",
    Sales: 1000000,
    QTY: 100,
    AvgSales: 10000,
    TarGet: "$1000000",
    Basic_Commiss: "$0.29",
    On_Time_Cone: "$0.2",
    Taget_Commis: "$0.1",
    LasstUpdate: "2023-10-01",
  },
  {
    Date: "2023-10-01",
    Agency_Code: "P-14202001",
    FullName: "Sone SEEDAVANH",
    Sales: 1000000,
    QTY: 100,
    AvgSales: 10000,
    TarGet: "$1000000",
    Basic_Commiss: "$0.29",
    On_Time_Cone: "$0.2",
    Taget_Commis: "$0.1",
    LasstUpdate: "2023-10-01",
  },
  {
    Date: "2023-10-01",
    Agency_Code: "P-14202001",
    FullName: "Sone SEEDAVANH",
    Sales: 1000000,
    QTY: 100,
    AvgSales: 10000,
    TarGet: "$1000000",
    Basic_Commiss: "$0.29",
    On_Time_Cone: "$0.2",
    Taget_Commis: "$0.1",
    LasstUpdate: "2023-10-01",
  },
  {
    Date: "2023-10-01",
    Agency_Code: "P-14202001",
    FullName: "Sone SEEDAVANH",
    Sales: 1000000,
    QTY: 100,
    AvgSales: 10000,
    TarGet: "$1000000",
    Basic_Commiss: "$0.29",
    On_Time_Cone: "$0.2",
    Taget_Commis: "$0.1",
    LasstUpdate: "2023-10-01",
  },
  {
    Date: "2023-10-01",
    Agency_Code: "P-14202001",
    FullName: "Sone SEEDAVANH",
    Sales: 1000000,
    QTY: 100,
    AvgSales: 10000,
    TarGet: "$1000000",
    Basic_Commiss: "$0.29",
    On_Time_Cone: "$0.2",
    Taget_Commis: "$0.1",
    LasstUpdate: "2023-10-01",
  },
  {
    Date: "2023-10-01",
    Agency_Code: "P-14202001",
    FullName: "Sone SEEDAVANH",
    Sales: 1000000,
    QTY: 100,
    AvgSales: 10000,
    TarGet: "$1000000",
    Basic_Commiss: "$0.29",
    On_Time_Cone: "$0.2",
    Taget_Commis: "$0.1",
    LasstUpdate: "2023-10-01",
  },
  {
    Date: "2023-10-03",
    Agency_Code: "P-14202001",
    FullName: "Sone SEEDAVANH",
    Sales: 1000000,
    QTY: 100,
    AvgSales: 10000,
    TarGet: "$1000000",
    Basic_Commiss: "$0.29",
    On_Time_Cone: "$0.2",
    Taget_Commis: "$0.1",
    LasstUpdate: "2023-10-01",
  },
  {
    Date: "2023-10-05",
    Agency_Code: "P-14202001",
    FullName: "Sone SEEDAVANH",
    Sales: 1000000,
    QTY: 100,
    AvgSales: 10000,
    TarGet: "$1000000",
    Basic_Commiss: "$0.29",
    On_Time_Cone: "$0.2",
    Taget_Commis: "$0.1",
    LasstUpdate: "2023-10-01",
  },
  {
    Date: "2023-10-04",
    Agency_Code: "P-14202001",
    FullName: "Sone SEEDAVANH",
    Sales: 1000000,
    QTY: 100,
    AvgSales: 10000,
    TarGet: "$1000000",
    Basic_Commiss: "$0.29",
    On_Time_Cone: "$0.2",
    Taget_Commis: "$0.1",
    LasstUpdate: "2023-10-01",
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
    
    
    const headerRow = headers.map(header => `"${header.title}"`).join(",");
    csvContent += headerRow + "\n";
    
   
    filteredItems.value.forEach(row => {
      const dataRow = headers.map(header => {
        const value = row[header.value as keyof Item];
        
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : `"${value}"`;
      }).join(",");
      csvContent += dataRow + "\n";
    });
    
   
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    

    const link = document.createElement("a");
    link.setAttribute("href", url);
    
  
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
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
      <v-col cols="auto">
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
      <v-col cols="auto">
        <v-btn 
          color="success" 
          flat 
          prepend-icon="mdi-file-excel" 
          @click="exportToExcel"
          :loading="loading"
        >
          <p>ສ້າງ Excel</p>
        </v-btn>
      </v-col>
    </v-row>
  </div>
  <div style="height: 100vh">
    <div class="d-flex justify-center">
      <v-data-table 
        :items="filteredItems" 
        :headers="headers" 
        density="compact" 
        class="text-caption text-no-wrap" 
        hide-default-footer
        hover
        :loading="loading"
      ></v-data-table>
    </div>
  </div>
</template>