const Excel = require("exceljs");

const { Faker, ko } = require("@faker-js/faker");
const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const makePerson = () => {
  const region = ["tokyo", "osaka", "fukuoka", "saporo"];
  const airport = ["incheon", "gimpo", "busan", "jeju"];
  const Purpose = ["tourism", "business", "other"];

  const randomName = new Faker({ locale: [ko] }).person.fullName();
  const age = getRandomInteger(0, 80);
  const purpose = Purpose[getRandomInteger(0, Purpose.length - 1)];
  const depature = airport[getRandomInteger(0, airport.length - 1)];
  const destination = region[getRandomInteger(0, region.length - 1)];
  const periodOfStay = getRandomInteger(1, 90);
  return {
    name: randomName,
    age: age,
    purpose: purpose,
    depature: depature,
    destination: destination,
    periodOfStay: periodOfStay,
  };
};

const generateExcel = async () => {
  const workbook = new Excel.Workbook();
  const sheet = workbook.addWorksheet("students");

  sheet.columns = [
    { header: "Name", key: "name" },
    { header: "Age", key: "age" },
    { header: "Purpose", key: "purpose" },
    { header: "Depature", key: "depature" },
    { header: "Destination", key: "destination" },
    { header: "PeriodOfStay", key: "periodOfStay" },
  ];

  for (let i = 0; i < 10000000; i++) {
    sheet.addRow(makePerson());
  }
  await workbook.csv.writeFile("japan.csv");
};

generateExcel();
