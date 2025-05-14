'use strict';
const productListMust = document.querySelector(".js_ul2")
const url = "https://fakestoreapi.com/products";

let productsList =[];



function paintProductsList(productsList , productListMust) {

productsList.forEach((products))
    if ( productList!= undefined) {
        productListMust.innerHTML += `<li>
        <img src="${products.image}" alt="${products.title}">  
        h4>${products.title}</h4> 
        <p>${products.price}</p>
    <button>"add to cart"</button>
        </li>`;
    }

}











fetch(url)
.then (response => response.json())
.then(data => {
    console.log(data);
    productsList = data.productsList;
    
paintProductsList(productsList, productListMust);

});