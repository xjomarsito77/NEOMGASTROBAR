const menuBtn = document.getElementById('menuBtn');
const menuPanel = document.getElementById('menuPanel');
const closeMenu = document.getElementById('closeMenu');
const categoryList = document.getElementById('categoryList');
const categoryTitle = document.getElementById('categoryTitle');
const itemsContainer = document.getElementById('itemsContainer');

let modal = null;

// Base de datos
const data = {
  Entradas: [
    { name: "Fundido De Quesos", desc: "Queso cheddar x3 y blanco x3, ragu (carne molida), cebolla encurtida, salsa de ajo.",
       price: "$25.000", img: "" },
    { name: "Onion Rings", desc: "Aros de cebolla x12, salsa de pepinillo.", 
      price: "$27.000", img: "" },
    { name: "Ceviche Neom", desc: "Cubos de tilapia, leche de tigre, salsa cilantro, wonton, aguacate, tajin, cebolla encurtida. ", 
      price: "$30.000", img: "" },
    { name: "Nachos Carne Molida", desc: "Totopos, pico de gallo, guacamole, sour cream, carne molida, Queso amarillo x2 y blanco x2, jalapeño. ", 
      price: "$30.000", img: "" },
    { name: "Mozzarella Fingers", desc: "4 palitos de mozzarella apanados, salsa napolitana. ", 
      price: "$30.000", img: "" },
    { name: "Mini Hot Dog x3", desc: "Pan, Salsa de ajo, Salchicha ranchera, dip dulce & salado, salsa de la casa.", 
      price: "$30.000", img: "" },  
    { name: "Mini Choripanes x3", desc: "Pan, Salsa de ajo, chorizo, chimichurry.", 
      price: "$33.000", img: "" },
    { name: "Ronda De Tacos x3", desc: "Pollo crispy, salsa de ajo, aguacate, cebolla encurtida, cochinita, salsa BBQ, salsa chipotle, cebolla roja, carne asada, pico de gallo.", 
      price: "$33.000", img: "" },
    { name: "Mini Burger x3", desc: "Receta del chef.", 
      price: "$35.000", img: "" },
  ],

  ALMUERZOS: [
    { name: "Pollo Saltado ", desc: "Arroz, cebolla larga, zanahoria, cebollin chino, soya, jegibre, ajonjoli, ajinomoto, pasta de ajo, pollo en cubos, tomate, cebolla roja, papas a la francesa.", 
      price: "$32.000", img: "" },
    { name: "Lomo Saltado ", desc: "Arroz, cebolla larga, zanahoria, cebollin chino, soya, jegibre, ajonjoli, ajinomoto, pasta de ajo, lomo en cubos, tomate, cebolla roja, papas a la francesa.", 
      price: "$35.000", img: "" },
    { name: "Pollo Cremoso", desc: " Arroz, cebolla roja, tocineta, champiñones, crema de leche, soya, ajinomoto, queso parmesano, pechuga, cebollin chino.", 
      price: "$35.000", img: "" },
    { name: "Lomo Cremoso", desc: " Arroz, cebolla roja, tocineta, champiñones, crema de leche, soya, ajinomoto, queso parmesano, lomo, cebollin chino.", 
      price: "$40.000", img: "" },
    { name: "Wok Neom", desc: " Arroz, cubos de pollo y de lomo, medio chorizo artesanal de cerdo, cebolla larga, zanahoria, cebollin chino, pasta de ajo, soya, jengibre, ajonjoli, ajinomoto, raiz china, wonton frito, chicharron.", 
      price: "$45.000", img: "" },
  ],

  CORTES_CARNES: [
    { name: "Pechuga de Pollo", desc: "Papas a la francesa o cascos, ensalada coleslaw.", price: "$39.000", img: "" },
    { name: "Lomo de Cerdo", desc: "Papas a la francesa o cascos, ensalada coleslaw.", price: "$45.000", img: "" },
    { name: "Baby Beef", desc: "Papas a la francesa o cascos, ensalada coleslaw.", price: "$50.000", img: "" },
    { name: "Costillas BBQ", desc: "Papas a la francesa o cascos, ensalada coleslaw.", price: "$57.000", img: "" },
    { name: "Picanha", desc: "Papas a la francesa o cascos, ensalada coleslaw.", price: "$80.000", img: "" },
    { name: "New York", desc: "Papas a la francesa o cascos, ensalada coleslaw.", price: "$95.000", img: "" },
    { name: "Rib Eye", desc: "Papas a la francesa o cascos, ensalada coleslaw.", price: "$100.000", img: "" },
  ],

  COMPARTIR: [
    { name: "Parrillada Neom", desc: "5 tenders de pollo, 5 tenders de pescado, costilla BBQ, chorizo, picanha, chicharron, papas casco, salsa Neom, salsa de ajo, pico de gallo, chimichurry.",
       price: "$150.000", img: "" },
    
  ],

  BURGERS: [
    { name: "Chori Burger", desc: "pan, carne de chorizo, salsa chipotle, queso mozzarella, tomate, lechuga, papas a la francesa.", 
      price: "$37.000", img: "" },
    { name: "Burger Crispy Cesar", desc: "Pan, pechuga apanada, salsa de ajo, queso mozzarella, mix de lechuga parmesano y salsa de ajo, papas a la francesa.",
       price: "$37.000", img: "" },
    { name: "Cheese Bacon Burger", desc: "Pan, salsa de la casa, carne burger, tocineta, queso amarillo, cebolla fresca roja, pepinillos, papas a la francesa.", 
      price: "$38.000", img: "" },
    { name: "Burger OG", desc: "Pan, salsa chipotle, salsa de la casa, carne burger, queso cheddar, queso mozzarella, dip dulce & salado, chorizo artesanal de cerdo, tocineta, lechuga, tomate, papas a la francesa. ",
       price: "$38.000", img: "" },
    { name: "Spicy & Sweet Burger", desc: "Pan, carne burger, queso mozzarella, pimentones caramelizados, salsa de la casa, lechuga, tomate, papas a la francesa.",
       price: "$39.000", img: "" },
    { name: "Burger Whopper", desc: "Pan, carne burger, queso cheddar, queso mozzarella apanado, cebolla caramelizada, tocineta, salsa de la casa, papas a la francesa.",
       price: "$39.000", img: "" },
    
  ],

  SANDWICHES: [
    { name: "Sándwich de Pork Belly", desc: "Pan, tocino de chicharron, salsa de ajo, cebolla encurtida, papas a la francesa.",
       price: "$35.000", img: "" },
    { name: "Sándwich de Lomo", desc: "Lomo fino, cebolla roja, queso mozzarella, pepinillos, salsa de queso azul, papas a la francesa.", 
      price: "$39.000", img: "" },
    { name: "Club Sándwich", desc: "Pan molde, pechuga de pollo, salsa de la casa, queso mozzarella, jamon de pavo, tocineta, lechuga, tomate, papas a la francesa.", 
      price: "$48.000", img: "" },
  ],

  KIDS: [
    { name: "Chiken tenders", desc: "Tiras de pollo apanado x6, salsa de tomate, papas a la francesa.", 
      price: "$25.000", img: "" },
    { name: "Cheese burger", desc: "Carne Burger, queso cheddar, salsa de tomate, papas a la francesa.",
       price: "$25.000", img: "" },
  ],

   POSTRES: [
    { name: "Turron De Almendra", desc: "", 
      price: "$18.000", img: "" },
    { name: "Torta De Chocolate Con Helado", desc: "",
       price: "$17.000", img: "" },
  ],

  bebidas: [
    { name: "Agua", desc: "", price: "$7.500", img: "" },
    { name: "Soda Bretaña", desc: "", price: "$8.900", img: "" },
    { name: "Gaseosa", desc: "", price: "$8.900", img: "" },
    { name: "Ginger Canada Dry", desc: "", price: "$8.900", img: "" },
    { name: "Soda Hatsu", desc: "", price: "$10.900", img: "" },
    { name: "Te Hatsu", desc: "", price: "$10.900", img: "" },
    { name: "Jugo de Mandarina", desc: "", price: "$11.900", img: "" },
    { name: "Limonada Cerezada", desc: "", price: "$11.900", img: "" },
    { name: "Limonada Coco", desc: "", price: "$11.900", img: "" },
    { name: "Limonada Hierbabuena", desc: "", price: "$11.900", img: "" },
    { name: "Soda Frutos rojos", desc: "", price: "$18.900", img: "" },
    { name: "Soda Frutos Amarillos", desc: "", price: "$18.900", img: "" },
    { name: "Soda de Lyche", desc: "", price: "$18.900", img: "" },
    { name: "Red Bull", desc: "", price: "$15.900", img: "" },
    { name: "Red Bull Suggarfree", desc: "", price: "$15.900", img: "" },
    { name: "Red Bull edittion red", desc: "", price: "$15.900", img: "" },
    { name: "Gatorade", desc: "", price: "$11.900", img: "" },
  ],

  CERVEZAS: [
    { name: "Costeñita", desc: "", price: "$7.900", img: "" },
    { name: "Budweiser", desc: "", price: "$9.900", img: "" },
    { name: "Club Colombia Dorada", desc: "", price: "$10.900", img: "" },
    { name: "Heineken", desc: "", price: "$12.900", img: "" },
    { name: "Corona Extra", desc: "", price: "$13.900", img: "" },
    { name: "Stella Artois", desc: "", price: "$14.900", img: "" },
    { name: "Smirnoff Ice", desc: "", price: "$15.900", img: "" },
  ],

  COCTEL: [
    { name: "Margarita", desc: "", price: "$28.000", img: "" },
    { name: "Daiquiri", desc: "", price: "$28.000", img: "" },
    { name: "Cosmopolitan", desc: "", price: "$29.000", img: "" },
    { name: "Mojito", desc: "", price: "$29.000", img: "" },
    { name: "Americano", desc: "", price: "$30.000", img: "" },
    { name: "Tom Collins", desc: "", price: "$30.000", img: "" },
    { name: "Southside", desc: "", price: "$30.000", img: "" },
    { name: "Piña Colada", desc: "", price: "$31.000", img: "" },
    { name: "Tequila Sunrise", desc: "", price: "$31.000", img: "" },
    { name: "Mint Julep", desc: "", price: "$32.000", img: "" },
    { name: "Vodka Sunsire", desc: "", price: "$32.000", img: "" },
    { name: "Moscow Mule", desc: "", price: "$33.000", img: "" },
    { name: "Coctel Neom", desc: "", price: "$35.000", img: "" },
    { name: "Boulevardier", desc: "", price: "$36.000", img: "" },
    { name: "Old Fashioned", desc: "", price: "$38.000", img: "" },
    { name: "Negroni", desc: "", price: "$38.000", img: "" },
    { name: "God Father", desc: "", price: "$40.000", img: "" },
    { name: "Manhattan", desc: "", price: "$40.000", img: "" },
  ],

  VINOS: [
    { name: "Copa vino tinto", desc: "", price: "$32.900", img: "" },
    { name: "Copa vino blanco", desc: "", price: "$32.900", img: "" },
    { name: "Copa vino rosado", desc: "", price: "$32.900", img: "" },
    { name: "Botella vino tinto", desc: "", price: "$130.000", img: "" },
    { name: "Botella vino blanco", desc: "", price: "$130.000", img: "" },
    { name: "Botella vino rosado", desc: "", price: "$130.000", img: "" },
  ],

  AGUARDIENTES: [
    { name: "Aguardiente Antioqueño Tapa Azul", desc: "", price: "$200.000", img: "" },
    { name: "Aguardiente Antioqueño Tapa Verde (Sin Azúcar)", desc: "", price: "$200.000", img: "" },
    { name: "Aguardiente Antioqueño Amarillo de Manzanares", desc: "", price: "$220.000", img: "" },
  ],

  WHISKYS: [
    { name: "Buchanan’s Deluxe 12 años 750 ml", desc: "", price: "$340.000", img: "" },
    { name: "Buchanan’s Master 750 ml", desc: "", price: "$390.000", img: "" },
    { name: "Buchanan’s 10 años 750 ml", desc: "", price: "$650.000", img: "" },
    { name: "Old Parr 12 años 750 ml", desc: "", price: "$330.000", img: "" },
    { name: "Whisky Johnnie Walker Black Label", desc: "", price: "$330.000", img: "" },
    { name: "The Glenlivet Single Malt Scotch Whisky", desc: "", price: "$320.000", img: "" },
    { name: "Whisky Johnnie Walker Gold Label Reserve", desc: "", price: "$650.000", img: "" },
    { name: "Whiskey Jack Daniel’s ", desc: "", price: "$300.000", img: "" },
  ],

  RON: [
    { name: "Ron Medellín Añejo 12 Años", desc: "", price: "$200.000", img: "" },
    { name: "Ron Zacapa Centenario 12 Años", desc: "", price: "$320.000", img: "" },
    { name: "Ron La Hechicera Reserva Familiar", desc: "", price: "$340.000", img: "" },
  ],

  GINEBRAS: [
    { name: "Ginebra Tanqueray London Dry Gin - 750 ml", desc: "", price: "$300.000", img: "" },
    { name: "Ginebra Hendrick’s Gin - 750 ml", desc: "", price: "$470.000", img: "" },
  ],

  TEQUILAS: [
    { name: "José Cuervo Especial Reposado - 750 ml", desc: "", price: "$250.000", img: "" },
    { name: "Tequila Patrón Silver - 750 ml", desc: "", price: "$450.000", img: "" },
    { name: "Tequila 1800 Reposado - 750 ml", desc: "", price: "$450.000", img: "" },
    { name: "Tequila Don Julio Blanco - 750 ml", desc: "", price: "$470.000", img: "" },
    { name: "Tequila Don Julio Reposado - 750 ml", desc: "", price: "$490.000", img: "" },
    { name: "Tequila Don Julio 70 Cristalino - 750 ml", desc: "", price: "$650.000", img: "" },
  ],

  ADICIONALES: [
    { name: "Michelado", desc: "", price: "$3.000", img: "" },
    { name: "Aros de cebolla", desc: "", price: "$8.900", img: "" },
    { name: "Papas a la francesa", desc: "", price: "$9.000", img: "" },
    { name: "Papas casco", desc: "", price: "$9.000", img: "" },
    { name: "Chorizo argentino", desc: "", price: "$10.900", img: "" },
  ]
};

