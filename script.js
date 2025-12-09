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
    { name: "Onion Rings", desc: "Aros de cebolla apanados y fritos hasta quedar bien crocantes. Servidos con la salsa del chef.", 
       price: "$18.000", img: "" },
    { name: "Mozzarella Fingers", desc: "Palitos de mozzarella apanados y dorados, acompañados de salsa napolitana.", 
       price: "$22.000", img: "" },
    { name: "Mini Choripanes", desc: "pan pretzel mini , chorizo argentino y salsa criolla.", 
       price: "$24.000", img: "" },
    { name: "Montaditos de Cochinita Pitbull", desc: "Bondiola de cerdo cocinada lentamente y reducida en su propio jugo, servida sobre un tostón crocante de plátano verde, acompañada de salsa de ajo y cebolla encurtida.", 
       price: "$25.000", img: "" },
    { name: "Nachos con Carne Molida", desc: "Totopos de maíz fritos al estilo casero, cubiertos con carne Angus sazonada, guacamole, pico de gallo, sour cream, jalapeños y mezcla gratinada de queso suizo y cheddar.",
       price: "$28.000", img: "" },
    { name: "Mini Hot Dogs x3", desc: "hot dog clasico americano compuesto por pan de pretzel, cebolla fresca , salchicha americana, salsa del chef , queso Mozzarella y topping de papita crispy.", 
       price: "$28.000", img: "" },
    { name: "Fundido de Queso", desc: "Mezcla de quesos fundidos lentamente para lograr una textura cremosa, acompañada de ragú de carne Angus, cebolla encurtida y un toque de salsa de ajo.", 
       price: "$30.000", img: "" },
    { name: "Cuarteto de Hamburguesitas Angus", desc: "Mini burgers de carne Angus con salsa del chef, queso cheddar, mozzarella apanada y cebolla caramelizada. Un formato pequeño con sabor grande.", 
       price: "$33.000", img: "" },
    { name: "Fajitas de Pollo y Lomo", desc: "Pechuga de pollo y lomo de res salteados con pimientos rojos y verdes, logrando un mix de sabores y colores. Acompañadas de guacamole, pico de gallo, sour cream y tortillas de maíz.",
       price: "$35.000", img: "" },
    { name: "Mac & Cheese Trufado", desc: "Pasta codo con mezcla cremosa de quesos y un toque de trufa, gratinada con panko y parmesano.", 
       price: "$35.000", img: "" },
    { name: "Baos de Pork Belly", desc: "Panceta de cerdo crocante glaseada con teriyaki de guayaba, servida dentro de suaves panes buns con pepinillos agridulces y vegetales frescos que equilibran cada bocado.", 
       price: "$38.000", img: "" },
    { name: "Ronda de Tacos", desc: "Selección de tacos con varios de los mejores ingredientes de la casa: carne asada, chorizo, pollo crispy y cochinita pibil.", 
       price: "$50.000", img: "" },
  ],
 //Almuerzos: [
   // { name: "Pechuga a la plancha", desc: "Acompañada de arroz, papas criollas y ensalada fresca.", 
   //   price: "$0", img: "almuerzo1.jpg" },
   // { name: "Lomo en salsa de champiñones", desc: "Corte de res en salsa cremosa con papas y ensalada.", 
   //   price: "$0", img: "almuerzo2.jpg" }
  //],
 Gourmet: [
    { name: "Pechuga de Pollo", desc: "",
       price: "$35.000", img: "" },
    { name: "Lomo de Cerdo", desc: "",
       price: "$38.000", img: "" },
    { name: "Baby Beef", desc: "",
       price: "$45.000", img: "" },
    { name: "Costillas BBQ", desc: "",
       price: "$48.000", img: "" },
    { name: "Picanha", desc: "",
       price: "$55.000", img: "" },
    { name: "New York", desc: "",
       price: "$88.000", img: "" },
    { name: "Rib Eye", desc: "",
       price: "$93.000", img: "" },
  ],
  Compartir: [
    { name: "Parrillada Mixta 1", desc: "Tenders de pollo, papas a la francesa, mozzarella fingers, aros de cebolla y mini empanaditas de carne desmechada.",
     price: "$65.000", img: "" },
    { name: "Parrillada Mixta 2", desc: "Lomo fino, chicharrón crocante, pechuga de pollo, chorizo antioqueño, papas a la francesa y costillas BBQ.",
     price: "$70.000", img: "" },
    { name: "Parrillada Mixta 3", desc: "Chicharrón, chorizo antioqueño, butifarra soledeña, bollo limpio, salchicha ranchera glaseada en teriyaki y costilla de cerdo BBQ",
     price: "$75.000", img: "" },
  ],
 Burgers_Whoppers: [
    { name: "Crispy Chicken César Sandwich", desc: "Pechuga de pollo apanada con mix de lechugas en vinagreta, parmesano, queso mozzarella y salsa de ajo en pan de pretzel.", 
      price: "$28.000", img: "" },
    { name: "Cheese Bacon Burger", desc: "Carne Angus con doble tocineta, doble cheddar, pepinillos y cebolla fresca en pan de pretzel. Un clásico, sin perder estilo.", 
      price: "$28.000", img: "" },
    { name: "Choriburger", desc: "Blend de chorizo artesanal con mayonesa de chipotle, queso provolone y vegetales frescos. Sabor intenso con un perfil diferente al clásico", 
      price: "$30.000", img: "" },
    { name: "Spicy & Sweet", desc: "Pan de pretzel con mayonesa spicy, pimentones caramelizados, vegetales frescos y queso gouda. Balance perfecto entre dulce y picante.", 
      price: "$32.000", img: "" },
    { name: "Burger Mac & Cheese", desc: "Carne Angus con tocineta y el mac & cheese trufado del chef como topping, montado en pan de pretzel.", 
      price: "$35.000", img: "" },
    { name: "Whopper Pretzel", desc: "Carne Angus jugosa, queso cheddar, mozzarella apanada, cebolla caramelizada, tocineta, un toque de miel y salsa del chef, todo dentro de pan de pretzel.", 
      price: "$37.000", img: "" },
  ],
 Sandwiches: [
    {name: "Sándwich de Pork Belly", desc: "Pan de pretzel con tocino barriguero, salsa de ajo y cebolla encurtida para darle el toque ácido justo.",
       price: "$28.000", img: ""},
    { name: "Sándwich de Lomo", desc: "Lomo fino salteado con cebolla grille, bañado en gravy de carne y terminado con cebolla crispy.",
       price: "$32.000", img: "" },
    { name: "Club Sándwich", desc: "Pechuga de pollo al grill con salsa del chef, jamón de pavo, quesos mozzarella y provolone, vegetales frescos y mantequilla de hierbas.",
       price: "$35.000", img: "" },
  ],
  //hotdogs: [
