


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

    this.addRegister(1, "Legends of Zelda: Tears of the Kingdom", "Explora la vasta superficie y los cielos de Hyrule. Una épica aventura a través de la superficie y los cielos de Hyrule te espera en The Legend of Zelda™: Tears of the Kingdom, disponible exclusivamente para la consola Nintendo Switch™. En esta secuela del juego The Legend of Zelda: Breath of the Wild, decidirás tu propio camino a través de los extensos paisajes de Hyrule y las islas que flotan en los vastos cielos. ¿Podrás aprovechar el poder de las nuevas habilidades de Link para luchar contra las malévolas fuerzas que amenazan al reino?", "Nintendo Switch", "totk.jpg", 46900);

    this.addRegister(2, "Diablo IV", "La legendaria serie RPG de acción regresa con Diablo IV. Esta espectacular evolución introduce un vasto nuevo mundo para explorar, lleno de promesas de aventuras interminables, demonios letales y botines legendarios. Descubre la tierra corrupta de Santuario mientras desciende a una nueva era de oscuridad. Lilith, hija de Mefisto, Señor del Odio, ha sido liberada del exilio y ahora su funesta influencia amenaza con consumir el mundo. Solo tú y las personas que te acompañan en la aventura se interponen entre Lilith y la ruina de Santuario. Explora Santuario en solitario o en compañía mientras avanzas en la fascinante campaña de Diablo IV, aceptando misiones, liberando ciudades y luchando contra jefes épicos", "XBOX Series S/X", "diabloiv.webp", 44776);

    this.addRegister(3, "Street Fighter 6", "Sal a la calle con nuevas formas de jugar y luchar en la próxima evolución de la legendaria serie de lucha de Capcom. Street Fighter 6 es el próximo paso en la evolución de la serie de Street Fighter, e incluye innovadoras funcionalidades de jugabilidad, así como mejores gráficos para todos los aspectos del juego. Con el poder del exclusivo motor de Capcom, RE ENGINE, la experiencia de Street Fighter 6 abarca tres modos de juego diferentes: Fighting Ground, World Tour y Battle Hub. Tu camino para convertirte en un luchador mundial comienza aquí. Tu momento. Tu lucha.", "PS5", "sfvi.webp", 43699);

    this.addRegister(4, "Mortal Kombat 1", "Una nueva era inicia. Está en nuestra sangre. Descubro el renacimiento del Universo de Mortal Kombat creado por el Dios del Fuego Liu Kang. Mortal Kombat 1 marca el comienzo de la nueva era de la icónica franquicia con un nuevo sistema de pelea, modos de juego, y Fatalities", "PS5", "MK1.jpg", 43000);
    console.log(this.products);
    
  }
  //method who creates the objet "product" and pushes it into our array
  addRegister(id, name, description, category, image, price){
    const product = new Product(id, name, description, category, image, price);
    this.products.push(product);
  }
  //it returns the array with all the "products" of our database
  bringRegister() {
    return this.products;
  }
  //looks for our product by their id, if finds it, it returs as an object
  registerById(id){
    return this.products.find((product) => product.id == id);
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

//call to render products
renderProducts(db.bringRegister());

//shows database register on our HTML
function renderProducts(){
  const products = db.bringRegister();
  divProducts.innerHTML = "";
  
  for (const product of products) {
    divProducts.innerHTML += `
    <div class="container py-3 conTypo containCards">
      <div class="row">
        <div class="col-md-6 col-lg-3">
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
      console.log("estas agregando " + product.name);
      carrito.agregar(product);
    });
  }
}




//object for our cart
const carrito = new Carrito();