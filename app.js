let enter = document.getElementById("enter"); //輸入按鈕
let delBtn = document.querySelectorAll("tbody"); //刪除按鈕

//送出表單新增明細後加總 ENTER送出
window.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    console.log("enter is press");
    check();
    sum();
  }
});

//送出表單新增明細後加總 按鈕送出
enter.addEventListener("click", (e) => {
  e.preventDefault(); //清除預設行為
  e.stopPropagation(); //終止冒泡

  check(); //錯誤驗證（提示或新增）
  sum(); //計算加總
});

//刪除明細後加總
delBtn.forEach((e) => {
  e.addEventListener("click", (e) => {
    if (e.target.nodeName == "I") {
      console.log(e.target.parentNode.parentNode);
      e.target.parentNode.parentNode.remove();
    }
    sum();
  });
});

//錯誤驗證
function check() {
  let formCheck = document.forms[0].checkValidity();
  let form = document.querySelector("form");

  if (formCheck === false) {
    alert("資料有缺誤，再請確認");
  } else {
    creatList(); //建立新的明細表
    form.reset(); //清除表單資料
  }
}

//建立新的明細表
function creatList() {
  //建立表單元素
  let tbody = document.querySelector("tbody");
  let tr = document.createElement("tr");
  let className = [
    "ot-date",
    "ot-content",
    "ot-type",
    "ot-pl",
    "ot-amount",
    "ot-del",
  ];

  //資料抓取
  let inDate = document.getElementById("in-date");
  let inContent = document.getElementById("in-content");
  let inType = document.getElementById("in-type");
  let inPl = document.getElementById("in-pl");
  let inAmount = document.getElementById("in-amount");

  //資料儲存
  let data = [
    inDate.value,
    inContent.value,
    inType[inType.value].text,
    inPl[inPl.value].text,
    inAmount.value,
    "",
  ];

  //把資料並放進td，再把td放進tr
  for (let i = 0; i < 6; i++) {
    let td = document.createElement("td");
    td.classList.add(className[i]);
    let text = document.createTextNode(data[i]);

    if (i == 5) {
      let trashcan = document.createElement("i");
      trashcan.classList.add("fa-solid", "fa-trash-can");
      td.appendChild(trashcan);
    }

    td.appendChild(text);
    tr.appendChild(td);
  }

  //把tr放到hide之前
  tbody.insertBefore(tr, tbody.childNodes[tbody.childNodes.length - 2]);
}

//計算加總
function sum() {
  let tdSelec = document.querySelectorAll("td.ot-pl");
  let amountSelec = document.querySelectorAll("td.ot-amount");
  let incomeSum = 0;
  let expendiSum = 0;

  for (let i = 0; i < tdSelec.length; i++) {
    if (tdSelec[i].textContent === "收入") {
      incomeSum += Number(amountSelec[i].textContent);
    } else {
      expendiSum += Number(amountSelec[i].textContent);
    }
  }

  //選到目標表格
  let incomeTotal = document.getElementById("income");
  let expendiTotal = document.getElementById("expendi");
  let total = document.getElementById("total");

  incomeTotal.textContent = incomeSum;
  expendiTotal.textContent = expendiSum;
  total.textContent = incomeSum - expendiSum;
}
