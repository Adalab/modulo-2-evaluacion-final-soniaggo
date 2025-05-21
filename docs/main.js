
"use strict";

// Variables globales
const productListMust = document.querySelector(".js_ul2");
const productListAddCart = document.querySelector(".js_ul1");
const buttonSearch = document.querySelector(".js_buttonsearch");
const inputSearch = document.querySelector(".js_searchinput");

const url = "https://fakestoreapi.com/products";

let productsList = [];
let productscart = []; // Aquí se almacenarán los productos del carrito

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
  productListAddCart.innerHTML = ""; // Limpiar el carrito antes de renderizar

  for (let product of productscart) {
    const li = document.createElement("li");
    li.classList.add("card", "add");
    li.innerHTML = `
     
      <img src="${product.image}">
      <h4>${product.title}</h4>
      <p>Price: $${product.price}</p>
      <button class="js_buttonRemove button-card" id="remove-${product.id}">ELIMINAR</button>
    `;
    productListAddCart.appendChild(li);
    localStorage.setItem("productsListcart", JSON.stringify(productscart));

  }
if (productscart.length > 0) {
  const li = document.createElement("li");
  li.innerHTML = `<button class="js_buttonClearAll button-empty">Vaciar carrito</button>`;
  productListAddCart.appendChild(li);
}

}


// Función para manejar el clic en los botones de "Comprar" y "Eliminar"
function handleCardClick(event) {
  const productId = event.target.id.split('-')[1]; // Obtener solo el ID (sin "add-" o "remove-")
  const clickedProduct = productsList.find(product => product.id === parseInt(productId));

  // Si el clic es en un botón de "Comprar"
  if (event.target.classList.contains("js_buttonAdd") && clickedProduct) {
    // Verificar si el producto ya está en el carrito
    if (!productscart.some(product => product.id === clickedProduct.id)) {
      productscart.push(clickedProduct); // Añadir al carrito
      renderCart(); // Actualizar la vista del carrito
    }
  }

  // Si el clic es en un botón de "Eliminar" en el carrito
  if (event.target.classList.contains("js_buttonRemove") && clickedProduct) {
    productscart = productscart.filter(product => product.id !== clickedProduct.id); // Eliminar del carrito
    renderCart(); // Actualizar la vista del carrito
  }
  if (event.target.classList.contains("js_buttonClearAll")) {
  productscart = [];
  renderCart();
  localStorage.setItem("productsListcart", JSON.stringify(productscart));
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
// recupera el carrito desde localStorage si habia elementos guardados en el
const storedCart = localStorage.getItem("productsListcart");
if (storedCart) {
  productscart = JSON.parse(storedCart);
  renderCart();
}

// Obtener los productos de la API
fetch(url)
  .then(response => response.json())
  .then(data => {
    productsList = data;
    renderProductsList(productsList, productListMust);
    localStorage.setItem("productsList", JSON.stringify(productsList));
    localStorage.setItem("productsListcart", JSON.stringify(productscart));
    console.log(localStorage)
  });



productListMust.addEventListener("click", handleCardClick);
productListAddCart.addEventListener("click", handleCardClick);
buttonSearch.addEventListener("click", handleclicksearch);

