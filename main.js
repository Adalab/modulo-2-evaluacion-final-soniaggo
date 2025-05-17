// 'use strict';
// const productListMust = document.querySelector(".js_ul2");
// const productListAddCard = document.querySelector(".js_ul1")
// const buttonSearch = document.querySelector(".js_buttonsearch");
// const inputSearch = document.querySelector(".js_searchinput");

// const url = "https://fakestoreapi.com/products";

// let productsList =[];
// let productscard =[];






// function renderProductsList(productsList , productListMust) {



// for( let product of productsList){
//     let id = product.id;
//     const li = document.createElement("li");
//     li.classList.add("card");
//     li.innerHTML = `
//      <img src="${product.image}" alt="${product.title}">
//      <h4>${product.title}</h4>
//      <p>Price: $${product.price}</p>
//     <button class="js_buttonAdd button-card" id="${product.id}">Comprar</button>

//    `;
//     productListMust.appendChild(li)
  
   
// }

// };







// function renderCart() {
//   productListAddCard.innerHTML = "";

//   for (let i = 0; i < productscard.length; i++) {
//     const product = productscard[i];
//     const li = document.createElement("li");
//     li.classList.add("card", "add");
//     li.innerHTML = `
//       <img src="${product.image}" alt="${product.title}">
//       <h4>${product.title}</h4>
//       <p>Price: $${product.price}</p>
//     `;
//     productListAddCard.appendChild(li);
//   }
// }


// function handleclicksearch(event){
// event.preventDefault();
// let searchValue = inputSearch.value.toLowerCase();
// let filteredProducts = productsList.filter(product => {
//     return product.title.toLowerCase().includes(searchValue);
   
//     } );
//     productListMust.innerHTML='';
//   renderProductsList(filteredProducts,productListMust);
  
  

// };

// function handleCardClick(event) {
//   if (event.target.classList.contains("js_buttonAdd")) {
//     const clickedId = parseInt(event.target.id);
//     let found = false;

//     // Comprobar si el producto ya está en el carrito
//     for (let i = 0; i < productscard.length; i++) {
//       if (productscard[i].id === clickedId) {
//         // Si ya está, lo quitamos
//         productscard.splice(i, 1);
//         found = true;
//         break;
//       }
//     }

//     // Si no estaba, lo buscamos en la lista de productos y lo añadimos
//     if (!found) {
//       for (let i = 0; i < productsList.length; i++) {
//         if (productsList[i].id === clickedId) {
//           productscard.push(productsList[i]);
//           break;
//         }
//       }
//     }

//     renderCart(); // Volvemos a pintar el carrito
//   }
// }






// fetch(url)
// .then (response => response.json())
// .then(data => {
//     console.log(data);
//     productsList = data;
  
// renderProductsList(productsList,productListMust);

//     });


// buttonSearch.addEventListener("click" ,handleclicksearch);
// productListMust.addEventListener("click", handleCardClick);

"use strict";

// Variables globales
const productListMust = document.querySelector(".js_ul2");
const productListAddCard = document.querySelector(".js_ul1");
const buttonSearch = document.querySelector(".js_buttonsearch");
const inputSearch = document.querySelector(".js_searchinput");

const url = "https://fakestoreapi.com/products";

let productsList = [];
let productscard = []; // Aquí se almacenarán los productos del carrito

// Función para renderizar los productos filtrados en la lista principal (derecha)
function renderProductsList(productsList, productListMust) {
  productListMust.innerHTML = ""; // Limpiar la lista de productos antes de renderizar

  for (let product of productsList) {
    const li = document.createElement("li");
    li.classList.add("card");
    li.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h4>${product.title}</h4>
      <p>Price: $${product.price}</p>
      <button class="js_buttonAdd button-card" id="add-${product.id}">Comprar</button>
    `;
    productListMust.appendChild(li);
  }
}

// Función para renderizar el carrito con los productos añadidos
function renderCart() {
  productListAddCard.innerHTML = ""; // Limpiar el carrito antes de renderizar

  for (let product of productscard) {
    const li = document.createElement("li");
    li.classList.add("card", "add");
    li.innerHTML = `
      <img src="${product.image}">
      <h4>${product.title}</h4>
      <p>Price: $${product.price}</p>
      <button class="js_buttonRemove button-card" id="remove-${product.id}">Eliminar</button>
    `;
    productListAddCard.appendChild(li);
  }
}

// Función para manejar el clic en los botones de "Comprar" y "Eliminar"
function handleCardClick(event) {
  const productId = event.target.id.split('-')[1]; // Obtener solo el ID (sin "add-" o "remove-")
  const clickedProduct = productsList.find(product => product.id === parseInt(productId));

  // Si el clic es en un botón de "Comprar"
  if (event.target.classList.contains("js_buttonAdd") && clickedProduct) {
    // Verificar si el producto ya está en el carrito
    if (!productscard.some(product => product.id === clickedProduct.id)) {
      productscard.push(clickedProduct); // Añadir al carrito
      renderCart(); // Actualizar la vista del carrito
    }
  }

  // Si el clic es en un botón de "Eliminar" en el carrito
  if (event.target.classList.contains("js_buttonRemove") && clickedProduct) {
    productscard = productscard.filter(product => product.id !== clickedProduct.id); // Eliminar del carrito
    renderCart(); // Actualizar la vista del carrito
  }
}

// Función para manejar la búsqueda de productos
function handleclicksearch(event) {
  event.preventDefault();
  let searchValue = inputSearch.value.toLowerCase();
  let filteredProducts = productsList.filter(product => {
    return product.title.toLowerCase().includes(searchValue);
  });
  renderProductsList(filteredProducts, productListMust);
}

// Obtener los productos de la API
fetch(url)
  .then(response => response.json())
  .then(data => {
    productsList = data;
    renderProductsList(productsList, productListMust);
  });

// Añadir el evento de clic en el contenedor de productos para manejar el botón de "Comprar" y "Eliminar"
productListMust.addEventListener("click", handleCardClick);
productListAddCard.addEventListener("click", handleCardClick);

// Añadir el evento de búsqueda
buttonSearch.addEventListener("click", handleclicksearch);

