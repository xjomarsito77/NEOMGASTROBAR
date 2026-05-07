const menuBtn = document.getElementById('menuBtn');
const menuPanel = document.getElementById('menuPanel');
const closeMenu = document.getElementById('closeMenu');
const categoryList = document.getElementById('categoryList');
const categoryTitle = document.getElementById('categoryTitle');
const itemsContainer = document.getElementById('itemsContainer');

let modal = null;

const IMG_V ="38"

/* ===============================
   VALIDAR ELEMENTOS
=============================== */
if (!menuBtn || !menuPanel || !categoryList || !itemsContainer) {
  console.error("Faltan elementos del DOM");
}

/* ===============================
   BASE DE DATOS
=============================== */
const data = {
  Entradas: [
    { name: "Fundido De Quesos", desc: "Mezcla de queso cheddar y queso blanco fundidos, acompañados de ragú de carne molida, cebolla encurtida y salsa de ajo.", price: "$33.000", img: "IMAGENES/fundidoqueso.jpg" },
    { name: "Onion Rings", desc: "Doce (12) aros de cebolla crujientes, acompañados de salsa de pepinillo.", price: "$27.000", img: "IMAGENES/onion.jpg" },
    { name: "Ceviche Neom", desc: "Cubos de tilapia marinados en leche de tigre, acompañados de salsa de cilantro, wonton crujiente, aguacate, cebolla encurtida y un toque de tajín.", price: "$40.000", img: "IMAGENES/cevicheneom.jpg" },
    { name: "Nachos Carne Molida", desc: "Totopos crujientes cubiertos con carne molida, queso amarillo y queso blanco, acompañados de pico de gallo, guacamole, sour cream y jalapeños.", price: "$35.000", img: "IMAGENES/nachoscarne.jpg" },
    { name: "Mozzarella Fingers", desc: "Palitos de mozzarella apanados y dorados, acompañados de salsa napolitana.", price: "$30.000", img: "IMAGENES/mozzafin.jpg" },
    { name: "Mini Hot Dog x3", desc: "Tres (3) mini hot dogs en pan artesano, con salchicha ranchera, salsa de ajo, dip dulce y salado, y salsa de la casa.", price: "$36.000", img: "IMAGENES/triodog.jpg" },
    { name: "Mini Choripanes x3", desc: "Tres (3) mini choripanes en pan artesano, con chorizo, salsa de ajo y chimichurri.", price: "$36.000", img: "IMAGENES/choripan.jpg" },
    { name: "Ronda De Tacos x3", desc: "Tres (3) tacos surtidos: pollo crispy con salsa de ajo; cochinita con BBQ y chipotle; y carne asada con pico de gallo.", price: "$35.000", img: "IMAGENES/tacos.jpg" },
    { name: "Mini Burger x3", desc: "Tres (3) mini hamburguesas con la receta especial del chef.", price: "$36.000", img: "IMAGENES/triomin.png" },
    { name: "Copa Ceviche Neom", desc: "Ceviche caribeño de camarón con chips de plátano", price: "$28.900", img: "IMAGENES/copaneom.jpeg" },
    { name: "Ceviche La hoguera", desc: "Ceviche de chicharrón y chorizo con trozos de plátano maduro, cebolla en pluma y pimentones ahumados en leche de tigre, servido sobre wonton crujiente con salsa de la casa.", price: "$35.000", img: "IMAGENES/hoguera.jpg" }
  ],

  ENSALADAS: [
    { name: "Ensalada César", desc: "Mix de lechugas, croutones, queso parmesano y salsa César. Acompañada de pechuga de pollo crispy o a la plancha.", price: "$35.000", img: "IMAGENES/ensalada.jpg" }
  ],

  ALMUERZOS: [
    { name: "Pollo Saltado", desc: "Arroz saltado con verduras, soya, jengibre y ajonjolí. Acompañado de pollo en cubos, tomate, cebolla roja y papas a la francesa.", price: "$37.000", img: "IMAGENES/pollosal.jpg" },
    { name: "Lomo Saltado", desc: "Arroz saltado con verduras, soya, jengibre y ajonjolí. Acompañado de lomo en cubos, tomate, cebolla roja y papas a la francesa.", price: "$40.000", img: "IMAGENES/lomosal.jpg" },
    { name: "Pollo Cremoso", desc: "Arroz saltado con tocineta y champiñones en crema de leche y parmesano. Acompañado de pechuga de pollo y cebollín.", price: "$39.000", img: "IMAGENES/lomocremoso.jpg" },
    { name: "Lomo Cremoso", desc: "Arroz saltado con tocineta y champiñones en crema de leche y parmesano. Acompañado de lomo y cebollín.", price: "$40.000", img: "IMAGENES/lomocre.jpg" },
    { name: "Arroz de Camarón y Chorizo", desc: "Arroz saltado con verduras, jengibre y ajonjolí. Acompañado de camarones salteados con chorizo artesanal de cerdo.", price: "$43.000", img: "IMAGENES/arrozcama.jpg" },
    { name: "Wok Neom", desc: "Arroz saltado con pollo, lomo, chorizo artesanal, raíz china, wonton frito y chicharrón crujiente.", price: "$50.000", img: "IMAGENES/wokneom.jpg" },
    { name: "Salmón Neom", desc: "Arroz saltado cremoso con tocineta y champiñones, terminado con parmesano y acompañado de salmón en salsa teriyaki.", price: "$57.000", img: "IMAGENES/salmonew.jpg" }
  ],

  CORTES_CARNES: [
    { name: "Pechuga de Pollo", desc: "Acompañada de papas a la francesa o cascos y ensalada coleslaw.", price: "$45.000", img: "IMAGENES/pechugacorte.jpg" },
    { name: "Lomo de Cerdo", desc: "Acompañada de papas a la francesa o cascos y ensalada coleslaw.", price: "$45.000", img: "IMAGENES/pechuga.jpg" },
    { name: "Baby Beef", desc: "Acompañada de papas a la francesa o cascos y ensalada coleslaw.", price: "$58.000", img: "IMAGENES/baby.jpg" },
    { name: "Costillas BBQ", desc: "Acompañada de papas a la francesa o cascos y ensalada coleslaw.", price: "$57.000", img: "IMAGENES/costillasbbq.jpg" },
    { name: "Picanha", desc: "Acompañada de papas a la francesa o cascos y ensalada coleslaw.", price: "$90.000", img: "IMAGENES/cortepica.jpg" },
    { name: "New York", desc: "Acompañada de papas a la francesa o cascos y ensalada coleslaw.", price: "$100.000", img: "IMAGENES/newyork.jpg" },
    { name: "Rib Eye", desc: "Acompañada de papas a la francesa o cascos y ensalada coleslaw.", price: "$110.000", img: "IMAGENES/ribeye.jpg" }
  ],

  PASTAS: [
    { name: "Pasta Boloñesa", desc: "Fettuccine con salsa boloñesa tradicional, pasta de ajo y jengibre. Terminado con queso parmesano.", price: "$38.000", img: "IMAGENES/pastabolo.jpg" }
  ],

  COMPARTIR: [
    { name: "Parrillada Neom", desc: "Tenders de pollo y pescado, costilla BBQ, chorizo, picanha, chicharrón, papas casco y variedad de salsas de la casa.", price: "$150.000", img: "IMAGENES/parrillada.jpg" }
  ],

  BURGERS: [
    { name: "La Jefa", desc: "Pan artesano con filete de pescado apanado, cebolla cevichada con leche de tigre, lechuga romana,  mix de quezos mozzarella y cheddar. Servida con papas. ", price: "$36.000", img: "IMAGENES/jefaham.png" },
    { name: "Chori Burger", desc: "Pan artesano con carne de chorizo, mozzarella, salsa chipotle, tomate y lechuga. Servida con papas.", price: "$45.000", img: "IMAGENES/chori.jpg" },
    { name: "Burger Crispy Cesar", desc: "Pan artesano con pollo apanado, mozzarella y salsa de ajo, con mix de lechugas y parmesano. Servida con papas.", price: "$44.000", img: "IMAGENES/crisp.jpg" },
    { name: "Cheese Bacon Burger", desc: "Pan artesano con carne burger, queso amarillo, tocineta, cebolla roja y pepinillos. Servida con papas.", price: "$44.000", img: "IMAGENES/bacon.jpg" },
    { name: "Burger OG", desc: "Carne burger, doble queso, chorizo artesanal, tocineta y salsas de la casa. Servida con papas.", price: "$48.000", img: "IMAGENES/burgerog.jpg" },
    { name: "Spicy & Sweet Burger", desc: "Carne burger, mozzarella, pimentones caramelizados y salsa de la casa. Servida con papas.", price: "$45.000", img: "IMAGENES/spicy.jpg" },
    { name: "Burger Whopper", desc: "Carne burger, mozzarella apanado, cebolla caramelizada y tocineta. Servida con papas.", price: "$46.000", img: "IMAGENES/whop.jpg" },
    { name: "The Big Boss", desc: "Doble carne burger, doble queso cheddar, doble tocineta y salsa de la casa. Servida con papas.", price: "$46.000", img: "IMAGENES/hamburguesan.png" },
    { name: "La Tentacion", desc: "Pan artesano con 150g de carne angus, queso costeño asado, patacón de maduro y tocineta ahumada, terminado con guacamole y sour cream. Acompañada de papas a la francesa.", price: "$43.900", img: "IMAGENES/tentacion.jpg" }
  ],

  HOTDOG: [
    { name: "Hot Dog Americano", desc: "Salchicha americana, cebolla blanca, relish y papita ripio. Acompañado de papas a la francesa.", price: "$25.000", img: "IMAGENES/americano.jpg" },
    { name: "Hot Dog Neom", desc: "Salchicha ranchera, salsa de ajo y dip dulce & salado. Acompañado de papas a la francesa.", price: "$28.000", img: "IMAGENES/dogneom.jpg" },
    { name: "Hot Dog Suizo", desc: "Salchicha suiza, queso mozzarella y chimichurri. Acompañado de papas a la francesa.", price: "$35.000", img: "IMAGENES/dogsuizo.jpg" }
  ],

  SANDWICHES: [
    { name: "Sándwich de Pork Belly", desc: "Pork belly crujiente, salsa de ajo y cebolla encurtida en pan artesano. Con papas.", price: "$39.000", img: "IMAGENES/pork.jpg" },
    { name: "Sándwich de Lomo", desc: "Lomo fino, mozzarella, pepinillos y salsa de queso azul en pan artesano. Con papas.", price: "$49.000", img: "IMAGENES/sandwichlomo.jpg" },
    { name: "Club Sándwich", desc: "Pechuga de pollo, jamón de pavo, mozzarella, tocineta, lechuga y tomate. Con papas.", price: "$48.000", img: "IMAGENES/clubss.jpg" }
  ],

  KIDS: [
    { name: "Chicken Tenders", desc: "Tiras de pollo apanado (6 unidades) con papas a la francesa y salsa de tomate.", price: "$25.000", img: "IMAGENES/chikenkids.jpg" },
    { name: "Cheese Burger Kids", desc: "Carne burger, queso cheddar y salsa de tomate. Servida con papas a la francesa.", price: "$25.000", img: "IMAGENES/burgerkids.jpg" }
  ],

  POSTRES: [
    { name: "Cheesecake Frutos Rojos", desc: "Cremoso con compota artesanal de frutos del bosque.", price: "$18.000", img: "IMAGENES/cheesecake.jpg" }
  ],

  BEBIDAS: [
    { name: "Agua Hatsu", desc: "", price: "$7.500", img: "IMAGENES/aguaa.jpg" },
    { name: "Soda Bretaña", desc: "", price: "$8.900", img: "IMAGENES/bretaña.jpg" },
    { name: "Pepsi", desc: "", price: "$8.900", img: "IMAGENES/pepsii.jpg" },
    { name: "Ginger Canada Dry", desc: "", price: "$8.900", img: "IMAGENES/canadry.jpg" },
    { name: "Soda Hatsu", desc: "", price: "$10.900", img: "IMAGENES/sodah.jpg" },
    { name: "Te Hatsu", desc: "", price: "$10.900", img: "IMAGENES/te.jpg" },
    { name: "Jugo de Mandarina", desc: "", price: "$11.900", img: "IMAGENES/mandarina.jpg" },
    { name: "Limonada Cerezada", desc: "", price: "$11.900", img: "IMAGENES/cerezada.jpg" },
    { name: "Limonada Coco", desc: "", price: "$11.900", img: "IMAGENES/coco.jpg" },
    { name: "Limonada Hierbabuena", desc: "", price: "$11.900", img: "IMAGENES/hierbabuena.jpg" },
    { name: "Soda Frutos rojos", desc: "Elaborada a base de Hatsu.", price: "$18.900", img: "IMAGENES/frutorojo.jpg" },
    { name: "Soda Frutos Amarillos", desc: "Elaborada a base de Hatsu.", price: "$18.900", img: "IMAGENES/amarillo.jpg" },
    { name: "Soda de Lyche", desc: "Elaborada a base de Hatsu.", price: "$18.900", img: "IMAGENES/liche.jpg" },
    { name: "Soda Lulo house", desc: "Elaborada a base de Hatsu.", price: "$18.900", img: "IMAGENES/slulo.jpg" },
    { name: "Red Bull", desc: "Clásica, Sugarfree o Red Edition.", price: "$15.900", img: "IMAGENES/redbull.jpg" },
    { name: "Gatorade", desc: "", price: "$11.900", img: "IMAGENES/gatorade.jpg" }
  ],

  CERVEZAS: [
    { name: "Costeñita", desc: "", price: "$7.900", img: "IMAGENES/coste.jpg" },
    { name: "Budweiser", desc: "", price: "$9.900", img: "IMAGENES/bud.jpg" },
    { name: "Club Colombia Dorada", desc: "", price: "$10.900", img: "IMAGENES/clb.jpg" },
    { name: "Heineken", desc: "", price: "$12.900", img: "IMAGENES/hei.jpg" },
    { name: "Corona Extra", desc: "", price: "$13.900", img: "IMAGENES/coro.jpg" },
    { name: "Stella Artois", desc: "", price: "$14.900", img: "IMAGENES/ste.jpg" },
    { name: "Smirnoff Ice", desc: "", price: "$15.900", img: "IMAGENES/smirnof.jpg" }
  ],

  COCTEL: [
    { name: "Margarita", desc: "Tequila, triple sec y zumo de limón.", price: "$28.000", img: "" },
    { name: "Mojito", desc: "Ron blanco, azúcar, yerbabuena y soda.", price: "$29.000", img: "" },
    { name: "Piña Colada", desc: "Ron blanco, crema de coco y zumo de piña.", price: "$31.000", img: "" },
    { name: "Moscow Mule", desc: "Vodka, zumo de limón y Ginger beer.", price: "$33.000", img: "" },
    { name: "Old Fashioned", desc: "Whisky Bourbon, amargo de Angostura y piel de naranja.", price: "$38.000", img: "" },
    { name: "Negroni", desc: "Gin, Campari y Vermouth dulce.", price: "$38.000", img: "" }
  ],

  VINOS: [
    { name: "Copa vino tinto", desc: "", price: "$32.900", img: "IMAGENES/copt.jpg" },
    { name: "Copa vino blanco", desc: "", price: "$32.900", img: "IMAGENES/copb.jpg" },
    { name: "Copa vino rosado", desc: "", price: "$32.900", img: "IMAGENES/copr.jpg" },
    { name: "Botella vino tinto", desc: "", price: "$130.000", img: "IMAGENES/vint.jpg" },
    { name: "Botella vino blanco", desc: "", price: "$130.000", img: "IMAGENES/vinb.jpg" },
    { name: "Botella vino rosado", desc: "", price: "$130.000", img: "IMAGENES/vinr.jpg" },
  ],

  AGUARDIENTES: [
    { name: "Aguardiente Antioqueño Tapa Azul", desc: "Botella 750 ml", price: "$200.000", img: "IMAGENES/tazul.jpg" },
    { name: "Aguardiente Antioqueño Tapa Verde", desc: "Sin azúcar - 750 ml", price: "$200.000", img: "IMAGENES/tverde.jpg" },
    { name: "Aguardiente Amarillo de Manzanares", desc: "750 ml", price: "$220.000", img: "IMAGENES/tama.jpg" },
  ],

  WHISKYS: [
    { name: "Buchanan’s Deluxe 12 años", desc: "750 ml", price: "$340.000", img: "IMAGENES/bucdel.jpg" },
    { name: "Buchanan’s Master", desc: "750 ml", price: "$390.000", img: "IMAGENES/bucm.jpg" },
    { name: "Buchanan’s 18 años", desc: "750 ml", price: "$650.000", img: "IMAGENES/bucd.jpg" },
    { name: "Old Parr 12 años", desc: "750 ml", price: "$330.000", img: "IMAGENES/oldp.jpg" },
    { name: "Johnnie Walker Black Label", desc: "750 ml", price: "$330.000", img: "IMAGENES/jonie.jpg" },
    { name: "The Glenlivet Single Malt", desc: "750 ml", price: "$320.000", img: "IMAGENES/glenli.jpg" },
    { name: "Johnnie Walker Gold Label Reserve", desc: "750 ml", price: "$650.000", img: "IMAGENES/joniegol.jpg" },
    { name: "Whiskey Jack Daniel’s", desc: "750 ml", price: "$300.000", img: "IMAGENES/jack.jpg" },
  ],

  RON: [
    { name: "Ron Medellín Añejo 12 Años", desc: "750 ml", price: "$200.000", img: "IMAGENES/med.jpg" },
    { name: "Ron Zacapa Centenario 12 Años", desc: "750 ml", price: "$320.000", img: "IMAGENES/zaca.jpg" },
    { name: "Ron La Hechicera Reserva Familiar", desc: "750 ml", price: "$340.000", img: "IMAGENES/ronla.jpg" },
  ],

  GINEBRAS: [
    { name: "Tanqueray London Dry Gin", desc: "750 ml", price: "$300.000", img: "IMAGENES/gitan.jpg" },
    { name: "Hendrick’s Gin", desc: "750 ml", price: "$470.000", img: "IMAGENES/gihen.jpg" },
  ],

  TEQUILAS: [
    { name: "José Cuervo Especial Reposado", desc: "750 ml", price: "$250.000", img: "IMAGENES/josc.jpg" },
    { name: "Tequila Patrón Silver", desc: "750 ml", price: "$450.000", img: "IMAGENES/silp.jpg" },
    { name: "Tequila 1800 Reposado", desc: "750 ml", price: "$450.000", img: "IMAGENES/ter.jpg" },
    { name: "Tequila Don Julio Blanco", desc: "750 ml", price: "$470.000", img: "IMAGENES/teblanco.jpg" },
    { name: "Tequila Don Julio Reposado", desc: "750 ml", price: "$490.000", img: "IMAGENES/tereposado.jpg" },
    { name: "Tequila Don Julio 70 Cristalino", desc: "750 ml", price: "$650.000", img: "IMAGENES/tedoncri.jpg" },
  ],

  ADICIONALES: [
    { name: "Michelado", desc: "", price: "$3.000", img: "" },
    { name: "Aros de cebolla", desc: "", price: "$8.900", img: "" },
    { name: "Papas a la francesa", desc: "", price: "$9.000", img: "" },
    { name: "Papas casco", desc: "", price: "$9.000", img: "" },
    { name: "Chorizo argentino", desc: "", price: "$10.900", img: "" }
  ]
}


