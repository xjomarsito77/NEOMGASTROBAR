/* =========================
   ESPERAR DOM (CLAVE)
========================= */
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTOS
  ========================= */
  const reservaBtn = document.getElementById('reservaBtn');
  const reservaPanel = document.getElementById('reservaPanel');
  const closeReserva = document.getElementById('closeReserva');

  const reservaCategoryList = document.getElementById('reservaCategoryList');
  const reservaItemsContainer = document.getElementById('reservaItemsContainer');
  const reservaCategoryTitle = document.getElementById('reservaCategoryTitle');

  if (!reservaBtn || !reservaPanel) {
    console.error("❌ No se encontraron elementos de RESERVA");
    return;
  }

  let reservaModal = null;

  /* =========================
     DATA
  ========================= */
  const reservaData = {
    Entradas: [
      {
        name: "Entrada Premium",
        desc: "Solo disponible en reservas",
        price: "$50.000",
        img: "IMAGENES/fundidoqueso.jpg"
      }
    ]
  };

  /* =========================
     RENDER
  ========================= */
  function renderReservaCategory(cat) {
    if (!reservaData[cat]) cat = "Entradas";

    reservaCategoryTitle.textContent = cat;

    reservaItemsContainer.innerHTML = reservaData[cat].map((item, i) => `
      <div class="item">
        <div class="item-media">
          ${
            item.img
              ? `<img src="${item.img}" alt="${item.name}">`
              : `<div class="no-img"></div>`
          }
        </div>

        <div class="item-content">
          <h4>${item.name}</h4>
          <p>${item.desc}</p>
          <span class="price">${item.price}</span>
        </div>
      </div>
    `).join('');
  }

  /* =========================
     ABRIR
  ========================= */
  reservaBtn.addEventListener('click', () => {
    console.log("✅ CLICK FUNCIONA");

    reservaPanel.style.display = 'flex';

    // fuerza animación
    reservaPanel.offsetHeight;

    reservaPanel.classList.add('show');

    renderReservaCategory('Entradas');
  });

  /* =========================
     CERRAR
  ========================= */
  if (closeReserva) {
    closeReserva.addEventListener('click', () => {
      reservaPanel.classList.remove('show');

      setTimeout(() => {
        reservaPanel.style.display = 'none';
      }, 400);
    });
  }

});