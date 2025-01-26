import * as XLSX from "xlsx";
import { SaleModels } from "@/models/";
import { ReturnDate } from "@/composables/global";

export const onSaleUploadFile = async (
  file: ArrayBuffer | undefined
): Promise<SaleModels.OnSaleCreateModel[] | Error> => {
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

    console.log(`table`, tables);
    const result: SaleModels.OnSaleCreateModel[] = [];
    // const dayjs = useDayjs();
    for (let i = 0; i < tables.length; i++) {
      let item = tables[i];
      result.push({
        // sale_date: dayjs(ReturnDate(item.sale_date)).format("YYYY-MM-DD"),
        // agency_code: item.agency_code?.toString() ?? "N/A",
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
      });
    }

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
