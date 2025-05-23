import numeral from "numeral";
import swal from "sweetalert2";
import { AxiosError } from "axios";
import type { SweetAlertOptions } from "sweetalert2";
import {
  DefaultResponseModel,
  InvoiceModels,
  PrintsModels,
  UserModel,
} from "@/models/";
import { COMMISSIONS } from "@/enum/commissions";

export const UseGetFormatDatePicker = (date: any) => {
  if (date) {
    const datenow = new Date(date);
    const day = datenow.getDate();
    const month = datenow.getMonth() + 1;
    const year = datenow.getFullYear();
    return `${numeral(day).format("00")}/${numeral(month).format(
      "00"
    )}/${year}`;
  } else {
    return date;
  }
};

export const goPath = (path: string | null) => {
  if (path !== null) {
    window.location.href = path;
  }
};
export const openPath = (path: string | null) => {
  if (path !== null) {
    window.open(path, "_blank");
  }
};

export const DefaultSwalError = (err: any) => {
  if (err instanceof AxiosError) {
    const response_data = err?.response
      ?.data as DefaultResponseModel.DefaultErrorResponse;
    return swal.fire({
      icon: "error",
      title: "ຜິດພາດ",
      text: response_data?.error ?? "",
    });
  } else {
    return swal.fire({
      icon: "error",
      title: "ຜິດພາດ",
      text: err?.message ?? "",
    });
  }
};

export const FormatDatetime = (date: any) => {
  const dayjs = useDayjs();
  if (date) {
    return dayjs(new Date(date)).format("DD-MM-YYYY HH:mm:ss");
  }

  return date;
};

export const FormatDate = (date: any) => {
  const dayjs = useDayjs();
  if (date) {
    return dayjs(new Date(date)).format("DD-MM-YYYY");
  }
  return date;
};

export const FormatInvoiceDate = (date: any) => {
  const dayjs = useDayjs();
  if (date) {
    return dayjs(new Date(date)).format("DD/MM/YYYY");
  }
  return date;
};

export const onLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("profile_image_url");
  localStorage.removeItem("profile_enable");

  setTimeout(() => {
    goPath("/login");
  }, 1200);
};

export const GetAgencyType = () => {
  return [
    {
      title: "ຕົວແທນແບບແຂວງ (Province Agency)",
      value: "PROVINCE",
    },
    {
      title: "ຕົວແທນແບບເມືອງ (District Agency)",
      value: "DISTRICT",
    },
    {
      title: "ຕົວແທນແບບບຸກຄົນ (Unit Agency)",
      value: "UNIT",
    },
  ];
};

export const GetDefaultGenders = () => {
  return [
    {
      title: "ຜູ້ຍິງ / Female",
      value: 1,
    },
    {
      title: "ຜູ້ຊາຍ / Male",
      value: 2,
    },
  ];
};

export const GetAgencyTypeLabel = (type: string): string => {
  const list_of_agency_label = {
    PROVINCE: "ຕົວແທນແບບແຂວງ (Province Agency)",
    DISTRICT: "ຕົວແທນແບບເມືອງ (District Agency)",
    UNIT: "ຕົວແທນແບບບຸກຄົນ (Unit Agency)",
  } as { [key: string]: string };

  return list_of_agency_label?.[type] ?? "N/A";
};

export const GetDefaultStatus = () => {
  return [
    { title: "ເປີດໃຊ້ງານ", value: 1 },
    {
      title: "ປິດໃຊ້ງານ",
      value: 0,
    },
  ];
};

export const CallSwal = (options: SweetAlertOptions) => {
  return swal.fire({
    ...options,
    customClass: {
      confirmButton: "custom-confirm-button",
    },
  });
};

export const GetImageUrl = (file: File | string | null) => {
  if (file) {
    if (typeof file === "object") {
      return URL.createObjectURL(file);
    } else {
      return file;
    }
  }

  return "";
};

export const GetIdentitiesList = () => {
  return [
    {
      title: "ບັດປະຈຳຕົວ",
      value: 1,
    },
    {
      title: "ພາສປອດ / Passport",
      value: 2,
    },
    {
      title: "ສຳມະໂນຄົວ",
      value: 3,
    },
  ];
};

export const GetCommissionList = () => {
  return [
    {
      title: "ເປີເຊັນພຶ້ນຖານ",
      value: COMMISSIONS.STANDARD_COMMISSION,
    },
    {
      title: "ເປີເຊັນຖອກຕົງ",
      value: COMMISSIONS.STRAIGHT_COMMISSION,
    },
    {
      title: "ເປີເຊັນເປົ້າ ແບບຄ່າສະເລ່ຍ",
      value: COMMISSIONS.GOAL_AVERAGE_COMMISSION,
    },
    {
      title: "ເປີເຊັນເປົ້າ ແບບຕ່ໍເຄື່ອງ",
      value: COMMISSIONS.GOAL_DEVICE_COMMISSION,
    },
    {
      title: "ເປີເຊັນບິນລາງວັນ",
      value: COMMISSIONS.WINNER_SALE_COMMISSION,
    },
  ];
};

export const GetIdentitiesLabel = (type: number): string => {
  const list_indetities_label = {
    1: "ບັດປະຈຳຕົວ",
    2: "ພາສປອດ / Passport",
    3: "ສຳມະໂນຄົວ",
  } as { [key: number]: string };
  return list_indetities_label?.[type] ?? "N/A";
};

