import * as XLSX from "xlsx";
import { SaleModels, DeviceModels } from "@/models/";
import { ReturnDate } from "@/composables/global";

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

    const sheetWinnerSales = workbook.SheetNames[1];
    const worksheetWinner = workbook.Sheets[sheetWinnerSales];
    const dataWinnerSales: SaleModels.WinnerSaleCreateModel[] =
      XLSX.utils.sheet_to_json(worksheetWinner, { raw: true }) ?? [];

    const result: SaleModels.OnSaleCreateModelAndWinnerSale[] = [];
    const dayjs = useDayjs();
    for (let i = 0; i < tables.length; i++) {
      let item = tables[i];
      //filter winner sales and group data
      let winnerSales: SaleModels.WinnerSaleCreateModel[] | Error = [];
      if (sale_date !== null) {
        winnerSales = await GetFilterWinnerSale(
          item.pos_code?.toString() ?? "N/A",
          dayjs(sale_date).format("YYYY-MM-DD"),
          dataWinnerSales
        );

        if (winnerSales instanceof Error) {
          throw new Error(winnerSales.message);
        }
      }

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
        winner_sales: winnerSales,
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

export const GetFilterWinnerSale = async (
  pos_code_main: string,
  sale_date: string,
  winner_sales: SaleModels.WinnerSaleCreateModel[]
): Promise<SaleModels.WinnerSaleCreateModel[] | Error> => {
  try {
    const dayjs = useDayjs();
    if (winner_sales.length < 1) {
      return [];
    }
    const saleDateMain = new Date(sale_date);
    const winnerSaleFilter: SaleModels.WinnerSaleCreateModel[] = [];
    for (let i = 0; i < winner_sales.length; i++) {
      let sale = winner_sales[i];
      const saleDate = new Date(
        dayjs(ReturnDate(sale.sale_date)).format("YYYY-MM-DD")
      );
      const pos_code = sale?.pos_code?.toString() ?? "N/A";
      if (
        saleDateMain.getTime() === saleDate.getTime() &&
        pos_code_main === pos_code
      ) {
        winnerSaleFilter.push({
          pos_code: sale.pos_code?.toString() ?? "N/A",
          sale_date: dayjs(saleDate).format("YYYY-MM-DD"),
          sale_amount: sale.sale_amount ?? 0,
          one_digits: sale.one_digits ?? 0,
          two_digits: sale.two_digits ?? 0,
          three_digits: sale.three_digits ?? 0,
          four_digits: sale.four_digits ?? 0,
          five_digits: sale.five_digits ?? 0,
          six_digits: sale.six_digits ?? 0,
          province_name: sale.province_name ?? "N/A",
          unit: sale.unit ?? "N/A",
        });
      }
    }

    return winnerSaleFilter;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

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
