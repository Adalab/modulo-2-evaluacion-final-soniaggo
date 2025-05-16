'use strict';
const productListMust = document.querySelector(".js_ul2");
const productListAddCard = document.querySelector(".js_ul1")
const buttonSearch = document.querySelector(".js_buttonsearch");
const inputSearch = document.querySelector(".js_searchinput");

const url = "https://fakestoreapi.com/products";

let productsList =[];
let productscard =[];



function renderProductsList(productsList , productListMust) {

for( let product of productsList){
   const productId = product.id;
    const li = document.createElement("li");
    li.classList.add("card");
    li.innerHTML = `
     <img src="${product.image}" alt="${product.title}">
     <h4>${product.title}</h4>
     <p>Price: $${product.price}</p>
     <button class=" js_buttonAdd button-card" data-product-id="${productId}">Add to Card</button>
   `;
    productListMust.appendChild(li);

}


};
const buttonAdd = document.querySelectorAll(".js_buttonAdd");

function rendercard (product, productListAddCard){
     const li = document.createElement("li");
    li.classList.add("card");
    li.classList.add("add");
    li.innerHTML = `
     <img src="${product.image}" alt="${product.title}">
     <h4>${product.title}</h4>
     <p>Price: $${product.price}</p>
     <button class=" js_buttonAdd button-card" data-product-id="${product.id}">remove</button>
   `;
    productListAddCard.appendChild(li);

}

function handleclicksearch(event){
event.preventDefault();
let searchValue = inputSearch.value.toLowerCase();
let filteredProducts = productsList.filter(product => {
    return product.title.toLowerCase().includes(searchValue);
   
    } );
    productListMust.innerHTML='';
  renderProductsList(filteredProducts,productListMust);
  


};







fetch(url)
.then (response => response.json())
.then(data => {
    console.log(data);
    productsList = data;
  
renderProductsList(productsList,productListMust);
rendercard(productscard,productListMust);



    });


buttonSearch.addEventListener("click" ,handleclicksearch);
