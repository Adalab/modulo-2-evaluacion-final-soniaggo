
"use strict";

// Variables globales
const productListMust = document.querySelector(".js_ul2");
const productListAddCard = document.querySelector(".js_ul1");
const buttonSearch = document.querySelector(".js_buttonsearch");
const inputSearch = document.querySelector(".js_searchinput");

const url = "https://fakestoreapi.com/products";

let productsList = [];
let productscard = []; // Aquí se almacenarán los productos del carrito

// Función para pintar los productos filtrados en la lista principal (derecha)
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

// Función para pintar el carrito con los productos añadidos
function renderCart() {
  productListAddCard.innerHTML = ""; // Limpiar el carrito antes de renderizar

  for (let product of productscard) {
    const li = document.createElement("li");
    li.classList.add("card", "add");
    li.innerHTML = `
     
      <img src="${product.image}">
      <h4>${product.title}</h4>
      <p>Price: $${product.price}</p>
      <button class="js_buttonRemove button-card" id="remove-${product.id}">ELIMINAR</button>
    `;
    productListAddCard.appendChild(li);
    localStorage.setItem("productsListcart", JSON.stringify(productscard));

  }
if (productscard.length > 0) {
  const li = document.createElement("li");
  li.innerHTML = `<button class="js_buttonClearAll button-empty">Vaciar carrito</button>`;
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
  if (event.target.classList.contains("js_buttonClearAll")) {
  productscard = [];
  renderCart();
  localStorage.setItem("productsListcart", JSON.stringify(productscard));
}

}

// Función para manejar la búsqueda de productos
function handleclicksearch(event) {
  event.preventDefault();
  let searchValue = inputSearch.value.toLowerCase();

  // Si el input está vacío, mostrar todos los productos
if (searchValue === "") {
    
    renderProductsList(productsList, productListMust);
    return;
  }


  let filteredProducts = productsList.filter(product => {
    return product.title.toLowerCase().includes(searchValue);
  });
  renderProductsList(filteredProducts, productListMust);
}

const storedCart = localStorage.getItem("productsListcart");
if (storedCart) {
  productscard = JSON.parse(storedCart);
  renderCart();
}

// Obtener los productos de la API
fetch(url)
  .then(response => response.json())
  .then(data => {
    productsList = data;
    renderProductsList(productsList, productListMust);
    localStorage.setItem("productsList", JSON.stringify(productsList));
    localStorage.setItem("productsListcart", JSON.stringify(productscard));
    console.log(localStorage)
  });



productListMust.addEventListener("click", handleCardClick);
productListAddCard.addEventListener("click", handleCardClick);
buttonSearch.addEventListener("click", handleclicksearch);

