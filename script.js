let mood = "create";
let tmp;
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("Count");
let search = document.getElementById("searchInp");
let Category = document.getElementById("Category");
let tbody = document.querySelector("tbody");
let createBtn = document.getElementById("createbtn");
let deleteAllBtn = document.getElementById("deleteAll");

let productContainer;

if (localStorage.getItem("product") != null) {
  productContainer = JSON.parse(localStorage.getItem("product"));
} else {
  productContainer = [];
}

addProducts();

function create() {
  let box = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    Category: Category.value,
  };
  if (title.value != "" && price.value != "" && Category.value != "" && count.value<10) {
    if (mood === "create") {
      if (box.count > 1) {
        for (let index = 0; index < box.count; index++) {
          productContainer.push(box);
        }
      } else {
        productContainer.push(box);
      }
    } else {
      productContainer[tmp] = box;
      mood = "create";
      count.disabled = false;
      count.style.opacity = "1";
      createBtn.innerHTML = "Create";
      createBtn.style = `background-color: #5f003a;
    outline: 1px solid #dd0a8c;`;
    }
    clear();
  }

  localStorage.setItem("product", JSON.stringify(productContainer));
  console.log(productContainer);
  addProducts();
}

createBtn.addEventListener("click", create);
function clear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  total.style.backgroundColor = "red";
  count.value = "";
  Category.value = "";
}
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "red";
  }
}
function addProducts() {
  let cartoona = ``;
  for (let i = 0; i < productContainer.length; i++) {
    cartoona += `<tr>
  <td>${i+1}</td>
  <td>${productContainer[i].title}</td>
  <td>${productContainer[i].price}</td>
  <td>${productContainer[i].taxes}</td>
  <td>${productContainer[i].ads}</td>
  <td>${productContainer[i].discount}</td>
  <td>${productContainer[i].total}</td>
  <td>${productContainer[i].Category}</td>
  <td><button onclick="updateProduct(${i})" id="update">UPDATE</button></td>
  <td><button onclick="deleteProduct(${i})" id="delete">DELETE</button></td>

</tr>
`;
  }
  tbody.innerHTML = cartoona;
  if (productContainer.length > 0) {
    deleteAllBtn.innerHTML = `<button onclick='deleteAll()' > Delete All (${productContainer.length}) </button>`;
  } else {
    deleteAllBtn.innerHTML = ``;
  }
}
function deleteProduct(i) {
  productContainer.splice(i, 1);
  localStorage.product = JSON.stringify(productContainer);
  addProducts();
}

function deleteAll() {
  localStorage.removeItem("product");
  productContainer = [];
  addProducts();
}
function updateProduct(i) {
  title.value = productContainer[i].title;
  price.value = productContainer[i].price;
  taxes.value = productContainer[i].taxes;
  ads.value = productContainer[i].ads;
  discount.value = productContainer[i].discount;
  getTotal();
  Category.value = productContainer[i].Category;
  count.disabled = true;
  count.style.opacity = "0.5";
  createBtn.innerHTML = "Update";
  createBtn.style = `   background-color: rgb(4, 123, 4);
  outline: 2px solid #3aff08;`;
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// let searchMood=''
function searchMoodfun(val) {
  if (search.value !== "") {
    if (val === "searchTitle") {
      searchByTitle();
    } else if (val === "searchCategory") {
      searchByCategory();
    }
  } else {
    addProducts();
  }
}

function searchByTitle() {
  let cartoona = "";
  for (let i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].title
        .toLowerCase()
        .includes(search.value.toLowerCase())
    ) {
      cartoona += `<tr>
          <td>${i}</td>
          <td>${productContainer[i].title}</td>
          <td>${productContainer[i].price}</td>
          <td>${productContainer[i].taxes}</td>
          <td>${productContainer[i].ads}</td>
          <td>${productContainer[i].discount}</td>
          <td>${productContainer[i].total}</td>
          <td>${productContainer[i].Category}</td>
          <td><button onclick="updateProduct(${i})" id="update">UPDATE</button></td>
          <td><button onclick="deleteProduct(${i})" id="delete">DELETE</button></td>
  
        </tr>
        `;
    }
  }

  tbody.innerHTML = cartoona;
}
function searchByCategory() {
  let cartoona = "";
  for (let i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].Category.toLowerCase().includes(
        search.value.toLowerCase()
      )
    ) {
      cartoona += `<tr>
          <td>${i}</td>
          <td>${productContainer[i].title}</td>
          <td>${productContainer[i].price}</td>
          <td>${productContainer[i].taxes}</td>
          <td>${productContainer[i].ads}</td>
          <td>${productContainer[i].discount}</td>
          <td>${productContainer[i].total}</td>
          <td>${productContainer[i].Category}</td>
          <td><button onclick="updateProduct(${i})" id="update">UPDATE</button></td>
          <td><button onclick="deleteProduct(${i})" id="delete">DELETE</button></td>
  
        </tr>
        `;
    }
  }
  tbody.innerHTML = cartoona;
}
