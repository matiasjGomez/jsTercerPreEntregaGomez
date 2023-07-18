


//side cart opening and closing utility
const openBtn = document.getElementById('open_cart_btn');
const cart = document.getElementById('sidecart');
const closeBtn = document.getElementById('close_btn');
const backdrop = document.querySelector('.backdrop');

//open and close events

openBtn.addEventListener('click', openCart);
closeBtn.addEventListener('click', closeCart);
backdrop.addEventListener('click', closeCart);


//open cart
function openCart() {
  cart.classList.add('open');
  backdrop.style.display = 'block'

//backdrop animation
  setTimeout(() => {
    backdrop.classList.add('show')
  }, 0);
}

//close cart
function closeCart() {
    cart.classList.remove('open');
    backdrop.classList.remove('show')

    setTimeout(() => {
        backdrop.style.display = 'none'
    }, 500);
  }




// simulation for data base. here will be renderized all the products of our e-commerce
class dataBase{
  constructor(){
    this.products = [];

  }

  //it returns the array with all the "products" of our database
  async bringRegister() {
    const response = await fetch("../json/products.json");
    this.products = await response.json();
    return this.products;
  }
  //looks for our product by their id, if finds it, it returs as an object
  registerById(id){
    return this.products.find((product) => product.id == id);
  }

  //looks for our product by their name
  registerByName(browse) {
    return this.products.filter((product) => product.name.toLowerCase().includes(browse));
  }

  //shows products by their category
  registerByCategory(category) {
    return this.products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
  }
  

}

//mold class for cart
class Carrito{
  constructor(){
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
    this.carrito = carritoStorage || [];
    this.total = 0;
    this.totalProducts = 0;
    this.listar();
  }

  estaEnCarrito({ id }){
    return this.carrito.find(product => product.id === id);
  }

  agregar(product){
    let productoEnCarrito = this.estaEnCarrito(product);
    //if the product is already in our cart, it adds one more product of the same type
    if (productoEnCarrito){
      productoEnCarrito.cantidad++;
      console.log(productoEnCarrito);
    } else {
      //if not we add the first product of this type
      this.carrito.push({...product, cantidad: 1});
    }
    localStorage.setItem("carrito", JSON.stringify(this.carrito))
    this.listar();
  }

  remove(id){
    const index = this.carrito.findIndex((product) => product.id === id);
    //if product quantity is higher than 1, we add another product of the same type
    if (this.carrito[index].cantidad > 1){
      this.carrito[index].cantidad--
    } else {//if not, we delete the item from cart
      this.carrito.splice(index, 1);
    }
    localStorage.setItem("carrito", JSON.stringify(this.carrito));

     this.listar();
  }

  listar() {
    this.total = 0;
    this.totalProducts = 0;
    divCarrito.innerHTML = "";
    for (const product of this.carrito){
      divCarrito.innerHTML += `
        <div class="cart_item">
        <div class="itemds">
          <div class="item_img cartItemImg">
            <img src="img/${product.image}"
          </div>
          <div class="item_details">
            <p>${product.name}</p>
            <strong>$${product.price}</strong>
            <div class="qty">
              <strong>Cantidad: ${product.cantidad}</strong>
              <a href="#" data-id ="${product.id} "class="removeProduct btn">Quitar del carrito</a>
            </div>
            </div>
          </div>
        </div>
      `;
      this.total += (product.price * product.cantidad)
      this.totalProducts += product.cantidad
    }
    //remove buttons
    const removeBtns = document.querySelectorAll(".removeProduct");
    for (const button of removeBtns){
      button.addEventListener("click", (event) => {
        event.preventDefault();
        this.remove(Number(button.dataset.id));
      });
    }
    spancantidadProductos.innerText = this.totalProducts;
    totalCarrito.innerText = this.total;
  }
}

//mold class for products
class Product {
  constructor(id, name, description, category, image, price) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.image = image;
    this.price = price;
  }
}

//database instance
const db = new dataBase();

//elements bond
const divProducts = document.querySelector("#products");
const divCarrito = document.querySelector("#cart_items");
const spancantidadProductos = document.querySelector("#cantidadProductos");
const totalCarrito = document.querySelector("#subtotal_price");
const searchbar = document.querySelector("#searchbar");
const searching = document.querySelector("#searching");
const botonesCategorias= document.querySelectorAll(".dropdown-item");

botonesCategorias.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const productsByCategory = db.registerByCategory(button.innerText);
    renderProducts(productsByCategory);
  })
});

//call to render products
db.bringRegister().then((products) => renderProducts(products));

//shows database register on our HTML
function renderProducts(products){

  divProducts.innerHTML = "";
  
  for (const product of products) {
    divProducts.innerHTML += `
    <div class="container py-3 conTypo containCards">
      <div class="row">
        <div>
          <div id="product" class="card mb-4 item">
            <img src="img/${product.image}" class="card-img-top" alt="totk">
            <div class="card-body">
              <h5 class="card-title">${product.name} <span class="badge bg-secondary">HOT</span></h5>
              <p class="card-text">
                ${product.description}
              </p>
              <h6 class="card-price">$${product.price}</h6>
              <a href="#" class="btn btnAdd" data-id="${product.id}">Agregar al carrito</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  //buttons for "agregar al carrito"
  const btnAdd = document.querySelectorAll(".btnAdd");
  for (const button of btnAdd){
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const id = (button.dataset.id)
      const product = db.registerById(id);
      //console.log("estas agregando " + product.name);
      carrito.agregar(product);
    });
  }
}

//search events

searchbar.addEventListener("submit", (event)=> {
  event.preventDefault();
  const browse = searching.value;
  renderProducts(db.registerByName(browse.toLowerCase()));
});

searching.addEventListener("keyup", (event)=> {
  event.preventDefault();
  const browse = searching.value;
  renderProducts(db.registerByName(browse.toLowerCase()));
});


//object for our cart
const carrito = new Carrito();