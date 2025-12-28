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

  ALMUERZOS: [
    { name: "Pollo saltado ", desc: "Arroz oriental base , pechuga de pollo, cebolla en casco , tomate en casco , papas a la francesa.", 
       price: "$28.000", img: "" },
    { name: "Lomo saltado", desc: "Arroz oriental base , lomo fino de res , papas a la francesa , tomate en casco , cebolla en casco , salsa de soya. ", 
       price: "$29.000", img: "" },
    { name: "Arroz cremoso con suprema de pollo", desc: " Arroz cremoso base , tocineta , queso parmesano , champiñones, pechuga de pollo entera.", 
       price: "$31.000", img: "" },
    { name: "Arroz cremoso de lomo ", desc: " arroz cremoso  a base de tocineta y champiñones queso parmesano , champiñones y lomo de res.", 
       price: "$33.000", img: "" }
  ],

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
     price: "$68.000", img: "" },
    { name: "Parrillada Mixta 2", desc: "Lomo fino, chicharrón crocante, pechuga de pollo, chorizo antioqueño, papas a la francesa y costillas BBQ.",
     price: "$73.000", img: "" },
    { name: "Parrillada Mixta 3", desc: "Chicharrón, chorizo antioqueño, butifarra soledeña, bollo limpio, salchicha ranchera glaseada en teriyaki y costilla de cerdo BBQ",
     price: "$78.000", img: "" },
  ],

  BURGERS: [
    { name: "Crispy Chicken César Sandwich", desc: "Pan pretzel, salsa de ajo , mix de lechugas en su vinagreta , parmesano , queso Mozzarella y pechuga de pollo apanada.", 
      price: "$30.000", img: "" },
    { name: "Cheese Bacon Burger", desc: "Pan de pretzel , carne angus , doble tocineta, doble cheddar, cebolla fresca y pepinillos.", 
      price: "$30.000", img: "" },
    { name: "Choriburger", desc: "Blend completamente de carne chorizo artesanal ; mayonesa de chipotle, queso provolone, vegetales frescos", 
      price: "$32.000", img: "" },
    { name: "Spicy & Sweet", desc: "Pan pretzel , salsa mayo Spicy , pimentones caramelizados, vegetales frescos , queso gouda.", 
      price: "$34.000", img: "" },
    { name: "Burger Mac & Cheese", desc: "Pan de pretzel, salsa del chef , carne angus, tocineta , mc and chesse trufado del chef.", 
      price: "$37.000", img: "" },
    { name: "Whopper Pretzel", desc: "Pan de pretzel , salsa del chef , carne angus, queso Cheddar , Mozzarella apanado cebolla caramelizada , tocineta y miel .", 
      price: "$39.000", img: "" },
  ],

  SANDWICHES: [
    {name: "Sándwich de Pork Belly", desc: "Pan de pretzel , tocino barriguero, salsa de ajo, cebolla encurtida.",
       price: "$30.000", img: ""},
    { name: "Sándwich de Lomo", desc: "Lomo fino salteado con cebolla grille y greavy de caldo de carne y cebolla crispy.",
       price: "$34.000", img: "" },
    { name: "Club Sándwich", desc: "Pechuga de pollo al grill , salsa del chef, jamón de pavo , queso Mozzarella , provolone, vegetales frescos , mantequilla de hierbas .",
       price: "$37.000", img: "" },
  ],

  KIDS: [
    { name: "Chiken tenders", desc: "Tornados apanado acompañado de papas a la francesa salsa de tomate y juguito.", 
       price: "$0", img: "" },
    { name: "Cheese burger", desc: "Carne de res premium queso americano pan artesanal  y salsa de tomate acompañado de papas a la francesa y juguito.",
       price: "$0", img: "" },
  ],

  bebidas: [
    { name: "Agua", desc: "",  price: "$7.500", img: "" },
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
    { name: "Club Colombia", desc: "", price: "$10.900", img: "" },
    { name: "Heiniken", desc: "", price: "$12.900", img: "" },
    { name: "Corona", desc: "", price: "$13.900", img: "" },
    { name: "Stella", desc: "", price: "$14.900", img: "" },
    { name: "Smirnoff", desc: "", price: "$15.900", img: "" },
  ],

  COCTEL: [
    { name: "Margarita", desc: "", price: "$28.000", img: "" },
    { name: "Tom Collins", desc: "", price: "$28.000", img: "" },
    { name: "Mojito", desc: "", price: "$30.000", img: "" },
    { name: "Piña Colada", desc: "", price: "$35.000", img: "" },
    { name: "Moscuw mule", desc: "", price: "$38.000", img: "" },
    { name: "Cóctel Neom", desc: "", price: "$40.000", img: "" },
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
    { name: "Aguardiente tapa azul", desc: "", price: "$200.000", img: "" },
    { name: "Aguardiente tapa verde", desc: "", price: "$200.000", img: "" },
    { name: "Aguardiente amarillo", desc: "", price: "$220.000", img: "" },
  ],

  WISKY: [
    { name: "Buchana Deluxe 12 años 750ml", desc: "", price: "$340.000", img: "" },
    { name: "Buchana Máster 750ml", desc: "", price: "$390.000", img: "" },
    { name: "Buchana 10 años 750ml", desc: "", price: "$650.000", img: "" },
    { name: "Old parr 12 años 750ml", desc: "", price: "$330.000", img: "" },
    { name: "Wisky Black Label", desc: "", price: "$330.000", img: "" },
    { name: "Wisky de Glenlivet", desc: "", price: "$320.000", img: "" },
    { name: "Wisky Gold Label ", desc: "", price: "$650.000", img: "" },
    { name: "Wisky Jack Daniel", desc: "", price: "$300.000", img: "" },
  ],

  RON: [
    { name: "Ron Medellín 12 años", desc: "", price: "$200.000", img: "" },
    { name: "Ron Zacapa 12 años", desc: "", price: "$320.000", img: "" },
    { name: "Ron la Hechicera", desc: "", price: "$340.000", img: "" },
  ],

  GINEBRAS: [
    { name: "José Kuervo 750ml", desc: "", price: "$250.000", img: "" },
    { name: "Ginebra Tanquerai 750ml", desc: "", price: "$300.000", img: "" },
    { name: "Ginebra Hendriks 750ml", desc: "", price: "$470.000", img: "" },
  ],

  TEQUILAS: [
    { name: "Tequila Patrón cristalino", desc: "", price: "$450.000", img: "" },
    { name: "Tequila 1.800 reposado 750ml", desc: "", price: "$450.000", img: "" },
    { name: "Don Julio blanco", desc: "", price: "$470.000", img: "" },
    { name: "Don Julio reposado", desc: "", price: "$490.000", img: "" },
    { name: "Don Julio 70", desc: "", price: "$650.000", img: "" },
  ],

  ADICIONALES: [
    { name: "Michelado", desc: "", price: "$3.000", img: "" },
    { name: "Aros de cebolla", desc: "", price: "$8.900", img: "" },
    { name: "Papas a la francesa", desc: "", price: "$9.000", img: "" },
    { name: "Papas casco", desc: "", price: "$9.000", img: "" },
    { name: "Chorizo argentino", desc: "", price: "$10.900", img: "" },
  ]

  //postres: [
  //  { name: "Brownie con helado", desc: "Brownie caliente con bola de helado de vainilla.", price: "$0", img: "postre1.jpg" },
  //  { name: "Cheesecake de frutos rojos", desc: "Base de galleta y salsa de frutos rojos frescos.", price: "$0", img: "postre2.jpg" }
  //]
};
// ===============================
// RESET SCROLL (SIDEBAR + CONTENIDO)
// ===============================
function resetMobileScroll() {
  const sidebar = document.querySelector('.sidebar');
  const menuContent = document.querySelector('.menu-content');

  if (sidebar) sidebar.scrollTop = 0;
  if (menuContent) menuContent.scrollTop = 0;
}

// ===============================
// RENDERIZAR CATEGORÍA
// ===============================
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

  // 🔥 Siempre volver arriba al renderizar
  resetMobileScroll();
}

// ===============================
// MODAL PRODUCTO
// ===============================
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

// ===============================
// EVENTO VER PRODUCTO
// ===============================
itemsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('ver-btn')) {
    openModal(e.target.dataset.cat, e.target.dataset.index);
  }
});

// ===============================
// CAMBIAR CATEGORÍA
// ===============================
categoryList.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    document.querySelectorAll('.sidebar li').forEach(li =>
      li.classList.remove('active')
    );

    e.target.classList.add('active');
    renderCategory(e.target.dataset.category);
  }
});

// ===============================
// ABRIR MENÚ
// ===============================
menuBtn.addEventListener('click', () => {
  menuPanel.style.display = 'flex';

  // 🔥 Reset ANTES de mostrar
  resetMobileScroll();

  // Forzar render
  menuPanel.offsetHeight;

  // Animación
  menuPanel.classList.add('show');

  // Categoría inicial
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