/* ===============================
   FORMATEAR CATEGORÍA
=============================== */
function formatCategory(cat) {
  return cat
    .replaceAll('_', ' ')
    .toLowerCase()
    .replace(/\b\w/g, l => l.toUpperCase());
}

/* ===============================
   RESET SCROLL
=============================== */
function resetMobileScroll({
  sidebar: resetSidebar = false,
  content: resetContent = true
} = {}) {

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

  categoryTitle.textContent = formatCategory(cat);

  const items = data[cat] || [];

  itemsContainer.innerHTML = items.map((item, i) => `
    <div class="item">

      <div class="item-media">

        ${
          item.img
            ? `
              <img
                src="${item.img}?v=${IMG_V}"
                alt="${item.name}"
                loading="lazy"
                decoding="async"
                onerror="this.style.display='none'"
              >
            `
            : `<div class="no-img"></div>`
        }

      </div>

      <div class="item-content">

        <h4>${item.name}</h4>

        <p>${item.desc}</p>

        <span class="price">${item.price}</span>

        <button
          class="ver-btn"
          data-cat="${cat}"
          data-index="${i}"
        >
          VER
        </button>

      </div>

    </div>
  `).join('');

  resetMobileScroll({
    sidebar: false,
    content: true
  });
}

/* ===============================
   ABRIR MODAL
=============================== */
function openModal(cat, i) {

  if (modal) return;

  const item = data[cat]?.[i];

  if (!item) return;

  modal = document.createElement('div');

  modal.classList.add('modal');

  modal.innerHTML = `
    <div class="modal-content">

      <button class="close-modal">✕</button>

      ${
        item.img
          ? `
            <img
              src="${item.img}?v=${IMG_V}"
              alt="${item.name}"
            >
          `
          : ""
      }

      <h2>${item.name}</h2>

      <h3>${item.price}</h3>

      <p>${item.desc}</p>

    </div>
  `;

  document.body.appendChild(modal);

  setTimeout(() => {
    modal.classList.add('show');
  }, 10);

  document
    .querySelector('.close-modal')
    .addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

/* ===============================
   CERRAR MODAL
=============================== */
function closeModal() {

  if (!modal) return;

  modal.classList.remove('show');

  setTimeout(() => {

    modal?.remove();

    modal = null;

  }, 300);
}

/* ===============================
   EVENTO VER PRODUCTO
=============================== */
itemsContainer.addEventListener('click', e => {

  if (!e.target.classList.contains('ver-btn')) return;

  openModal(
    e.target.dataset.cat,
    Number(e.target.dataset.index)
  );

});

/* ===============================
   CAMBIAR CATEGORÍA
=============================== */
categoryList.addEventListener('click', e => {

  const li = e.target.closest('li');

  if (!li) return;

  document
    .querySelectorAll('.sidebar li')
    .forEach(x => x.classList.remove('active'));

  li.classList.add('active');

  renderCategory(li.dataset.category);

  li.scrollIntoView({
    block: 'nearest',
    inline: 'nearest'
  });

});

/* ===============================
   ABRIR MENÚ
=============================== */
menuBtn.addEventListener('click', () => {

  menuPanel.style.display = 'flex';

  resetMobileScroll({
    sidebar: true,
    content: true
  });

  menuPanel.offsetHeight;

  menuPanel.classList.add('show');

  renderCategory('Entradas');

  document
    .querySelectorAll('.sidebar li')
    .forEach(li => {

      li.classList.toggle(
        'active',
        li.dataset.category === 'Entradas'
      );

    });

  history.pushState(null, '', '#menu');

});

/* ===============================
   CERRAR MENÚ
=============================== */
function closeMenuPanel() {

  renderCategory('Entradas');

  document
    .querySelectorAll('.sidebar li')
    .forEach(li => {

      li.classList.toggle(
        'active',
        li.dataset.category === 'Entradas'
      );

    });

  resetMobileScroll({
    sidebar: true,
    content: true
  });

  menuPanel.classList.remove('show');

  setTimeout(() => {
    menuPanel.style.display = 'none';
  }, 400);

  if (window.location.hash === '#menu') {
    history.back();
  }
}

closeMenu.addEventListener('click', closeMenuPanel);

/* ===============================
   RETROCESO NAVEGADOR
=============================== */
window.addEventListener('popstate', () => {

  if (menuPanel.classList.contains('show')) {

    menuPanel.classList.remove('show');

    setTimeout(() => {
      menuPanel.style.display = 'none';
    }, 400);

  }

});

/* ===============================
   TECLA ESC
=============================== */
document.addEventListener('keydown', e => {

  if (e.key !== 'Escape') return;

  if (modal) {

    closeModal();

  } else if (menuPanel.classList.contains('show')) {

    closeMenuPanel();

  }

});

/* ===============================
   RENDER INICIAL
=============================== */
renderCategory('Entradas');