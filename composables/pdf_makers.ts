import { jsPDF } from "jspdf";
import { SaleModels } from "@/models";
import autoTable from "jspdf-autotable";
import _ from "lodash";

export const GeneratePDF = async (
  sale: SaleModels.GetSaleForPrintPDFResponseItem
) => {
  const dayjs = useDayjs();
  const doc = new jsPDF({
    format: "a4",
    unit: "mm",
  });

  const ws_data: any[] = [];

  for (let i = 0; i < sale.items.length; i++) {
    const item = sale.items[i];
    ws_data.push([
      item.pos_code,
      formatnumber(item.sale_amount),
      formatnumber(item.one_digit),
      formatnumber(item.two_digit),
      formatnumber(item.three_digit),
      formatnumber(item.four_digit),
      formatnumber(item.five_digit),
      formatnumber(item.six_digit),
      formatnumber(item.total_winner_amount),
    ]);
  }
  ws_data.push([
    "ຍອດລວມ",
    formatnumber(_.sumBy(sale.items, "sale_amount")),
    formatnumber(_.sumBy(sale.items, "one_digit")),
    formatnumber(_.sumBy(sale.items, "two_digit")),
    formatnumber(_.sumBy(sale.items, "three_digit")),
    formatnumber(_.sumBy(sale.items, "four_digit")),
    formatnumber(_.sumBy(sale.items, "five_digit")),
    formatnumber(_.sumBy(sale.items, "six_digit")),
    formatnumber(_.sumBy(sale.items, "total_winner_amount")),
  ]);

  // Load the font
  const fontUrl = "/fonts/Phetsarath_OT.ttf";
  const fontBytes = await fetch(fontUrl).then((res) => {
    if (!res.ok) throw new Error("Font file not found");
    return res.arrayBuffer();
  });
  const base64String = arrayBufferToBase64(fontBytes);

  // Register the font
  doc.addFileToVFS("Phetsarath_OT.ttf", base64String);
  doc.addFont("Phetsarath_OT.ttf", "Phetsarath_OT", "normal");

  // Set the font
  doc.setFont("Phetsarath_OT", "normal");
  doc.setFontSize(14);
  const xMargin = 5;

  // Add title
  const pageWidth = doc.internal.pageSize.getWidth();
  const title = "ລາຍງານຍອດຂາຍ ແລະ ຍອດຖືກລາງວັນ";
  const textWidth = doc.getTextWidth(title);
  doc.text(title, Math.max((pageWidth - textWidth) / 2, xMargin), 10);

  // Add date, code, and number (right-aligned)
  doc.setFontSize(11);
  doc.text("ງວດວັນທີ: ", pageWidth - 29, 15, { align: "right" });

  doc.setFont("Phetsarath_OT", "bold"); // Set font to bold
  doc.text(dayjs(sale.sale_date).format("YYYY-MM-DD"), pageWidth - 10, 15, {
    align: "right",
  });

  doc.setFont("Phetsarath_OT", "normal");
  doc.text("ລະຫັດຕົວແທນ: ", pageWidth - 29, 22, { align: "right" });

  doc.setFont("Phetsarath_OT", "bold");
  doc.text(sale.agency_code, pageWidth - 10, 22, { align: "right" });

  doc.setFont("Phetsarath_OT", "normal");

  doc.text("ຊື່ຕົວແທນ: ", pageWidth - 40, 29, { align: "right" });
  doc.text(sale.agency_name, pageWidth - 10, 29, { align: "right" });
  doc.setFont("Phetsarath_OT", "normal");

  doc.text("ຈຳນວນເຄື່ອງ: ", pageWidth - 25, 36, { align: "right" });
  doc.text(`${sale.items.length} ເຄື່ອງ`, pageWidth - 10, 36, {
    align: "right",
  });
  doc.setFont("Phetsarath_OT", "normal");

  // Generate Table
  autoTable(doc, {
    margin: { left: 8, right: 8, top: 5 },
    pageBreak: "auto",
    showHead: "firstPage",
    head: [
      [
        "ລະຫັດເຄື່ອງ",
        "ຍອດຂາຍ",
        "ຖືກ 1 ໂຕ",
        "ຖືກ 2 ໂຕ",
        "ຖືກ 3 ໂຕ",
        "ຖືກ 4 ໂຕ",
        "ຖືກ 5 ໂຕ",
        "ຖືກ 6 ໂຕ",
        "ຍອດຖືກລວມ",
      ],
    ],
    body: ws_data,
    startY: 40,
    styles: {
      font: "Phetsarath_OT",
      fontStyle: "normal",
      halign: "center", // Center-align text by default
    },
    headStyles: {
      font: "Phetsarath_OT",
      fontStyle: "normal",
      fillColor: [200, 200, 200], // Light gray background for header
      textColor: [0, 0, 0],
    },
    bodyStyles: {
      font: "Phetsarath_OT",
      fontStyle: "normal",
    },
    columnStyles: {
      1: { halign: "right" }, // Right-align sales amount
      2: { halign: "right" }, // Right-align shrimp 1
      3: { halign: "right" }, // Right-align shrimp 2
      4: { halign: "right" }, // Right-align shrimp 3
      5: { halign: "right" }, // Right-align shrimp 4
      6: { halign: "right" }, // Right-align shrimp 5
      7: { halign: "right" }, // Right-align shrimp 6
      8: { halign: "right" }, // Right-align total
    },
    didParseCell: (cell) => {
      // Highlight the total row with orange background
      if (cell.row.index === ws_data.length - 1) {
        cell.cell.styles.fillColor = [255, 165, 0]; // Orange background
      }
    },
    didDrawPage: (data) => {
      const pageHeight = doc.internal.pageSize.getHeight();
      const currentPage = data.pageNumber;
      const totalPages = data.doc.internal.getNumberOfPages(); // This might still fail; see below

      doc.setFontSize(10);
      doc.setFont("Phetsarath_OT", "normal");
      doc.text(dayjs().format("DD-MMMM-YYYY"), 10, pageHeight - 10);
      doc.text(
        `Page ${currentPage} of ${totalPages}`,
        pageWidth - 10,
        pageHeight - 10,
        { align: "right" }
      );
    },
  });

  // const currentPage = doc.getCurrentPageInfo().pageNumber;

  // Add footer
  // const pageHeight = doc.internal.pageSize.getHeight();
  // doc.setFontSize(10);
  // doc.text(dayjs().format("DD-MMMM-YYYY"), 10, pageHeight - 10);
  // doc.text(`Page ${currentPage} of 1`, pageWidth - 10, pageHeight - 10, {
  //   align: "right",
  // });

  // Save PDF
  // doc.save("report.pdf");
  return doc.output("blob");
};

const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};
