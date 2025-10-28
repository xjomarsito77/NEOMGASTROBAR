const menuBtn = document.getElementById('menuBtn');
const menuPanel = document.getElementById('menuPanel');
const closeMenu = document.getElementById('closeMenu');
const categoryList = document.getElementById('categoryList');
const categoryTitle = document.getElementById('categoryTitle');
const itemsContainer = document.getElementById('itemsContainer');

let modal;

// Base de datos
const data = {
  hotdogs: [
    { name: "Sweet Bacon", desc: "Salchicha premium, queso americano fundido, cebolla caramelizada, polvo de tocineta, cebolla blanca, mayo ahumada y pan artesanal. Todos nuestros hot dogs vienen acompañados de papas a la francesa y salsa de la casa.", 
    price: "$31.900", img: "IMAGENES/LOGO.jpg" },

    { name: "Pulled Pork", desc: "Salchicha premium, pulled pork en salsa BBQ, mayo ahumada y pan artesanal.", price: "$31.900", img: "hotdog2.jpg" },
    { name: "Suizo Garage", desc: "Salchicha suiza, queso mozzarella, polvo de tocineta, salsa de la casa y pan artesanal.", price: "$31.900", img: "hotdog3.jpg" }
  ],
  burgers: [
    { name: "Classic Burger", desc: "Carne 150g, queso cheddar, lechuga, tomate y pan brioche.", price: "$28.900", img: "burger1.jpg" },
    { name: "BBQ Smokehouse", desc: "Carne ahumada, queso americano, cebolla caramelizada, BBQ artesanal.", price: "$32.900", img: "burger2.jpg" }
  ],
  Almuerzos: [
    { name: "Pechuga a la plancha", desc: "Acompañada de arroz, papas criollas y ensalada fresca.", price: "$24.900", img: "almuerzo1.jpg" },
    { name: "Lomo en salsa de champiñones", desc: "Corte de res en salsa cremosa con papas y ensalada.", price: "$29.900", img: "almuerzo2.jpg" }
  ],
  Asados: [
    { name: "Costillas BBQ", desc: "Costillas de cerdo bañadas en salsa BBQ con papas rústicas y ensalada.", price: "$36.900", img: "asado1.jpg" },
    { name: "Churrasco", desc: "Corte de res a la parrilla, acompañado de papas y chimichurri.", price: "$38.900", img: "asado2.jpg" }
  ],
  bebidas: [
    { name: "Gaseosa", desc: "Coca-Cola, Sprite, Pepsi u otras opciones.", price: "$6.000", img: "bebida1.jpg" },
    { name: "Limonada natural", desc: "Refrescante y hecha al momento.", price: "$9.000", img: "bebida2.jpg" }
  ],
  Licores: [
    { name: "Cerveza artesanal", desc: "Variedades locales y de importación.", price: "$12.000", img: "licor1.jpg" },
    { name: "Whisky", desc: "Por copa o botella, selección premium.", price: "$20.000", img: "licor2.jpg" }
  ],
  postres: [
    { name: "Brownie con helado", desc: "Brownie caliente con bola de helado de vainilla.", price: "$12.900", img: "postre1.jpg" },
    { name: "Cheesecake de frutos rojos", desc: "Base de galleta y salsa de frutos rojos frescos.", price: "$13.900", img: "postre2.jpg" }
  ]
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
    setTimeout(() => modal.remove(), 900);
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

  // Mostrar Hot Dogs por defecto
  renderCategory('Almuerzos');

  // Activar visualmente el botón de Hot Dogs
  document.querySelectorAll('.sidebar li').forEach(li => {
    if (li.dataset.category === 'Almuerzos') li.classList.add('active');
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


