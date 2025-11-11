const icecreams = [
  { name: "마법사의 레시피", kcal: 250, flavor: ["mint", "choco"] },
  { name: "레인보우 샤벳트", kcal: 220, flavor: ["fruit", "shabet"] },
  { name: "엄마는 외계인", kcal: 300, flavor: ["choco", "cookie"] },
  {
    name: "사랑에 빠진 딸기",
    kcal: 270,
    flavor: ["strawberry", "chesse", "choco"],
  },
];

module.exports = { icecreams };

// / - 베라베라 맛있는 베라 어서오고
// /menu - 아이스크림 리스트
// /menu?underkcal=300 - 300보다 작은 kcal의 아이스크림 리스트
// /menu?flavor=mint - mint를 포함한 아이스크림 리스트

// /menu/1 - 아이스크림 리스트
