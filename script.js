let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submitBtn = document.getElementById("btn-submit");

let mood = "create";
let temp;

/////////////////////////////////
//get total function
////////////////////////////////
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.style.backgroundColor = "#040";
    total.innerHTML = result;
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#720202";
  }
}

/////////////////////////////////
// Create Function
/////////////////////////////////

let productData;
if (localStorage.product != null) {
  productData = JSON.parse(localStorage.product);
} else {
  productData = [];
}
submitBtn.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newProduct.count <= 10000
  ) {
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          productData.push(newProduct);
        }
      } else {
        productData.push(newProduct);
      }
    } else {
      productData[temp] = newProduct;
      mood = "create";
      submitBtn.innerHTML = "Create";
      count.style.display = "block";
    }
    clearInputs();
  }

  localStorage.setItem("product", JSON.stringify(productData));
  showData();
};

/////////////////////////////////
//clear inputs
/////////////////////////////////

function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

/////////////////////////////////
// show data
/////////////////////////////////
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < productData.length; i++) {
    table += `  <tr>
    <td>${i + 1}</td>
    <td>${productData[i].title}</td>
    <td>${productData[i].price}</td>
    <td>${productData[i].taxes}</td>
    <td>${productData[i].ads}</td>
    <td>${productData[i].discount}</td>
    <td>${productData[i].total}</td>
    <td>${productData[i].category}</td>
    <td>
      <button id="update" onclick="makeUpdate(${i})">Update</button>
    </td>

    <td>
      <button id="delete" onclick="DeleteOneProduct(${i})">Delete</button>

    </td>
  </tr> `;
  }
  document.getElementById("tbody").innerHTML = table;

  let deleteAllBtn = document.getElementById("deleteall-btn");

  if (productData.length > 0) {
    deleteAllBtn.innerHTML = `<button onclick="DeleteAllProduct()"> Delete All (${productData.length})</button>`;
  } else {
    deleteAllBtn.innerHTML = "";
  }
}
showData();

/////////////////////////////////
// Delete One Product
/////////////////////////////////

function DeleteOneProduct(i) {
  productData.splice(i, 1);
  localStorage.product = JSON.stringify(productData);
  showData();
}

/////////////////////////////////
// Delete ALL Product
/////////////////////////////////

function DeleteAllProduct() {
  localStorage.clear();
  productData.splice(0);
  showData();
}

/////////////////////////////////
// Make Update
/////////////////////////////////
function makeUpdate(i) {
  title.value = productData[i].title;
  price.value = productData[i].price;
  taxes.value = productData[i].taxes;
  ads.value = productData[i].ads;
  discount.value = productData[i].discount;
  category.value = productData[i].category;

  getTotal();
  count.style.display = "none";
  submitBtn.innerHTML = "Update";
  mood = "update";
  temp = i;

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

/////////////////////////////////
// Make Search
/////////////////////////////////

let searchmood = "Title";

function SearchMode(id) {
  let search = document.getElementById("search");
  if (id == "btn-searchcategory") {
    searchmood = "Category";
  } else {
    searchmood = "Title";
  }
  search.placeholder = "Search by " + searchmood;
  search.focus();
  search.value = "";
  showData();
}

function MakeSearch(value) {
  let table = "";

  for (let i = 0; i < productData.length; i++) {
    if (searchmood == "Title") {
      if (productData[i].title.includes(value.toLowerCase())) {
        table += `  <tr>
        <td>${i}</td>
        <td>${productData[i].title}</td>
        <td>${productData[i].price}</td>
        <td>${productData[i].taxes}</td>
        <td>${productData[i].ads}</td>
        <td>${productData[i].discount}</td>
        <td>${productData[i].total}</td>
        <td>${productData[i].category}</td>
        <td>
          <button id="update" onclick="makeUpdate(${i})">Update</button>
        </td>
    
        <td>
          <button id="delete" onclick="DeleteOneProduct(${i})">Delete</button>
    
        </td>
      </tr> `;
      }
    } else {
      if (productData[i].category.includes(value.toLowerCase())) {
        table += `  <tr>
        <td>${i}</td>
        <td>${productData[i].title}</td>
        <td>${productData[i].price}</td>
        <td>${productData[i].taxes}</td>
        <td>${productData[i].ads}</td>
        <td>${productData[i].discount}</td>
        <td>${productData[i].total}</td>
        <td>${productData[i].category}</td>
        <td>
          <button id="update" onclick="makeUpdate(${i})">Update</button>
        </td>
    
        <td>
          <button id="delete" onclick="DeleteOneProduct(${i})">Delete</button>
    
        </td>
      </tr> `;
      }
    }

    document.getElementById("tbody").innerHTML = table;
  }
}

/////////////////////////////////
// Dark Mode
/////////////////////////////////
let body = document.getElementById("body");

let sunIcon = document.getElementById("sun-icon");

sunIcon.onclick = function () {
  body.classList.toggle("light");
  this.classList.toggle("fa-moon");
  body.style.transition = "0.8s";
};
