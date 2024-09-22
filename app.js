let B_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies/";

let select = document.querySelectorAll(".selects select");
let btn = document.querySelector("button");
let msg = document.querySelector(".msg");
let fromC = document.querySelector(".from select");
let toC = document.querySelector(".to select");

for (let options of select) {
  for (let code in country) {
    let newoption = document.createElement("option");
    newoption.innerHTML = code;
    newoption.value = code;
    if (options.name == "From" && code == "USD") {
      newoption.selected = "selected";
    }
    if (options.name == "to" && code == "NPR") {
      newoption.selected = "selected";
    }
    options.append(newoption);
  }
  options.addEventListener("change", (val) => {
    updateFlag(val.target);
  });
}

const updateFlag = (val) => {
  console.log(val.value);
  let countryCode = country[val.value];
  console.log(countryCode);
  let src = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = val.parentElement.querySelector("img");
  img.src = src;
}

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateMsg();
});

window.addEventListener("load", () => {
  updateMsg();
});

const updateMsg = async () => {
  let input = document.querySelector(".form input");
  console.log(input.value);
  if (input.value === "" || input.value <= 0) {
    input.value = 1;
  }
  let toCode = toC.value.toLowerCase();
  let fromCode = fromC.value.toLowerCase();
  URL = `${B_URL}${fromCode}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let Data = data[fromCode];
  console.log(Data[toCode]);
  let amount = Data[toCode] * input.value;
  console.log(amount);
  msg.innerHTML = `${input.value} ${fromC.value} = ${amount} ${toC.value}`;
}



