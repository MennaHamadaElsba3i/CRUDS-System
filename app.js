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
          title: title.value,
          price: price.value,
          taxes: taxes.value,
          ads: ads.value,
          discount: discount.value,
          count: count.value,
          total: total.innerHTML,
          category: category.value,
     }
     if (product.count > 1) {
          for (let i = 0; i < product.count; i++) {
               dataPro.push(product);
          }
     }
     else {
          dataPro.push(product);
     }
     saveDataInLocalStg(dataPro);
     clearData();
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
                              <td>${i}</td>
                              <td>${dataPro[i].title}</td>
                              <td>${dataPro[i].price}</td>
                              <td>${dataPro[i].taxes}</td>
                              <td>${dataPro[i].ads}</td>
                              <td>${dataPro[i].discount}</td>
                              <td>${dataPro[i].total}</td>
                              <td>${dataPro[i].category}</td>
                              <td><button id="update">Update</button></td>
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