export const GetCommissionLabel = (type: string): string => {
  const list_commission_label = {
    STANDARD: "ເປີເຊັນພຶ້ນຖານ",
    STRAIGHT: "ເປີເຊັນຖອກຕົງ",
    GOAL_AVERAGE: "ເປີເຊັນເປົ້າ ແບບຄ່າສະເລ່ຍ",
    GOAL_DEVICE: "ເປີເຊັນເປົ້າ ແບບຕ່ໍເຄື່ອງ",
  } as { [key: string]: string };
  return list_commission_label?.[type] ?? "N/A";
};

export const formatnumber = (value: number | string) => {
  if (value) {
    return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return "0";
  }
};

export const formatnumberV2 = (value: number | string) => {
  if (value) {
    const [integerPart, decimalPart] = value.toString().split("."); // Split into integer and decimal parts
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas
    return decimalPart
      ? `${formattedInteger}.${decimalPart}`
      : formattedInteger;
  } else {
    return "0";
  }
};

export const GetItemPerPageOptions = () => {
  return [
    {
      title: "2",
      value: 2,
    },
    {
      title: "5",
      value: 5,
    },
    {
      title: "10",
      value: 10,
    },
    {
      title: "20",
      value: 20,
    },
    {
      title: "30",
      value: 30,
    },
    {
      title: "50",
      value: 50,
    },
    {
      title: "100",
      value: 100,
    },
    {
      title: "200",
      value: 200,
    },
    {
      title: "300",
      value: 300,
    },
    {
      title: "500",
      value: 500,
    },
    {
      title: "1000",
      value: 1000,
    },
  ];
};

export const delayGoPath = (path: string) => {
  if (!path) {
    return;
  }

  return setTimeout(() => {
    window.location.href = path;
  }, 1200);
};

export const pushPath = (path: string) => {
  const router = useRouter();
  if (!path) {
    return;
  }

  return router.push({
    path: path,
  });
};

export const ReturnDate = function (date: number | Date) {
  if (typeof date === "number") {
    var utc_days = Math.floor(date - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);
    var fractional_day = date - Math.floor(date) + 0.0000001;
    var total_seconds = Math.floor(86400 * fractional_day);
    var seconds = total_seconds % 60;
    total_seconds -= seconds;
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(
      date_info.getFullYear(),
      date_info.getMonth(),
      date_info.getDate(),
      hours,
      minutes,
      seconds
    );
  } else if (typeof date === "string") {
    const dayjs = useDayjs();
    return dayjs(date, "DD-MM-YYYY HH:mm:ss").toDate();
  } else {
    return new Date(date);
  }
};

export const GetCommissionOrExpenseTypeLabel = (label: string) => {
  let listOfLabel = {
    STANDARD: "ເປີເຊັນພຶ້ນຖານ",
    STRAIGHT: "ເປີເຊັນຖອກຕົງ",
    GOAL_AVERAGE: "ເປີເຊັນເປົ້າ ແບບຄ່າສະເລ່ຍ",
    GOAL_DEVICE: "ເປີເຊັນເປົ້າ ແບບຕ່ໍເຄື່ອງ",
    GOAL_COMMISSION: "ເປີເຊັນເປົ້າ",
    WINNER_SALE_COMMISSION: "ເປີເຊັນບິນລາງວັນ",
    WINNER_EXPENSE_SALE: "ບິນລາງວັນ",
    BORROW_EXPENSE_SALE: "ຕົວແທນຢືມ",
    COMMITTEE_EXPENSE_SALE: "ຄ່າກຳມະການ",
    // COMMITTEE_EXPENSE_SALE: "Hello world",
    VAT_EXPENSE_SALE: "ອາກອນ",
    OTHER_EXPENSE_SALE: "ອື່ນໆ",
    TOPUP_CARD: "ບັດເຕີມ",
    WINNER_EXPENSE_LAST_DIGIT_SALE: "ບິນລາງວັນເລກທ້າຍ",
  } as { [key: string]: string };

  return listOfLabel[label] ?? "N/A";
};

export const FilterAmountOfEachTypeInvoice = (
  sales: InvoiceModels.Sale[],
  label: string | null
): string => {
  try {
    if (sales.length < 1) {
      return "";
    }

    if (label == null) {
      return "";
    }

    const filterSale = sales.filter(
      (d: InvoiceModels.Sale) => d.type === label
    );

    if (filterSale.length < 1) {
      return "";
    }
    return filterSale[0]["amount"]?.toString() ?? "-";
  } catch (error) {
    console.error(error);
    return "-";
  }
};

export const FilterObjectOfEachTypeInvoice = (
  sales: InvoiceModels.Sale[],
  label: string | null
): InvoiceModels.Sale | null => {
  try {
    if (sales.length < 1) {
      return null;
    }

    if (label == null) {
      return null;
    }

    const filterSale = sales.filter(
      (d: InvoiceModels.Sale) => d.type === label
    );

    if (filterSale.length < 1) {
      return null;
    }
    return filterSale[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const FilterAmountOfEachTypeInvoiceV2 = (
  sales: PrintsModels.InvoiceCalculation[],
  label: string | null
): string => {
  try {
    if (sales.length < 1) {
      return "";
    }

    if (label == null) {
      return "";
    }

    const filterSale = sales.filter(
      (d: PrintsModels.InvoiceCalculation) => d.commissions_type === label
    );

    if (filterSale.length < 1) {
      return "";
    }
    return filterSale[0]["amount"]?.toString() ?? "-";
  } catch (error) {
    console.error(error);
    return "-";
  }
};

export const GetUserLocalStorage = () => {
  try {
    const user = localStorage.getItem("user") ?? null;
    if (user === null) {
      return null;
    }

    //parse data
    const result = JSON.parse(user) as UserModel.User;
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const GetUserRoleList = () => {
  return [
    {
      title: "ແອັດມິນ / Admin",
      value: "ADMIN",
    },
  ];
};