// ===============================
// RESET SCROLL (SIDEBAR + CONTENIDO)
// ===============================
function resetMobileScroll({ sidebar: resetSidebar = false, content: resetContent = true } = {}) {
  const sidebar = document.querySelector('.sidebar');
  const menuContent = document.querySelector('.menu-content');

  if (resetSidebar && sidebar) sidebar.scrollTop = 0;
  if (resetContent && menuContent) menuContent.scrollTop = 0;
}

// ===============================
// RENDERIZAR CATEGORÍA
// ===============================
function renderCategory(cat) {
  // Si algún día llegara una categoría inexistente:
  if (!data[cat]) cat = "Entradas";

  categoryTitle.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);

  itemsContainer.innerHTML = (data[cat] || [])
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

  // ✅ Solo resetea scroll de productos
  resetMobileScroll({ sidebar: false, content: true });
}

// ===============================
// MODAL PRODUCTO
// ===============================
function openModal(cat, i) {
  const item = data[cat]?.[i];
  if (!item) return;

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
    setTimeout(() => {
      modal?.remove();
      modal = null;
    }, 300);
  }
}

// ===============================
// EVENTO VER PRODUCTO
// ===============================
itemsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('ver-btn')) {
    openModal(e.target.dataset.cat, Number(e.target.dataset.index));
  }
});

