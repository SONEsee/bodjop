import * as XLSX from "xlsx";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { SaleModels, DeviceModels, ExpenseTypeModels } from "@/models/";
import { ReturnDate } from "@/composables/global";
import _ from "lodash";

export const onSaleUploadFile = async (
  file: ArrayBuffer | undefined,
  sale_date: Date | null
): Promise<SaleModels.OnSaleCreateModelAndWinnerSale[] | Error> => {
  try {
    if (!file) {
      return [];
    }

    const workbook = XLSX.read(file, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const tables: SaleModels.OnSaleCreateModel[] = XLSX.utils.sheet_to_json(
      worksheet,
      { raw: true }
    );
    if (tables.length < 1) {
      return [];
    }

    console.log(`print`, tables);
    const sheetWinnerSales = workbook.SheetNames[1];
    const worksheetWinner = workbook.Sheets[sheetWinnerSales];
    const dataWinnerSales: SaleModels.OnSaleCreateModel[] =
      XLSX.utils.sheet_to_json(worksheetWinner, { raw: true }) ?? [];

    const result: SaleModels.OnSaleCreateModelAndWinnerSale[] = [];
    for (let i = 0; i < tables.length; i++) {
      let item = tables[i];
      //filter winner sales and group data
      let winnerSales = dataWinnerSales.filter(
        (d) => d.pos_code === item.pos_code
      );

      result.push({
        pos_code: item.pos_code?.toString() ?? "N/A",
        sale_amount: item.sale_amount ?? 0,
        one_digits: item.one_digits ?? 0,
        two_digits: item.two_digits ?? 0,
        three_digits: item.three_digits ?? 0,
        four_digits: item.four_digits ?? 0,
        five_digits: item.five_digits ?? 0,
        six_digits: item.six_digits ?? 0,
        province_name: item.province_name ?? "N/A",
        unit: item.unit ?? "N/A",
        winner_sales: winnerSales.map((d: SaleModels.OnSaleCreateModel) => {
          return {
            pos_code: d.pos_code?.toString() ?? "N/A",
            sale_amount: d.sale_amount,
            // sale_date: any;
            one_digits: d.one_digits,
            two_digits: d.two_digits,
            three_digits: d.three_digits,
            four_digits: d.four_digits,
            five_digits: d.five_digits,
            six_digits: d.six_digits,
            province_name: d.province_name,
            unit: d.unit,
          };
        }),
      });
    }

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const onDeviceUploadFile = async (
  file: ArrayBuffer | undefined
): Promise<DeviceModels.DeviceUploadFileRequest[] | Error> => {
  try {
    const result: DeviceModels.DeviceUploadFileRequest[] = [];
    const workbook = XLSX.read(file, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const tables: DeviceModels.DeviceUploadFileRequest[] =
      XLSX.utils.sheet_to_json(worksheet, { raw: true });
    for (let i = 0; i < tables.length; i++) {
      let item = tables[i];
      result.push({
        pos_code: item.pos_code?.toString() ?? "N/A",
        imei: item.imei?.toString() ?? "N/A",
      });
    }

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const onSaleUploadFileRecover = async (
  file: ArrayBuffer | undefined
): Promise<SaleModels.UploadSaleBody[] | Error> => {
  try {
    if (!file) {
      return [];
    }

    const dayjs = useDayjs();
    const result: SaleModels.UploadSaleItemBody[] = [];
    const res: SaleModels.UploadSaleBody[] = [];

    const workbook = XLSX.read(file, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const tables: SaleModels.UploadSaleItemBody[] = XLSX.utils.sheet_to_json(
      worksheet,
      { raw: true }
    );
    if (tables.length < 1) {
      return [];
    }

    const saleDates = [
      ...new Set(
        tables.map((d) => {
          //@ts-ignore
          return dayjs(ReturnDate(d.sale_date)).format("YYYY-MM-DD");
        })
      ),
    ];

    console.log(`sale_date`, saleDates);
    if (saleDates.length === 0) {
      return res;
    }

    for (let i = 0; i < saleDates.length; i++) {
      let item: SaleModels.UploadSaleBody = {
        sale_date: saleDates[i],
        items: [],
      };

      const saleTime = new Date(saleDates[i]).getTime();
      const saleData = tables.filter((d) => {
        const saleFileTime = new Date(
          //@ts-ignore
          dayjs(ReturnDate(d.sale_date)).format("YYYY-MM-DD")
        ).getTime();

        return saleTime === saleFileTime;
      });

      item.items = saleData.map((d) => {
        return {
          ...d,
          pos_code: d.pos_code?.toString() ?? "N/A",
          //@ts-ignore
          sale_date: dayjs(ReturnDate(d.sale_date)).format("YYYY-MM-DD"),
        };
      });
      res.push(item);
    }

    console.log(`res`, res);

    // for (let i = 0; i < tables.length; i++) {
    //   let item = tables[i];
    //   //@ts-ignore
    //   result.push({
    //     pos_code: item.pos_code?.toString() ?? "N/A",
    //     sale_amount: item.sale_amount ?? 0,
    //     agency_code: item.agency_code,
    //     sale_date: dayjs(ReturnDate(Number(item.sale_date))).format(
    //       "YYYY-MM-DD"
    //     ),
    //   });
    // }

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// export const GetFilterWinnerSale = async (
//   pos_code_main: string,
//   sale_date: string,
//   winner_sales: SaleModels.WinnerSaleCreateModel[]
// ): Promise<SaleModels.WinnerSaleCreateModel[] | Error> => {
//   try {
//     const dayjs = useDayjs();
//     if (winner_sales.length < 1) {
//       return [];
//     }
//     const saleDateMain = new Date(sale_date);
//     const winnerSaleFilter: SaleModels.WinnerSaleCreateModel[] = [];
//     for (let i = 0; i < winner_sales.length; i++) {
//       let sale = winner_sales[i];
//       const saleDate = new Date(
//         dayjs(ReturnDate(sale.sale_date)).format("YYYY-MM-DD")
//       );
//       const pos_code = sale?.pos_code?.toString() ?? "N/A";
//       if (
//         saleDateMain.getTime() === saleDate.getTime() &&
//         pos_code_main === pos_code
//       ) {
//         winnerSaleFilter.push({
//           pos_code: sale.pos_code?.toString() ?? "N/A",
//           sale_date: dayjs(saleDate).format("YYYY-MM-DD"),
//           sale_amount: sale.sale_amount ?? 0,
//           one_digits: sale.one_digits ?? 0,
//           two_digits: sale.two_digits ?? 0,
//           three_digits: sale.three_digits ?? 0,
//           four_digits: sale.four_digits ?? 0,
//           five_digits: sale.five_digits ?? 0,
//           six_digits: sale.six_digits ?? 0,
//           province_name: sale.province_name ?? "N/A",
//           unit: sale.unit ?? "N/A",
//         });
//       }
//     }

//     return winnerSaleFilter;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

export const onSaleExportExcel = async (items: SaleModels.SaleDetail[]) => {
  try {
    if (items.length < 1) {
      return [];
    }

    const dayjs = useDayjs();
    const headers = [
      "No",
      "Sale Date",
      "Pos Code",
      "Sale Amount",
      "Agency Code",
    ];
    const ws_data: any[] = [];
    ws_data.push(headers);
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      ws_data.push([
        i + 1,
        dayjs(item.sale_date).format("DD-MM-YYYY"),
        item.pos_code ?? "-",
        item.amount ?? 0,
        item.agency?.agent_code ?? "N/A",
      ]);
    }
    const sale_date = dayjs(items[0].sale_date).format("DD_MM_YYYY");
    const workBooks = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(workBooks, ws, "ຂໍ້ມູນການຂາຍ");
    XLSX.writeFile(workBooks, `${sale_date}_REPORT_SALES.xlsx`);
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const onSaleExportExcelV2 = async (items: SaleModels.SaleDetail[]) => {
  try {
    if (items.length < 1) {
      return [];
    }

    const dayjs = useDayjs();
    const saleStore = UseSaleStore();
    const winnerSaleList = saleStore.sale_export_pdf;
    const agencyCode = items.map(
      (d: SaleModels.SaleDetail) => d.agency?.agent_code
    );

    const uniqueAgencyCode = [...new Set(agencyCode)];
    if (uniqueAgencyCode.length < 1) {
      return [];
    }

    const zip = new JSZip();
    let headers = [
      "Sale Date",
      "Agent Code",
      "POS Code",
      "Sale Amount",
      "1D",
      "2D",
      "3D",
      "4D",
      "5D",
      "6D",
      "Total Won",
    ];
    let headersWinner = [
      "Pos Code",
      "ຖືກ 1 ໂຕ",
      "ຖືກ 2 ໂຕ",
      "ຖືກ 3 ໂຕ",
      "ຖືກ 4 ໂຕ",
      "ຖືກ 5 ໂຕ",
      "ຖືກ 6 ໂຕ",
      "ຍອດຖືກລວມ",
    ];

    for (let i = 0; i < uniqueAgencyCode.length; i++) {
      let code = uniqueAgencyCode[i];
      let ws_data: any[] = [headers];
      let winner_data: any[] = [headersWinner];
      let salesFilterByAgencyCode = items.filter(
        (d: SaleModels.SaleDetail) => d.agency?.agent_code === code
      );

      const winnerSaleByAgencyCode = winnerSaleList.filter(
        (d: SaleModels.GetSaleForPrintPDFResponseItem) => d.agency_code === code
      );

      let winnerSaleItem =
        winnerSaleByAgencyCode.length > 0
          ? winnerSaleByAgencyCode[0].items
          : [];

      salesFilterByAgencyCode = salesFilterByAgencyCode.sort((a, b) => {
        const posCodeA = a.pos_code || "";
        const posCodeB = b.pos_code || "";

        return posCodeA.localeCompare(posCodeB, undefined, {
          numeric: true,
          sensitivity: "base",
        });
      });

      for (let j = 0; j < salesFilterByAgencyCode.length; j++) {
        let item = salesFilterByAgencyCode[j];
        const winnerSaleByPos = winnerSaleItem.filter(
          (d) => d.pos_code === item.pos_code
        );

        ws_data.push([
          dayjs(item.sale_date).format("DD-MM-YYYY"),
          item.agency?.agent_code ?? "N/A",
          item.pos_code ?? "-",
          item.amount === 0 ? "-" : item.amount,
          _.sumBy(winnerSaleByPos, "one_digit") === 0
            ? "-"
            : _.sumBy(winnerSaleByPos, "one_digit"),

          _.sumBy(winnerSaleByPos, "two_digit") === 0
            ? "-"
            : _.sumBy(winnerSaleByPos, "two_digit"),

          _.sumBy(winnerSaleByPos, "three_digit") === 0
            ? "-"
            : _.sumBy(winnerSaleByPos, "three_digit"),

          _.sumBy(winnerSaleByPos, "four_digit") === 0
            ? "-"
            : _.sumBy(winnerSaleByPos, "four_digit"),

          _.sumBy(winnerSaleByPos, "five_digit") == 0
            ? "-"
            : _.sumBy(winnerSaleByPos, "five_digit"),

          _.sumBy(winnerSaleByPos, "six_digit") === 0
            ? "-"
            : _.sumBy(winnerSaleByPos, "six_digit"),

          _.sumBy(winnerSaleByPos, "total_winner_amount") === 0
            ? "-"
            : _.sumBy(winnerSaleByPos, "total_winner_amount"),
        ]);
      }

      if (winnerSaleByAgencyCode.length > 0) {
        let itemWinnerSale = winnerSaleByAgencyCode[0];
        let wonSaleItems = itemWinnerSale.items.filter(
          (d) => d.total_winner_amount > 0
        );
        for (let e = 0; e < wonSaleItems.length; e++) {
          let itemWinnerSaleList = wonSaleItems[e];
          winner_data.push([
            itemWinnerSaleList?.pos_code ?? "-",
            itemWinnerSaleList?.one_digit === 0
              ? "-"
              : itemWinnerSaleList.one_digit,

            itemWinnerSaleList?.two_digit === 0
              ? "-"
              : itemWinnerSaleList.two_digit,

            itemWinnerSaleList?.three_digit === 0
              ? "-"
              : itemWinnerSaleList.three_digit,

            itemWinnerSaleList?.four_digit === 0
              ? "-"
              : itemWinnerSaleList.four_digit,

            itemWinnerSaleList?.five_digit === 0
              ? "-"
              : itemWinnerSaleList.five_digit,

            itemWinnerSaleList?.six_digit === 0
              ? "-"
              : itemWinnerSaleList.six_digit,

            itemWinnerSaleList?.total_winner_amount === 0
              ? "-"
              : itemWinnerSaleList.total_winner_amount,
          ]);
        }

        winner_data.push([
          "ຍອດລວມ",
          _.sumBy(itemWinnerSale.items, "one_digit") === 0
            ? "-"
            : _.sumBy(itemWinnerSale.items, "one_digit"),

          _.sumBy(itemWinnerSale.items, "two_digit") == 0
            ? "-"
            : _.sumBy(itemWinnerSale.items, "two_digit"),

          _.sumBy(itemWinnerSale.items, "three_digit") == 0
            ? "-"
            : _.sumBy(itemWinnerSale.items, "three_digit"),

          _.sumBy(itemWinnerSale.items, "four_digit") === 0
            ? "-"
            : _.sumBy(itemWinnerSale.items, "four_digit"),

          _.sumBy(itemWinnerSale.items, "five_digit") === 0
            ? "-"
            : _.sumBy(itemWinnerSale.items, "five_digit"),

          _.sumBy(itemWinnerSale.items, "six_digit") === 0
            ? "-"
            : _.sumBy(itemWinnerSale.items, "six_digit"),

          _.sumBy(itemWinnerSale.items, "total_winner_amount") === 0
            ? "-"
            : _.sumBy(itemWinnerSale.items, "total_winner_amount"),
        ]);
      }

      ws_data.push([
        "",
        "",
        "ຍອດລວມ",
        _.sumBy(salesFilterByAgencyCode, "amount") === 0
          ? "-"
          : _.sumBy(salesFilterByAgencyCode, "amount"),
        _.sumBy(winnerSaleItem, "one_digit") === 0
          ? "-"
          : _.sumBy(winnerSaleItem, "one_digit"),

        _.sumBy(winnerSaleItem, "two_digit") === 0
          ? "-"
          : _.sumBy(winnerSaleItem, "two_digit"),

        _.sumBy(winnerSaleItem, "three_digit") === 0
          ? "-"
          : _.sumBy(winnerSaleItem, "three_digit"),

        _.sumBy(winnerSaleItem, "four_digit") === 0
          ? "-"
          : _.sumBy(winnerSaleItem, "four_digit"),

        _.sumBy(winnerSaleItem, "five_digit") === 0
          ? "-"
          : _.sumBy(winnerSaleItem, "five_digit"),

        _.sumBy(winnerSaleItem, "six_digit") === 0
          ? "-"
          : _.sumBy(winnerSaleItem, "six_digit"),

        _.sumBy(winnerSaleItem, "total_winner_amount") === 0
          ? "-"
          : _.sumBy(winnerSaleItem, "total_winner_amount"),
        "",
      ]);

      //TODO append sheet about winner_sales
      const sale_date = dayjs(salesFilterByAgencyCode[0].sale_date).format(
        "DD-MM-YYYY"
      );
      const workBooks = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(ws_data);
      const ws_winner = XLSX.utils.aoa_to_sheet(winner_data);

      // Auto-size columns based on content
      function autosizeColumns(worksheet: any, data: any) {
        const colWidths: any[] = [];

        data.forEach((row: any) => {
          row.forEach((cell: any, colIndex: any) => {
            const cellValue =
              cell !== null && cell !== undefined ? String(cell) : "";
            const cellWidth = cellValue.length;

            if (!colWidths[colIndex] || cellWidth > colWidths[colIndex]) {
              colWidths[colIndex] = cellWidth;
            }
          });
        });

        worksheet["!cols"] = colWidths.map((width) => {
          return { wch: Math.max(6, Math.ceil(width * 1.2)) };
        });
      }

      // Apply auto-sizing to both worksheets
      autosizeColumns(ws, ws_data);
      autosizeColumns(ws_winner, winner_data);

      const numColsWs = ["D", "E", "F", "G", "H", "I", "J", "K"];
      for (let col of numColsWs) {
        for (let i = 2; i <= ws_data.length; i++) {
          const cellRef = col + i;
          if (!ws[cellRef]) continue;
          if (!ws[cellRef].s) ws[cellRef].s = {};
          ws[cellRef].z = "#,##0"; // With decimal places for total
        }
      }

      const numCols = ["B", "C", "D", "E", "F", "G", "H"];
      for (let col of numCols) {
        for (let i = 2; i <= winner_data.length; i++) {
          // Start from row 2 (skip header)
          const cellRef = col + i;
          if (!ws_winner[cellRef]) continue;

          // Apply number format
          if (!ws_winner[cellRef].s) ws_winner[cellRef].s = {};

          // Use different format for the total amount column
          if (col === "H") {
            ws_winner[cellRef].z = "#,##0.00"; // With decimal places for total
          } else {
            ws_winner[cellRef].z = "#,##0"; // Just thousands separator for counts
          }
        }
      }

      XLSX.utils.book_append_sheet(workBooks, ws, "ຂໍ້ມູນການຂາຍ");
      XLSX.utils.book_append_sheet(workBooks, ws_winner, "ຂໍ້ມູນຖືກລາງວັນ");
      const excelBuffer = XLSX.write(workBooks, {
        bookType: "xlsx",
        type: "array",
      });
      zip.file(
        `Daily Sale Report ${code} ${sale_date}.xlsx`,
        new Blob([excelBuffer])
      );
    }

    const sale_date = dayjs(items[0].sale_date).format("DD-MM-YYYY");

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `Daily Sale Reports ${sale_date} .zip`);
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const ExportErrorSale = async (items: any[]) => {
  try {
    const ws_data: any[] = [];
    const headers = ["ລະຫັດເຄື່ອງຂາຍ"];
    ws_data.push(headers);

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      ws_data.push([item]);
    }

    const workBooks = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(workBooks, ws, "ຂໍ້ມູນເຄື່ອງຂາຍ");
    XLSX.writeFile(workBooks, `ERROR_SALE_DEVICE_UPLOAD.xlsx`);
  } catch (error) {
    console.error(error);
  }
};

export const onExpenseTypeTransactionUpload = async (
  file: ArrayBuffer | undefined
): Promise<
  ExpenseTypeModels.ExpenseTypeTransactionUploadFileResponse[] | Error
> => {
  try {
    const workbook = XLSX.read(file, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const tables: ExpenseTypeModels.ExpenseTypeTransactionUploadFile[] =
      XLSX.utils.sheet_to_json(worksheet, { raw: true });

    const result: ExpenseTypeModels.ExpenseTypeTransactionUploadFileResponse[] =
      [];
    for (let i = 0; i < tables.length; i++) {
      let item = tables[i];
      const sale_date = ReturnDate(item.sale_date);
      console.log(`sale_date`, sale_date);
      result.push({
        sale_date: sale_date,
        agency_code: item.agency_code,
        amount: item.amount,
        expense_type: item.expense_type,
        note: item.note,
      });
    }

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const onDeviceMovementUploadFile = async (
  file: ArrayBuffer | undefined
): Promise<DeviceModels.DeviceMovementFileUpload[] | Error> => {
  try {
    const result: DeviceModels.DeviceMovementFileUpload[] = [];

    const workbook = XLSX.read(file, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const tables: DeviceModels.DeviceMovementFileUploadV2[] =
      XLSX.utils.sheet_to_json(worksheet, { raw: true });

    console.log(`tables`, tables);
    for (let i = 0; i < tables.length; i++) {
      let item = tables[i];
      result.push({
        movement_date: ReturnDate(item.MOVEMENT_DATE),
        pos_code: item.POS_CODE?.toString() ?? "",
        agency_code: item.AGENCY_CODE?.toString() ?? "",
      });
    }

    console.log(`reuslt`, result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const onExcelSaleExpenseTransactions = async (
  items: ExpenseTypeModels.GetSaleExpenseTransactionExcelItem[]
) => {
  try {
    if (items.length > 0) {
      let headers = [
        "ງວດວັນທີ",
        "ລະຫັດຕົວແທນ",
        "ຊື່ຕົວແທນ",
        "ປະເພດລາຍຈ່າຍ",
        "ຈຳນວນເງີນ",
        "ຄົນເພີ່ມຂໍ້ມູນ",
        "ລົງຂໍ້ມູນວັນທີ",
      ];
      let ws_data: any[] = [headers];
      const dayjs = useDayjs();
      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        ws_data.push([
          dayjs(item.sale_date).format("DD-MM-YYYY"),
          item.agency_code,
          item.agency_name,
          item.expense_name,
          item.amount,
          item.create_fullname,
          dayjs(item.expense_create_at).format("DD-MM-YYYY HH:mm:ss"),
        ]);
      }
      const workBooks = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(ws_data);
      XLSX.utils.book_append_sheet(workBooks, ws, "ຂໍ້ມູນລາຍຈ່າຍ");
      XLSX.writeFile(workBooks, "Sale Expense Transactions.xlsx");
    }
  } catch (error) {
    console.error(error);
  }
};
