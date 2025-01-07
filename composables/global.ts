import numeral from "numeral";
import swal from "sweetalert2";
import { AxiosError } from "axios";
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

export const DefaultSwalError = (err: AxiosError) => {
  return swal.fire({
    icon: "error",
    title: "ຜິດພາດ",
    text: ""
  });
};