// ===============================
// CAMBIAR CATEGORÍA
// ===============================
categoryList.addEventListener('click', e => {
  const li = e.target.closest('li');
  if (!li) return;

  document.querySelectorAll('.sidebar li').forEach(x => x.classList.remove('active'));
  li.classList.add('active');

  renderCategory(li.dataset.category);

  // No salta al inicio: solo ajusta si hace falta
  li.scrollIntoView({ block: 'nearest', inline: 'nearest' });
});

// ===============================
// ABRIR MENÚ
// ===============================
menuBtn.addEventListener('click', () => {
  menuPanel.style.display = 'flex';

  // Al abrir, sí resetea todo
  resetMobileScroll({ sidebar: true, content: true });

  // Reflow para animación
  menuPanel.offsetHeight;

  menuPanel.classList.add('show');

  renderCategory('Entradas');

  document.querySelectorAll('.sidebar li').forEach(li => {
    li.classList.toggle('active', li.dataset.category === 'Entradas');
  });

  history.pushState(null, '', '#menu');
});

// ===============================
// CERRAR MENÚ
// ===============================
closeMenu.addEventListener('click', () => {
  // Dejar listo para próxima vez
  renderCategory('Entradas');
  document.querySelectorAll('.sidebar li').forEach(li => {
    li.classList.toggle('active', li.dataset.category === 'Entradas');
  });

  resetMobileScroll({ sidebar: true, content: true });

  menuPanel.classList.remove('show');
  setTimeout(() => (menuPanel.style.display = 'none'), 400);

  history.back();
});

// ===============================
// RETROCESO NAVEGADOR
// ===============================
window.addEventListener('popstate', () => {
  if (menuPanel.classList.contains('show')) {
    menuPanel.classList.remove('show');
    setTimeout(() => (menuPanel.style.display = 'none'), 400);
  }
});

// Render inicial (opcional)
renderCategory('Entradas');
