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

/* =========================
   RESET SCROLL
========================= */
function resetReservaScroll() {
  const sidebar = reservaPanel.querySelector('.sidebar');
  const content = reservaPanel.querySelector('.menu-content');

  if (sidebar) sidebar.scrollTop = 0;
  if (content) content.scrollTop = 0;
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
              ? `<img src="${item.img}" alt="${item.name}" 
                   onerror="this.parentElement.innerHTML='<div class=\\'no-img\\'></div>'">`
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

  resetReservaScroll();
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
      ${item.img ? `<img src="${item.img}">` : ""}
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

  li.scrollIntoView({ block: 'nearest' });
});

/* =========================
   ABRIR
========================= */
reservaBtn.addEventListener('click', () => {
  reservaPanel.style.display = 'flex';

  reservaPanel.offsetHeight;
  reservaPanel.classList.add('show');

  renderReservaCategory('Entradas');

  reservaCategoryList.querySelectorAll('li').forEach(li => {
    li.classList.toggle('active', li.dataset.category === 'Entradas');
  });
});

/* =========================
   CERRAR
========================= */
closeReserva.addEventListener('click', () => {
  reservaPanel.classList.remove('show');

  setTimeout(() => {
    reservaPanel.style.display = 'none';
  }, 400);
});