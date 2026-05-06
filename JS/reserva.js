/* =========================
   ELEMENTOS
========================= */
const reservaBtn = document.getElementById('reservaBtn');
const reservaPanel = document.getElementById('reservaPanel');
const closeReserva = document.getElementById('closeReserva');

const reservaCategoryList = document.getElementById('reservaCategoryList');
const reservaItemsContainer = document.getElementById('reservaItemsContainer');
const reservaCategoryTitle = document.getElementById('reservaCategoryTitle');

let reservaModal = null;

const IMG_V = "38";

/* =========================
   DATA INDEPENDIENTE
========================= */
const reservaData = {
  Entradas: [
    {
      name: "Entrada Premium",
      desc: "Solo disponible en reservas",
      price: "$50.000",
      img: "IMAGENES/fundidoqueso.jpg"
    },
    {
      name: "Tabla Especial",
      desc: "Mix exclusivo del chef",
      price: "$80.000",
      img: ""
    }
  ],
  BURGERS: [
    {
      name: "Burger VIP",
      desc: "Especial solo para reservas",
      price: "$60.000",
      img: "IMAGENES/burgerog.jpg"
    }
  ],
  HOTDOG: [
    {
      name: "Hot Dog Especial",
      desc: "Exclusivo",
      price: "$30.000",
      img: "IMAGENES/dogneom.jpg"
    }
  ]
};

/* ===============================
   RESET SCROLL (CLAVE MÓVIL)
=============================== */
function resetReservaScroll({ sidebar = true, content = true } = {}) {
  const side = reservaPanel.querySelector('.sidebar');
  const cont = reservaPanel.querySelector('.menu-content');

  if (sidebar && side) side.scrollTop = 0;
  if (content && cont) cont.scrollTop = 0;
}

/* =========================
   RENDER
========================= */
function renderReservaCategory(cat) {
  if (!reservaData[cat]) cat = "Entradas";

  reservaCategoryTitle.textContent = cat;

  reservaItemsContainer.innerHTML = reservaData[cat]
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

  resetReservaScroll({ sidebar: false, content: true });
}

/* =========================
   MODAL
========================= */
function openReservaModal(cat, i) {
  const item = reservaData[cat]?.[i];
  if (!item) return;

  reservaModal = document.createElement('div');
  reservaModal.classList.add('modal');

  reservaModal.innerHTML = `
    <div class="modal-content">
      <button class="close-modal">✕</button>
      ${item.img ? `<img src="${item.img}?v=${IMG_V}">` : ""}
      <h2>${item.name}</h2>
      <h3>${item.price}</h3>
      <p>${item.desc}</p>
    </div>
  `;

  document.body.appendChild(reservaModal);
  setTimeout(() => reservaModal.classList.add('show'), 10);

  reservaModal.querySelector('.close-modal')
    .addEventListener('click', closeReservaModal);
}

function closeReservaModal() {
  if (!reservaModal) return;

  reservaModal.classList.remove('show');
  setTimeout(() => {
    reservaModal.remove();
    reservaModal = null;
  }, 300);
}

/* =========================
   EVENTO VER
========================= */
reservaItemsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('ver-btn')) {
    openReservaModal(
      e.target.dataset.cat,
      Number(e.target.dataset.index)
    );
  }
});

/* =========================
   CATEGORÍAS
========================= */
reservaCategoryList.addEventListener('click', e => {
  const li = e.target.closest('li');
  if (!li) return;

  reservaCategoryList.querySelectorAll('li')
    .forEach(x => x.classList.remove('active'));

  li.classList.add('active');

  renderReservaCategory(li.dataset.category);

  li.scrollIntoView({ block: 'nearest', inline: 'nearest' });
});

/* =========================
   ABRIR (VERSIÓN MÓVIL CORRECTA)
========================= */
reservaBtn.addEventListener('click', () => {

  reservaPanel.style.display = 'flex';

  resetReservaScroll({ sidebar: true, content: true });

  reservaPanel.offsetHeight; // 🔥 fuerza render (CLAVE)
  reservaPanel.classList.add('show');

  renderReservaCategory('Entradas');

  reservaCategoryList.querySelectorAll('li').forEach(li => {
    li.classList.toggle('active', li.dataset.category === 'Entradas');
  });

  history.pushState(null, '', '#reserva');
});

/* =========================
   CERRAR
========================= */
closeReserva.addEventListener('click', () => {

  renderReservaCategory('Entradas');

  reservaCategoryList.querySelectorAll('li').forEach(li => {
    li.classList.toggle('active', li.dataset.category === 'Entradas');
  });

  resetReservaScroll({ sidebar: true, content: true });

  reservaPanel.classList.remove('show');

  setTimeout(() => {
    reservaPanel.style.display = 'none';
  }, 400);

  history.back();
});

/* =========================
   BOTÓN ATRÁS DEL CELULAR
========================= */
window.addEventListener('popstate', () => {
  if (reservaPanel.classList.contains('show')) {
    reservaPanel.classList.remove('show');
    setTimeout(() => {
      reservaPanel.style.display = 'none';
    }, 400);
  }
});