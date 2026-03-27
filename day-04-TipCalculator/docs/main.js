const tipBtns = document.querySelectorAll(".tip-btn");
const custom = document.getElementById("custom");
const bill = document.getElementById("bill");
const people = document.getElementById("people");
const calculate = document.getElementById("calculate");
const reset = document.getElementById("reset");
let tipValue = 0;
tipBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tipBtns.forEach((b) => b.classList.remove("clicked"));
    btn.classList.add("clicked");
    if (btn.dataset.tip !== "custom") {
      custom.classList.add("hidecustom");
      tipValue = parseFloat(btn.dataset.tip);
    } else {
      custom.classList.remove("hidecustom");
      tipValue = 0;
    }
  });
});
calculate.addEventListener("click", () => {
  const billValue = parseFloat(bill.value);
  const peopleNo = parseInt(people.value);
  if (!custom.classList.contains("hidecustom")) {
    tipValue = parseFloat(custom.value);
  }
  const tipAmount = (billValue * (tipValue / 100)) / peopleNo;
  const totalPerPerson = billValue / peopleNo + tipAmount;
  const totalBill = billValue * (1 + tipValue / 100);

  if (!isNaN(billValue) && peopleNo > 0 && billValue > 0 && tipValue > 0) {
    document.getElementById("tip-per-person").textContent =
      `$ ${tipAmount.toFixed(2)}`;
    document.getElementById("total-per-person").textContent =
      `$ ${totalPerPerson.toFixed(2)}`;
    document.getElementById("total-bill").textContent =
      `$ ${totalBill.toFixed(2)}`;
  }
});
reset.addEventListener("click", () => {
  tipBtns.forEach((b) => b.classList.remove("clicked"));
  if (!custom.classList.contains("hidecustom")) {
    custom.classList.add("hidecustom");
    custom.value = "";
  }
  bill.value = "";
  people.value = "";
  document.getElementById("tip-per-person").textContent = "$0";
  document.getElementById("total-per-person").textContent = "$0";
  document.getElementById("total-bill").textContent = "$0";
});
