const menuBtn = document.getElementById('menuBtn');
const menuPanel = document.getElementById('menuPanel');
const closeMenu = document.getElementById('closeMenu');
const categoryList = document.getElementById('categoryList');
const categoryTitle = document.getElementById('categoryTitle');
const itemsContainer = document.getElementById('itemsContainer');

let modal = null;

const IMG_V ="29"
// Base de datos
const data = {
  Entradas: [
    { name: "Fundido De Quesos", desc: "Mezcla de queso cheddar y queso blanco fundidos, acompañados de ragú de carne molida, cebolla encurtida y salsa de ajo.",
       price: "$25.000", img: "IMAGENES/fundidoqueso.jpg" },
    { name: "Onion Rings", desc: "Doce (12) aros de cebolla crujientes, acompañados de salsa de pepinillo.", 
      price: "$27.000", img: "IMAGENES/onion.jpg" },
    { name: "Ceviche Neom", desc: "Cubos de tilapia marinados en leche de tigre, acompañados de salsa de cilantro, wonton crujiente, aguacate, cebolla encurtida y un toque de tajín. ", 
      price: "$30.000", img: "IMAGENES/cevicheneom.jpg" },
    { name: "Nachos Carne Molida", desc: "Totopos crujientes cubiertos con carne molida, queso amarillo y queso blanco, acompañados de pico de gallo, guacamole, sour cream y jalapeños.", 
      price: "$30.000", img: "IMAGENES/nachoscarne.jpg" },
    { name: "Mozzarella Fingers", desc: "Ocho (8) palitos de mozzarella apanados y dorados, acompañados de salsa napolitana. ", 
      price: "$30.000", img: "" },
    { name: "Mini Hot Dog x3", desc: "Tres (3) mini hot dogs en pan artellano, con salchicha ranchera, salsa de ajo, dip dulce y salado, y salsa de la casa.", 
      price: "$30.000", img: "IMAGENES/triodog.jpg" },  
    { name: "Mini Choripanes x3", desc: "Tres (3) mini choripanes en pan artellano, con chorizo, salsa de ajo y chimichurri.", 
      price: "$33.000", img: "IMAGENES/choripan.jpg" },
    { name: "Ronda De Tacos x3", desc: "Tres (3) tacos surtidos: pollo crispy con salsa de ajo, aguacate y cebolla encurtida; cochinita con salsa BBQ y chipotle; y carne asada con cebolla roja y pico de gallo.", 
      price: "$33.000", img: "IMAGENES/tacos.jpg" },
    { name: "Mini Burger x3", desc: "Receta del chef.", 
      price: "$35.000", img: "IMAGENES/triomini.jpg" },
  ],

  ALMUERZOS: [
    { name: "Pollo Saltado ", desc: "Arroz saltado con cebolla larga, zanahoria y cebollín chino, preparado con soya, jengibre, ajonjolí, ajinomoto y pasta de ajo. Acompañado de pollo en cubos, tomate, cebolla roja y papas a la francesa.", 
      price: "$32.000", img: "" },
    { name: "Lomo Saltado ", desc: "Arroz saltado con cebolla larga, zanahoria y cebollín chino, preparado con soya, jengibre, ajonjolí, ajinomoto y pasta de ajo. Acompañado de lomo en cubos, tomate, cebolla roja y papas a la francesa.", 
      price: "$35.000", img: "" },
    { name: "Pollo Cremoso", desc: "Arroz saltado con cebolla roja, tocineta y champiñones, preparado con crema de leche, soya y ajinomoto, terminado con queso parmesano. Acompañado de pechuga de pollo y cebollín chino.", 
      price: "$35.000", img: "" },
    { name: "Lomo Cremoso", desc: "Arroz saltado con cebolla roja, tocineta y champiñones, preparado con crema de leche, soya y ajinomoto, terminado con queso parmesano. Acompañado de lomo y cebollín chino.", 
      price: "$35.000", img: "IMAGENES/lomocremoso.jpg" },
    { name: "Wok Neom", desc: "Arroz saltado con cebolla larga, zanahoria y cebollín chino, preparado con pasta de ajo, soya, jengibre, ajonjolí y ajinomoto. Acompañado de cubos de pollo y lomo, medio chorizo artesanal de cerdo, raíz china, wonton frito y chicharrón.", 
      price: "$45.000", img: "IMAGENES/wokneom.jpg" },
  ],

  CORTES_CARNES: [
    { name: "Pechuga de Pollo", desc: "Papas a la francesa o cascos, con ensalada coleslaw.", price: "$39.000", img: "" },
    { name: "Lomo de Cerdo", desc: "Papas a la francesa o cascos, con ensalada coleslaw.", price: "$45.000", img: "" },
    { name: "Baby Beef", desc: "Papas a la francesa o cascos, con ensalada coleslaw.", price: "$50.000", img: "" },
    { name: "Costillas BBQ", desc: "Papas a la francesa o cascos, con ensalada coleslaw.", price: "$57.000", img: "IMAGENES/costillasbbq.jpg" },
    { name: "Picanha", desc: "Papas a la francesa o cascos, con ensalada coleslaw.", price: "$80.000", img: "" },
    { name: "New York", desc: "Papas a la francesa o cascos, con ensalada coleslaw.", price: "$95.000", img: "" },
    { name: "Rib Eye", desc: "Papas a la francesa o cascos, con ensalada coleslaw.", price: "$100.000", img: "" },
  ],

  COMPARTIR: [
    { name: "Parrillada Neom", desc: " (5) Tenders de pollo y (5) de pescado, costilla BBQ, chorizo, picanha y chicharrón, acompañados de papas casco, salsa NEOM, salsa de ajo, pico de gallo y chimichurri.",
       price: "$150.000", img: "" },
    
  ],

  BURGERS: [
    { name: "Chori Burger", desc: "Pan artellano con carne de chorizo, queso mozzarella, salsa chipotle, tomate y lechuga. Acompañada de papas a la francesa.", 
      price: "$37.000", img: "" },
    { name: "Burger Crispy Cesar", desc: "Pan artellano con pechuga apanada, queso mozzarella y salsa de ajo, acompañada de mix de lechugas con parmesano y salsa de ajo. Servida con papas a la francesa.",
      price: "$37.000", img: "IMAGENES/crisp.jpg" },
    { name: "Cheese Bacon Burger", desc: "Pan artellano con carne burger, queso amarillo, tocineta, cebolla roja fresca y pepinillos, con salsa de la casa. Acompañada de papas a la francesa.", 
      price: "$38.000", img: "" },
    { name: "Burger OG", desc: "Pan artellano con carne burger, queso cheddar y mozzarella, chorizo artesanal de cerdo, tocineta, lechuga y tomate, acompañada de salsa chipotle, salsa de la casa y dip dulce & salado. Servida con papas a la francesa.",
       price: "$38.000", img: "IMAGENES/burgerog.jpg" },
    { name: "Spicy & Sweet Burger", desc: "Pan artellano con carne burger, queso mozzarella, pimentones caramelizados y salsa de la casa, acompañada de lechuga y tomate. Servida con papas a la francesa.",
       price: "$39.000", img: "" },
    { name: "Burger Whopper", desc: "Pan artellano con carne burger, queso cheddar y mozzarella apanado, cebolla caramelizada, tocineta y salsa de la casa. Acompañada de papas a la francesa.",
       price: "$39.000", img: "IMAGENES/whop.jpg" },
    
  ],

  SANDWICHES: [
    { name: "Sándwich de Pork Belly", desc: "Pan artellano con pork belly crujiente, salsa de ajo y cebolla encurtida. Acompañado de papas a la francesa.",
       price: "$35.000", img: "" },
    { name: "Sándwich de Lomo", desc: "Lomo fino con cebolla roja, queso mozzarella, pepinillos y salsa de queso azul. Acompañado de papas a la francesa.", 
      price: "$39.000", img: "" },
    { name: "Club Sándwich", desc: "Pan molde con pechuga de pollo, jamón de pavo, queso mozzarella, tocineta, lechuga y tomate, acompañado de salsa de la casa. Acompañado de papas a la francesa.", 
      price: "$48.000", img: "" },
  ],

  KIDS: [
    { name: "Chiken tenders", desc: "Tiras de pollo apanado x6, salsa de tomate, papas a la francesa.", 
      price: "$25.000", img: "" },
    { name: "Cheese burger", desc: "Carne Burger, queso cheddar, salsa de tomate, papas a la francesa.",
       price: "$25.000", img: "" },
  ],

   POSTRES: [
    { name: "Paletas Artesanales", desc: "Sabores disponibles: Chocolate, Canela, Milo.",
       price: "$15.000", img: "" },
  ],

  bebidas: [
    { name: "Agua Hatsu", desc: "", price: "$7.500", img: "IMAGENES/aguaa.jpg" },
    { name: "Soda Bretaña", desc: "", price: "$8.900", img: "IMAGENES/bretaña.jpg" },
    { name: "Pepsi", desc: "", price: "$8.900", img: "IMAGENES/pepsii.jpg" },
    { name: "Ginger Canada Dry", desc: "", price: "$8.900", img: "IMAGENES/canadry.jpg" },
    { name: "Soda Hatsu", desc: "", price: "$10.900", img: "" },
    { name: "Te Hatsu", desc: "", price: "$10.900", img: "" },
    { name: "Jugo de Mandarina", desc: "", price: "$11.900", img: "" },
    { name: "Limonada Cerezada", desc: "", price: "$11.900", img: "" },
    { name: "Limonada Coco", desc: "", price: "$11.900", img: "" },
    { name: "Limonada Hierbabuena", desc: "", price: "$11.900", img: "" },
    { name: "Soda Frutos rojos", desc: "Todas nuestras sodas están elaboradas a base de Hatsu.", price: "$18.900", img: "" },
    { name: "Soda Frutos Amarillos", desc: "Todas nuestras sodas están elaboradas a base de Hatsu.", price: "$18.900", img: "" },
    { name: "Soda de Lyche", desc: "Todas nuestras sodas están elaboradas a base de Hatsu.", price: "$18.900", img: "" },
    { name: "Soda Lulo house", desc: "Todas nuestras sodas están elaboradas a base de Hatsu.", price: "$18.900", img: "" },
    { name: "Red Bull", desc: "", price: "$15.900", img: "IMAGENES/redbull.jpg" },
    { name: "Red Bull Sugarfree", desc: "", price: "$15.900", img: "IMAGENES/redbul2.jpg" },
    { name: "Red Bull edition red", desc: "", price: "$15.900", img: "IMAGENES/redbulr.jpg" },
    { name: "Gatorade", desc: "", price: "$11.900", img: "IMAGENES/gatorade.jpg" },
  ],

  CERVEZAS: [
    { name: "Costeñita", desc: "", price: "$7.900", img: "IMAGENES/coste.jpg" },
    { name: "Budweiser", desc: "", price: "$9.900", img: "IMAGENES/bud.jpg" },
    { name: "Club Colombia Dorada", desc: "", price: "$10.900", img: "IMAGENES/clb.jpg" },
    { name: "Heineken", desc: "", price: "$12.900", img: "IMAGENES/hei.jpg" },
    { name: "Corona Extra", desc: "", price: "$13.900", img: "IMAGENES/coro.jpg" },
    { name: "Stella Artois", desc: "", price: "$14.900", img: "IMAGENES/ste.jpg" },
    { name: "Smirnoff Ice", desc: "", price: "$15.900", img: "" },
  ],

  COCTEL: [
    { name: "Margarita", desc: "", price: "$28.000", img: "" },
    { name: "Daiquiri", desc: "Ron blanco, zumo de lima y azúcar.", price: "$28.000", img: "" },
    { name: "Cosmopolitan", desc: "Vodka, triple sec, zumo de limón, zumo de arándanos. ", price: "$29.000", img: "" },
    { name: "Mojito", desc: "Ron blanco, azúcar, yerbabuena y soda.", price: "$29.000", img: "" },
    { name: "Americano", desc: "Campari, Vermouth dulce y soda. ", price: "$30.000", img: "" },
    { name: "Tom Collins", desc: "Gin, zumo de limón, azúcar y soda.", price: "$30.000", img: "" },
    { name: "Southside", desc: "Gin, zumo de lima, azúcar y menta fresca.", price: "$30.000", img: "" },
    { name: "Piña Colada", desc: "Ron blanco, crema de coco y zumo de piña.", price: "$31.000", img: "" },
    { name: "Tequila Sunrise", desc: "Tequila, zumo de naranja y granadina.", price: "$31.000", img: "" },
    { name: "Mint Julep", desc: "Bourbon, azúcar y menta fresca.", price: "$32.000", img: "" },
    { name: "Vodka Sunsire", desc: "Vodka, zumo de naranja y granadina", price: "$32.000", img: "" },
    { name: "Moscow Mule", desc: "Vodka, zumo de limón y Ginger beer", price: "$33.000", img: "" },
    { name: "Coctel Neom", desc: "Smirnoff de tamarindo, tequila Plata, syrup de frutos rojos", price: "$35.000", img: "" },
    { name: "Boulevardier", desc: "Bourbon, Campari y Vermouth dulce.", price: "$36.000", img: "" },
    { name: "Old Fashioned", desc: "Whisky Bourbon, amargo de Angostura, azúcar y piel de naranja.", price: "$38.000", img: "" },
    { name: "Negroni", desc: "Gin, Campari y Vermouth dulce.", price: "$38.000", img: "" },
    { name: "God Father", desc: "Whisky escocés y licor de Amaretto.", price: "$40.000", img: "" },
    { name: "Manhattan", desc: "Whisky de centeno, Vermouth dulce y amargo de Angostura.", price: "$40.000", img: "" },
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
    { name: "Aguardiente Antioqueño Tapa Azul", desc: "", price: "$200.000", img: "IMAGENES/tazul.jpg" },
    { name: "Aguardiente Antioqueño Tapa Verde (Sin Azúcar)", desc: "", price: "$200.000", img: "IMAGENES/tverde.jpg" },
    { name: "Aguardiente Amarillo de Manzanares", desc: "", price: "$220.000", img: "IMAGENES/tama.jpg" },
  ],

  WHISKYS: [
    { name: "Buchanan’s Deluxe 12 años 750 ml", desc: "", price: "$340.000", img: "IMAGENES/bucdel.jpg" },
    { name: "Buchanan’s Master 750 ml", desc: "", price: "$390.000", img: "IMAGENES/bucm.jpg" },
    { name: "Buchanan’s 18 años 750 ml", desc: "", price: "$650.000", img: "IMAGENES/bucd.jpg" },
    { name: "Old Parr 12 años 750 ml", desc: "", price: "$330.000", img: "IMAGENES/oldp.jpg" },
    { name: "Whisky Johnnie Walker Black Label", desc: "", price: "$330.000", img: "IMAGENES/jonie.jpg" },
    { name: "The Glenlivet Single Malt Scotch Whisky", desc: "", price: "$320.000", img: "IMAGENES/glenli.jpg" },
    { name: "Whisky Johnnie Walker Gold Label Reserve", desc: "", price: "$650.000", img: "IMAGENES/joniegol.jpg" },
    { name: "Whiskey Jack Daniel’s ", desc: "", price: "$300.000", img: "IMAGENES/jack.jpg" },
  ],

  RON: [
    { name: "Ron Medellín Añejo 12 Años", desc: "", price: "$200.000", img: "IMAGENES/med.jpg" },
    { name: "Ron Zacapa Centenario 12 Años", desc: "", price: "$320.000", img: "IMAGENES/zaca.jpg" },
    { name: "Ron La Hechicera Reserva Familiar", desc: "", price: "$340.000", img: "IMAGENES/ronla.jpg" },
  ],

  GINEBRAS: [
    { name: "Ginebra Tanqueray London Dry Gin - 750 ml", desc: "", price: "$300.000", img: "IMAGENES/gitan.jpg" },
    { name: "Ginebra Hendrick’s Gin - 750 ml", desc: "", price: "$470.000", img: "IMAGENES/gihen.jpg" },
  ],

  TEQUILAS: [
    { name: "José Cuervo Especial Reposado - 750 ml", desc: "", price: "$250.000", img: "IMAGENES/josc.jpg" },
    { name: "Tequila Patrón Silver - 750 ml", desc: "", price: "$450.000", img: "IMAGENES/silp.jpg" },
    { name: "Tequila 1800 Reposado - 750 ml", desc: "", price: "$450.000", img: "IMAGENES/ter.jpg" },
    { name: "Tequila Don Julio Blanco - 750 ml", desc: "", price: "$470.000", img: "IMAGENES/teblanco.jpg" },
    { name: "Tequila Don Julio Reposado - 750 ml", desc: "", price: "$490.000", img: "IMAGENES/tereposado.jpg" },
    { name: "Tequila Don Julio 70 Cristalino - 750 ml", desc: "", price: "$650.000", img: "IMAGENES/tedoncri.jpg" },
  ],

  ADICIONALES: [
    { name: "Michelado", desc: "", price: "$3.000", img: "" },
    { name: "Aros de cebolla", desc: "", price: "$8.900", img: "" },
    { name: "Papas a la francesa", desc: "", price: "$9.000", img: "" },
    { name: "Papas casco", desc: "", price: "$9.000", img: "" },
    { name: "Chorizo argentino", desc: "", price: "$10.900", img: "" },
  ]
};

