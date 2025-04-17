const api =
  "https://v6.exchangerate-api.com/v6/ddfd002ceda812144e0613b5/latest/USD";
const apiCopy =
  "https://v6.exchangerate-api.com/v6/ddfd002ceda812144e0613b5/latest/";

document.addEventListener("DOMContentLoaded", () => {
  createOptions();
});
let btn = document.querySelector("button");
btn.addEventListener("click", () => {
  convertCurrency();
});

async function createOptions() {
  try {
    const response = await fetch(api);
    const data = await response.json();
    const codes = Object.keys(data.conversion_rates);

    const list1 = document.querySelector("#currency-list-1");
    const list2 = document.querySelector("#currency-list-2");

    list1.innerHTML = "";
    list2.innerHTML = "";

    codes.forEach((code) => {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");

      option1.value = option2.value = code;

      list1.appendChild(option1);
      list2.appendChild(option2);
    });
  } catch (error) {
    console.error("API ISSUE", error);
  }
}

async function convertCurrency(params) {
  let from = document.querySelector("#currency1").value;
  let to = document.querySelector("#currency2").value;
  let amount = document.querySelector("#amount").value;
  let result = document.querySelector("#result");

  if (!from || !to || isNaN(amount)) {
    alert("please enter valid currency code and number");
  }
  try {
    let response = await fetch(apiCopy + from);
    let data = await response.json();
    let rate = data.conversion_rates[to];
    let ConvertedAmount = (amount * rate).toFixed(2);
    result.value = ConvertedAmount;
  } catch {
    console.log("Conversion error", error);
  }
}
