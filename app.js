let inputInPrice = document.querySelectorAll('.price input');
let allInputs = document.querySelectorAll('.inputs input');
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let tbody = document.getElementById('tbody');
let delbtn = document.getElementById('del-all');
let serch = document.getElementById('search');
// let searchtitle = document.getElementById('searchtitle');
// let searchCategory = document.getElementById('searchCategory');
let btnSearch = document.querySelectorAll('.btnSearch button');
// console.log(btnSearch)
let mood = 'create';
let temp;
let searchingMood = 'title';


function getTotal() {
     if (price.value !== '') {
          let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
          total.innerHTML = `${result}`;
          total.style.backgroundColor = "#1234567";
     }
     else {
          total.innerHTML = `0`;
          total.style.backgroundColor = "red";
     }

}

inputInPrice.forEach(input => {
     input.addEventListener("keyup", () => {
          getTotal();
     });
});

// window.localStorage.removeItem('product');
let dataPro = [];
if (localStorage.getItem('product') != null) {
     dataPro = JSON.parse(localStorage.getItem('product'));
}
submit.onclick = function () {
     let product = {
          title: title.value.toLowerCase(),
          price: price.value,
          taxes: taxes.value,
          ads: ads.value,
          discount: discount.value,
          count: count.value,
          total: total.innerHTML,
          category: category.value.toLowerCase(),
     }
     if (title.value != '' && price.value != '' && category.value != '' && product.count < 100) {
          if (mood === 'create') {
               if (product.count > 1) {
                    for (let i = 0; i < product.count; i++) {
                         dataPro.push(product);
                    }
               }
               else {
                    dataPro.push(product);
               }
          }
          else {
               dataPro[temp] = product;
               mood = 'create';
               submit.innerHTML = "Create";
               count.style.display = 'block';
          }
          clearData();
     }

     saveDataInLocalStg(dataPro);
     // clearData();
     showDataInPage();
}

function saveDataInLocalStg(dataPro) {
     // i want to save the data in the local storage but the local storage does not allow arrays its allow string then i will array ===> JSON file
     localStorage.setItem('product', JSON.stringify(dataPro));
}

function clearData() {
     allInputs.forEach(input => {
          input.value = '';
     });
     total.innerHTML = '';
}

function showDataInPage() {
     let table = '';
     for (let i = 0; i < dataPro.length; i++) {
          table += `<tr>
                              <td>${i + 1}</td>
                              <td>${dataPro[i].title}</td>
                              <td>${dataPro[i].price}</td>
                              <td>${dataPro[i].taxes}</td>
                              <td>${dataPro[i].ads}</td>
                              <td>${dataPro[i].discount}</td>
                              <td>${dataPro[i].total}</td>
                              <td>${dataPro[i].category}</td>
                              <td><button onclick="updataData(${i})" id="update">Update</button></td>
                              <td><button onclick="dalateItem(${i})" id="delete">Delete</button></td>
                         </tr>`;
     }
     tbody.innerHTML = table;
     if (dataPro.length > 0) {
          delbtn.innerHTML = `<button onclick="dalateAll()">Delete All (${dataPro.length})</button>`
     }
     else {
          delbtn.innerHTML = '';
     }
     getTotal();
}
showDataInPage();

function dalateItem(i) {
     dataPro.splice(i, 1);
     saveDataInLocalStg(dataPro);
     showDataInPage();
}

function dalateAll() {
     // tbody.innerHTML = '';
     dataPro.splice(0);
     showDataInPage();
     window.localStorage.removeItem('product');
}
function updataData(i) {
     title.value = dataPro[i].title
     price.value = dataPro[i].price
     taxes.value = dataPro[i].taxes
     discount.value = dataPro[i].discount
     category.value = dataPro[i].category
     count.style.display = 'none';
     submit.innerHTML = 'Update';
     getTotal();
     mood = 'update';
     temp = i;
     scroll({
          top: 0,
          behavior: "smooth"
     })
}

btnSearch.forEach(btn => {
     btn.addEventListener('click', (event) => {
          getserachingMood(event.target.id);
     })
});

function getserachingMood(id) {
     if (id === 'searchtitle') {
          searchingMood = 'title';
     }
     else {
          searchingMood = 'category';
     }
     serch.placeholder = `Search By ${searchingMood}`;
     serch.focus();
     serch.value = '';
     showDataInPage();
}

serch.addEventListener("keyup", (e) => {
     searching(e.target.value);
});

function searching(value) {
     let table = '';
     for (let i = 0; i < dataPro.length; i++) {
          if (searchingMood === 'title') {
               if (dataPro[i].title.includes(value.toLowerCase())) {
                    table += `<tr>
                              <td>${i}</td>
                              <td>${dataPro[i].title}</td>
                              <td>${dataPro[i].price}</td>
                              <td>${dataPro[i].taxes}</td>
                              <td>${dataPro[i].ads}</td>
                              <td>${dataPro[i].discount}</td>
                              <td>${dataPro[i].total}</td>
                              <td>${dataPro[i].category}</td>
                              <td><button onclick="updataData(${i})" id="update">Update</button></td>
                              <td><button onclick="dalateItem(${i})" id="delete">Delete</button></td>
                         </tr>`;
               }
          } else {
               if (dataPro[i].category.includes(value.toLowerCase())) {
                    table += `<tr>
                              <td>${i}</td>
                              <td>${dataPro[i].title}</td>
                              <td>${dataPro[i].price}</td>
                              <td>${dataPro[i].taxes}</td>
                              <td>${dataPro[i].ads}</td>
                              <td>${dataPro[i].discount}</td>
                              <td>${dataPro[i].total}</td>
                              <td>${dataPro[i].category}</td>
                              <td><button onclick="updataData(${i})" id="update">Update</button></td>
                              <td><button onclick="dalateItem(${i})" id="delete">Delete</button></td>
                         </tr>`;
               }
          }
     }
     tbody.innerHTML = table;
}