/* ===============================
   RESET SCROLL (SIDEBAR + CONTENIDO)
=============================== */
function resetMobileScroll({ sidebar: resetSidebar = false, content: resetContent = true } = {}) {
  const sidebar = document.querySelector('.sidebar');
  const menuContent = document.querySelector('.menu-content');

  if (resetSidebar && sidebar) sidebar.scrollTop = 0;
  if (resetContent && menuContent) menuContent.scrollTop = 0;
}

/* ===============================
   RENDERIZAR CATEGORÍA
=============================== */
function renderCategory(cat) {
  if (!data[cat]) cat = "Entradas";

  categoryTitle.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);

  itemsContainer.innerHTML = (data[cat] || [])
    .map((item, i) => `
      <div class="item">
        <div class="item-media">
          ${
            item.img
              ? `<img src="${item.img}?v=${IMG_V}" alt="${item.name}" loading="lazy"
                   onerror="this.closest('.item-media').innerHTML='<div class=\\'no-img\\'></div>'">`
              : `<div class="no-img"></div>`
          }
        </div>

        <div class="item-content">
          <h4>${item.name}</h4>
          <p>${item.desc}</p>
          <span class="price">${item.price}</span>
          <button class="ver-btn" data-cat="${cat}" data-index="${i}">VER</button>
        </div>
      </div>
    `)
    .join('');

  resetMobileScroll({ sidebar: false, content: true });
}