//    { name: "Sweet Bacon", desc: "Salchicha premium, queso americano fundido, cebolla caramelizada, polvo de tocineta, cebolla blanca, mayo ahumada y pan artesanal. Todos nuestros hot dogs vienen acompañados de papas a la francesa y salsa de la casa.", 
//    price: "$0", img: "IMAGENES/LOGO.jpg" },
//
//    { name: "Pulled Pork", desc: "Salchicha premium, pulled pork en salsa BBQ, mayo ahumada y pan artesanal.", price: "$0", img: "hotdog2.jpg" },
//    { name: "Suizo Garage", desc: "Salchicha suiza, queso mozzarella, polvo de tocineta, salsa de la casa y pan artesanal.", price: "$0", img: "hotdog3.jpg" }
// ],
  bebidas: [
    { name: "Gaseosa", desc: "Coca-Cola, Sprite, Pepsi u otras opciones.", price: "$0", img: "bebida1.jpg" },
    { name: "Limonada natural", desc: "Refrescante y hecha al momento.", price: "$0", img: "bebida2.jpg" }
  ],
  Licores: [
    { name: "Cerveza artesanal", desc: "Variedades locales y de importación.", price: "$0", img: "licor1.jpg" },
    { name: "Whisky", desc: "Por copa o botella, selección premium.", price: "$0", img: "licor2.jpg" }
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
        <img src="${item.img}" alt="${item.name}">
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
      <img src="${item.img}" alt="${item.name}">
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


