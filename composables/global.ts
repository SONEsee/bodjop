import numeral from "numeral";
import swal from "sweetalert2";
import { AxiosError } from "axios";
import { DefaultResponseModel } from "@/models/";

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

export const DefaultSwalError = (err: any) => {
  const errors = err as AxiosError;
  const response_data = errors?.response
    ?.data as DefaultResponseModel.DefaultErrorResponse;
  return swal.fire({
    icon: "error",
    title: "ຜິດພາດ",
    text: response_data?.error ?? "",
  });
};

export const FormatDatetime = (date: any) => {
  const dayjs = useDayjs();
  if (date) {
    return dayjs(new Date(date)).format("DD-MM-YYYY HH:mm:ss");
  }

  return date;
};

export const onLogout = () => {
  localStorage.clear();
  setTimeout(() => {
    goPath("/login");
  }, 1200);
};
