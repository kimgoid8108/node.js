const Excel = require("exceljs");
const Chance = require("chance");
const chance = new Chance();
const { Faker, ko } = require("@faker-js/faker");

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const makePerson = () => {
  const faker = new Faker({ locale: [ko] });
  const name = faker.person.fullName();
  const grade = chance.weighted(
    ["1", "2", "3", "4", "5", "6"],
    [30, 30, 20, 10, 5, 5]
  );
  const department_id = chance.weighted(
    ["marketing", "IT", "advertising", "design", "finance"],
    [50, 10, 20, 10, 10]
  );

  const position = chance.weighted(
    ["intern", "assistant", "manager", "header"],
    [10, 50, 30, 10]
  );

  return {
    name,
    gender,
    salary,
    departments,
    position,
  };
};

const generateExcel = async () => {
  const workbook = new Excel.Workbook();
  const sheet = workbook.addWorksheet("mzoffice");

  sheet.columns = [
    { header: "name", key: "name" },
    { header: "gender", key: "gender" },
    { header: "salary", key: "salary" },
    { header: "departments", key: "departments" },
    { header: "position", key: "position" },
  ];

  for (let i = 0; i < 3000; i++) {
    sheet.addRow(makePerson());
  }

  await workbook.csv.writeFile("mzoffice.csv");
};

generateExcel();