/* ===============================
   MODAL PRODUCTO
=============================== */
function openModal(cat, i) {
  const item = data[cat]?.[i];
  if (!item) return;

  modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <button class="close-modal">✕</button>
      ${item.img ? `<img src="${item.img}?v=${IMG_V}" alt="${item.name}">` : ""}
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

/* ===============================
   EVENTO VER PRODUCTO
=============================== */
itemsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('ver-btn')) {
    openModal(e.target.dataset.cat, Number(e.target.dataset.index));
  }
});

/* ===============================
   CAMBIAR CATEGORÍA
=============================== */
categoryList.addEventListener('click', e => {
  const li = e.target.closest('li');
  if (!li) return;

  document.querySelectorAll('.sidebar li').forEach(x => x.classList.remove('active'));
  li.classList.add('active');

  renderCategory(li.dataset.category);

  li.scrollIntoView({ block: 'nearest', inline: 'nearest' });
});

/* ===============================
   ABRIR MENÚ
=============================== */
menuBtn.addEventListener('click', () => {
  menuPanel.style.display = 'flex';
  resetMobileScroll({ sidebar: true, content: true });

  menuPanel.offsetHeight;
  menuPanel.classList.add('show');

  renderCategory('Entradas');

  document.querySelectorAll('.sidebar li').forEach(li => {
    li.classList.toggle('active', li.dataset.category === 'Entradas');
  });

  history.pushState(null, '', '#menu');
});

/* ===============================
   CERRAR MENÚ
=============================== */
closeMenu.addEventListener('click', () => {
  renderCategory('Entradas');
  document.querySelectorAll('.sidebar li').forEach(li => {
    li.classList.toggle('active', li.dataset.category === 'Entradas');
  });

  resetMobileScroll({ sidebar: true, content: true });

  menuPanel.classList.remove('show');
  setTimeout(() => (menuPanel.style.display = 'none'), 400);

  history.back();
});

/* ===============================
   RETROCESO NAVEGADOR
=============================== */
window.addEventListener('popstate', () => {
  if (menuPanel.classList.contains('show')) {
    menuPanel.classList.remove('show');
    setTimeout(() => (menuPanel.style.display = 'none'), 400);
  }
});

/* Render inicial */
renderCategory('Entradas');
