const name = document.querySelector("#name");
const ingredient = document.querySelector("#ingredient");
const kcal = document.querySelector("#kcal");
const button = document.querySelector("#button");

button.addEventListener("click", async () => {
  const nameValue = name.value;
  const ingValue = ingredient.value.split(",");
  const kcalValue = kcal.value;

  const result = await fetch("http://localhost:3000/pizza", {
    method: "post",
    body: JSON.stringify({
      name: nameValue,
      ingredients: ingValue,
      kcal: kcalValue,
    }),
    headers: {
      "content-Type": "application/json",
    },
  });

  await result.json();
  menu.innerHTML = "";
  getPizza();
});

const menu = document.querySelector("#menu");

const getPizza = async () => {
  const res = await fetch("http://localhost:3000/pizza");
  const data = await res.json();
  data.forEach((v) => {
    const div = document.createElement("div");
    div.innerText = v.name;
    menu.appendChild(div);
  });
};

getPizza();
