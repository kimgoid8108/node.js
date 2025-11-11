const exceljs = require("exceljs");

const workbook = new exceljs.Workbook();
const peperoWorkBook = workbook.addWorksheet("빼빼로 과자 리스트");
peperoWorkBook.columns = [
  { header: "빼빼로 이름", key: "name" },
  { header: "맛", key: "flavor" },
  { header: "칼로리", key: "kcal" },
];

peperoWorkBook.addRow({ name: "누드", flavor: "부드러운 초코", kcal: "300" });
peperoWorkBook.addRow({ name: "오리지널", flavor: "뻑뻑한 초코", kcal: "200" });

workbook.xlsx.writeFile("pepero.xlsx");
