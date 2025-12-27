const menuBtn = document.getElementById('menuBtn');
const menuPanel = document.getElementById('menuPanel');
const closeMenu = document.getElementById('closeMenu');
const categoryList = document.getElementById('categoryList');
const categoryTitle = document.getElementById('categoryTitle');
const itemsContainer = document.getElementById('itemsContainer');

let modal;

// Base de datos
const data = {
  Entradas: [
    { name: "Onion Rings", desc: "Aros de cebolla apañados acompañados con salsa del chef.", 
       price: "$20.000", img: "" },
    { name: "Mozzarella Fingers", desc: "Palitos de queso apañados acompañados con salsa napolitana.", 
       price: "$24.000", img: "" },
    { name: "Mini Choripanes", desc: "Pan pretzel mini , chorizo argentino y salsa criolla.", 
       price: "$27.000", img: "" },
    { name: "Montaditos de Cochinita Pitbull", desc: "Bondiola de cerdo cocinada en cocción lenta reducida en su jugo de cocción ; salsa de ajo , cebolla encurtida sobre crocante toston de plátano verde.", 
       price: "$28.000", img: "" },
    { name: "Nachos con Carne Molida", desc: "Totopos de maíz fritos , pico de gallo guacamole, pico de gallo, sour cream , carne molida angus sazonada a la perfección, gratinado con queso suizo y cheddar y jalapeños.",
       price: "$30.000", img: "" },
    { name: "Mini Hot Dogs x3", desc: "Hot dog clasico americano compuesto por pan de pretzel, cebolla fresca , salchicha americana, salsa del chef , queso Mozzarella y topping de papita crispy.", 
       price: "$30.000", img: "" },
    { name: "Fundido de Queso", desc: "Mezcla de quesos fundidos lentamente acompañados de un ragú de carne molida angus sazonada, cebolla encurtida y salsa de ajo.", 
       price: "$32.000", img: "" },
    { name: "Cuarteto de Hamburguesitas Angus", desc: "Mini hamburguesas de carne angus con salsa del chef , queso Cheddar y queso Mozzarella apanado y cebolla caramelizada.", 
       price: "$35.000", img: "" },
    { name: "Fajitas de Pollo y Lomo", desc: "Pechuga de pollo , lomo de res salteado junto con pimientos rojo y verde sazonados a la perfección, acompañados de guacamole pico de gallo, sour cream y tortillas de maíz.",
       price: "$37.000", img: "" },
    { name: "Mac & Cheese", desc: "Mezcla de pasta codo , mezcla de quesos y trufa y panko horneado con parmesano.", 
       price: "$38.000", img: "" },
    { name: "Baos de Pork Belly", desc: "Panceta de cerdo crocante glaseada con salsa teriyaki de guayaba sobre masa de buns acompañados de pepinillos agridulce y vegetales frescos.", 
       price: "$40.000", img: "" },
    { name: "Ronda de Tacos", desc: "Tacos realizados con nuestros mejores ingredientes de nuestro menú (carne asada, chorizo, pollo crispy , cochinita pibill).", 
       price: "$53.000", img: "" },
  ],
 //Almuerzos: [
   // { name: "Pechuga a la plancha", desc: "Acompañada de arroz, papas criollas y ensalada fresca.", 
   //   price: "$0", img: "almuerzo1.jpg" },
   // { name: "Lomo en salsa de champiñones", desc: "Corte de res en salsa cremosa con papas y ensalada.", 
   //   price: "$0", img: "almuerzo2.jpg" }
  //],
 CORTES_CARNES: [
    { name: "Pechuga de Pollo", desc: "",
       price: "$36.000", img: "" },
    { name: "Lomo de Cerdo", desc: "",
       price: "$40.000", img: "" },
    { name: "Baby Beef", desc: "",
       price: "$47.000", img: "" },
    { name: "Costillas BBQ", desc: "",
       price: "$50.000", img: "" },
    { name: "Picanha", desc: "",
       price: "$58.000", img: "" },
    { name: "New York", desc: "",
       price: "$91.000", img: "" },
    { name: "Rib Eye", desc: "",
       price: "$96.000", img: "" },
  ],
  COMPARTIR: [
    { name: "Parrillada Mixta 1", desc: "Tenders de pollo, papas a la francesa, mozzarella fingers, aros de cebolla y mini empanaditas de carne desmechada.",
     price: "$65.000", img: "" },
    { name: "Parrillada Mixta 2", desc: "Lomo fino, chicharrón crocante, pechuga de pollo, chorizo antioqueño, papas a la francesa y costillas BBQ.",
     price: "$70.000", img: "" },
    { name: "Parrillada Mixta 3", desc: "Chicharrón, chorizo antioqueño, butifarra soledeña, bollo limpio, salchicha ranchera glaseada en teriyaki y costilla de cerdo BBQ",
     price: "$75.000", img: "" },
  ],
 BURGERS: [
    { name: "Crispy Chicken César Sandwich", desc: "Pan pretzel, salsa de ajo , mix de lechugas en su vinagreta , parmesano , queso Mozzarella y pechuga de pollo apanada.", 
      price: "$30.000", img: "" },
    { name: "Cheese Bacon Burger", desc: "Pan de pretzel , carne angus , doble tocineta, doble cheddar, cebolla fresca y pepinillos.", 
      price: "$30.000", img: "" },
    { name: "Choriburger", desc: "Blend completamente de carne chorizo artesanal ; mayonesa de chipotle, queso provolone, vegetales frescos", 
      price: "$32.000", img: "" },
    { name: "Spicy & Sweet", desc: "Pan pretzel ; salsa mayo Spicy , pimentones caramelizados, vegetales frescos , queso gouda.", 
      price: "$34.000", img: "" },
    { name: "Burger Mac & Cheese", desc: "Pan de pretzel, salsa del chef , carne angus, tocineta ; mc and chesse trufado del chef.", 
      price: "$37.000", img: "" },
    { name: "Whopper Pretzel", desc: "Pan de pretzel ; salsa del chef , carne angus, queso Cheddar , Mozzarella apanado cebolla caramelizada , tocineta y miel .", 
      price: "$39.000", img: "" },
  ],
 Sandwiches: [
    {name: "Sándwich de Pork Belly", desc: "Pan de pretzel , tocino barriguero, salsa de ajo, cebolla encurtida.",
       price: "$30.000", img: ""},
    { name: "Sándwich de Lomo", desc: "Lomo fino salteado con cebolla grille y greavy de caldo de carne y cebolla crispy.",
       price: "$34.000", img: "" },
    { name: "Club Sándwich", desc: "Pechuga de pollo al grill, salsa del chef, jamón de pavo , queso Mozzarella , provolone, vegetales frescos , mantequilla de hierbas .",
       price: "$37.000", img: "" },
  ],
  //hotdogs: [
//    { name: "Sweet Bacon", desc: "Salchicha premium, queso americano fundido, cebolla caramelizada, polvo de tocineta, cebolla blanca, mayo ahumada y pan artesanal. Todos nuestros hot dogs vienen acompañados de papas a la francesa y salsa de la casa.", 
//    price: "$0", img: "IMAGENES/LOGO.jpg" },
//
//    { name: "Pulled Pork", desc: "Salchicha premium, pulled pork en salsa BBQ, mayo ahumada y pan artesanal.", price: "$0", img: "hotdog2.jpg" },
//    { name: "Suizo Garage", desc: "Salchicha suiza, queso mozzarella, polvo de tocineta, salsa de la casa y pan artesanal.", price: "$0", img: "hotdog3.jpg" }
// ],
  bebidas: [
    { name: "Gaseosa", desc: "Coca-Cola, Sprite, Pepsi u otras opciones.", price: "$0", img: "" },
    { name: "Limonada natural", desc: "Refrescante y hecha al momento.", price: "$0", img: "" }
  ],
  Licores: [
    { name: "Cerveza artesanal", desc: "Variedades locales y de importación.", price: "$0", img: "" },
    { name: "Whisky", desc: "Por copa o botella, selección premium.", price: "$0", img: "" }
  ],
  //postres: [
  //  { name: "Brownie con helado", desc: "Brownie caliente con bola de helado de vainilla.", price: "$0", img: "postre1.jpg" },
  //  { name: "Cheesecake de frutos rojos", desc: "Base de galleta y salsa de frutos rojos frescos.", price: "$0", img: "postre2.jpg" }
  //]
};

// Renderizar categoría
function renderCategory(cat) {
  categoryTitle.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
  itemsContainer.innerHTML = data[cat]
    .map(
      (item, i) => `
      <div class="item">
        ${item.img ? `<img src="${item.img}" alt="${item.name}">` : ""}
        <div class="item-content">
          <h4>${item.name}</h4>
          <p>${item.desc}</p>
          <span class="price">${item.price}</span>
          <button class="ver-btn" data-cat="${cat}" data-index="${i}">VER</button>
        </div>
      </div>
    `
    )
    .join('');
}

// Abrir modal del producto
function openModal(cat, i) {
  const item = data[cat][i];
  modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <button class="close-modal">✕</button>
      ${item.img ? `<img src="${item.img}" alt="${item.name}">` : ""}
      <h2>${item.name}</h2>
      <h3>${item.price}</h3>
      <p>${item.desc}</p>
    </div>
  `;
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('show'), 10);
  document.querySelector('.close-modal').addEventListener('click', closeModal);
}

function closeModal() {
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 300);
  }
}

// Evento: Ver producto
itemsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('ver-btn')) {
    const cat = e.target.dataset.cat;
    const i = e.target.dataset.index;
    openModal(cat, i);
  }
});

// Cambiar categoría
categoryList.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    e.target.classList.add('active');
    const cat = e.target.dataset.category;
    renderCategory(cat);
  }
});

// 🔥 Abrir menú (CORREGIDO)
menuBtn.addEventListener('click', () => {
  menuPanel.style.display = 'flex';
  setTimeout(() => menuPanel.classList.add('show'), 10);

  // Mostrar Entradas por defecto
  renderCategory('Entradas');

  // Activar visualmente el botón de Entradas
  document.querySelectorAll('.sidebar li').forEach(li => {
    if (li.dataset.category === 'Entradas') li.classList.add('active');
    else li.classList.remove('active');
  });

  history.pushState(null, '', '#menu');
});

// Cerrar menú
closeMenu.addEventListener('click', () => {
  menuPanel.classList.remove('show');
  setTimeout(() => (menuPanel.style.display = 'none'), 900);
  history.back();
});

// Retroceso navegador
window.addEventListener('popstate', () => {
  if (menuPanel.classList.contains('show')) {
    menuPanel.classList.remove('show');
    setTimeout(() => (menuPanel.style.display = 'none'), 900);
  }
});


