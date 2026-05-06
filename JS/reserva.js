document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTOS
  ========================= */
  const reservaBtn = document.getElementById('reservaBtn');
  const reservaPanel = document.getElementById('reservaPanel');
  const closeReserva = document.getElementById('closeReserva');

  const reservaItemsContainer = document.getElementById('reservaItemsContainer');
  const reservaCategoryTitle = document.getElementById('reservaCategoryTitle');

  if (!reservaBtn || !reservaPanel) {
    console.error("❌ No se encontraron elementos de RESERVA");
    return;
  }

  let reservaModal = null;

  /* =========================
     PEDIDO
  ========================= */
  let reservaPedido = [];

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
    ],

    PRUEBA: [
      {
        name: "Hamburguesa Especial",
        desc: "Con papas y salsa",
        price: "$35.000",
        img: "IMAGENES/fundidoqueso.jpg"
      }
    ],

    PRUEBA2: [
      {
        name: "Hot Dog Premium",
        desc: "Grande con tocineta",
        price: "$28.000",
        img: "IMAGENES/fundidoqueso.jpg"
      }
    ]

  };

  /* =========================
     RENDER CATEGORÍA
  ========================= */
  function renderReservaCategory(cat) {

    if (!reservaData[cat]) return;

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

          <div class="item-buttons">

            <button class="ver-btn" data-index="${i}" data-category="${cat}">
              VER
            </button>

            <button class="reservar-btn" data-index="${i}" data-category="${cat}">
              RESERVAR
            </button>

          </div>

        </div>

      </div>
    `).join('');

    /* =========================
       EVENTOS BOTÓN VER
    ========================= */
    document.querySelectorAll('.ver-btn').forEach(btn => {

      btn.addEventListener('click', (e) => {

        const index = e.target.dataset.index;
        const category = e.target.dataset.category;

        const item = reservaData[category][index];

        abrirModal(item);

      });

    });

    /* =========================
       EVENTOS BOTÓN RESERVAR
    ========================= */
    document.querySelectorAll('.reservar-btn').forEach(btn => {

      btn.addEventListener('click', (e) => {

        const index = e.target.dataset.index;
        const category = e.target.dataset.category;

        const item = reservaData[category][index];

        agregarReserva(item);

      });

    });

  }

  /* =========================
     EVENTOS CATEGORÍAS
  ========================= */
  document.querySelectorAll('#reservaCategoryList li').forEach(li => {

    li.addEventListener('click', () => {

      document.querySelectorAll('#reservaCategoryList li')
        .forEach(el => el.classList.remove('active'));

      li.classList.add('active');

      const category = li.dataset.category;

      renderReservaCategory(category);

    });

  });

  /* =========================
     ABRIR PANEL
  ========================= */
  reservaBtn.addEventListener('click', () => {

    reservaPanel.style.display = 'flex';

    reservaPanel.offsetHeight;

    reservaPanel.classList.add('show');

    renderReservaCategory('Entradas');

  });

  /* =========================
     CERRAR PANEL
  ========================= */
  if (closeReserva) {

    closeReserva.addEventListener('click', () => {

      reservaPanel.classList.remove('show');

      setTimeout(() => {
        reservaPanel.style.display = 'none';
      }, 400);

    });

  }

  /* =========================
     MODAL
  ========================= */
  function abrirModal(item) {

    if (reservaModal) {
      reservaModal.remove();
    }

    reservaModal = document.createElement('div');

    reservaModal.classList.add('modal');

    reservaModal.innerHTML = `
      <div class="modal-content">

        <button class="close-modal">&times;</button>

        ${
          item.img
            ? `<img src="${item.img}" alt="${item.name}">`
            : ''
        }

        <h3>${item.name}</h3>

        <p>${item.desc}</p>

        <span class="price">${item.price}</span>

      </div>
    `;

    document.body.appendChild(reservaModal);

    setTimeout(() => {
      reservaModal.classList.add('show');
    }, 10);

    reservaModal
      .querySelector('.close-modal')
      .addEventListener('click', cerrarModal);

    reservaModal.addEventListener('click', (e) => {

      if (e.target === reservaModal) {
        cerrarModal();
      }

    });

  }

  /* =========================
     CERRAR MODAL
  ========================= */
  function cerrarModal() {

    reservaModal.classList.remove('show');

    setTimeout(() => {

      reservaModal.remove();

      reservaModal = null;

    }, 300);

  }

  /* =========================
     AGREGAR RESERVA
  ========================= */
  function agregarReserva(item) {

    const existe = reservaPedido.find(p => p.name === item.name);

    if (existe) {
      existe.cantidad++;
    } else {

      reservaPedido.push({
        ...item,
        cantidad: 1
      });

    }

    actualizarPanelReserva();

  }

  /* =========================
     PANEL RESERVA
  ========================= */
  function actualizarPanelReserva() {

    let panel = document.getElementById('pedidoPanel');

    if (!panel) {

      panel = document.createElement('div');

      panel.id = 'pedidoPanel';

      document.body.appendChild(panel);

    }

    panel.innerHTML = `

      <h3>🛒 Tu Reserva</h3>

      ${reservaPedido.map(item => `
        <div class="pedido-item">
          <span>${item.name} x${item.cantidad}</span>
        </div>
      `).join('')}

      <div class="cliente-form">

        <input 
          type="text" 
          id="clienteNombre" 
          placeholder="Nombre del cliente"
        >

        <input 
          type="tel" 
          id="clienteTelefono" 
          placeholder="Número telefónico"
        >

        <input 
          type="date" 
          id="clienteFecha"
        >

        <input 
          type="time" 
          id="clienteHora"
        >

        <input 
          type="number" 
          id="clientePersonas" 
          placeholder="Cantidad de personas"
        >

        <textarea 
          id="clienteNotas"
          placeholder="Notas adicionales"
        ></textarea>

      </div>

      <button id="enviarWhatsapp">
        ENVIAR POR WHATSAPP
      </button>

    `;

    document
      .getElementById('enviarWhatsapp')
      .addEventListener('click', enviarWhatsapp);

  }

  /* =========================
     WHATSAPP
  ========================= */
  function enviarWhatsapp() {

    const nombre =
      document.getElementById('clienteNombre').value;

    const telefono =
      document.getElementById('clienteTelefono').value;

    const fecha =
      document.getElementById('clienteFecha').value;

    const hora =
      document.getElementById('clienteHora').value;

    const personas =
      document.getElementById('clientePersonas').value;

    const notas =
      document.getElementById('clienteNotas').value;

    let mensaje =
`Hola NEOM 👋

Quiero realizar una reserva:

========================
PRODUCTOS
========================
`;

    reservaPedido.forEach(item => {

      mensaje += `• ${item.cantidad}x ${item.name}\n`;

    });

    mensaje += `

========================
DATOS DEL CLIENTE
========================

👤 Nombre: ${nombre}

📞 Teléfono: ${telefono}

📅 Fecha: ${fecha}

⏰ Hora: ${hora}

👥 Personas: ${personas}

📝 Notas:
${notas}
`;

    const mensajeCodificado =
      encodeURIComponent(mensaje);

    window.open(
      `https://api.whatsapp.com/send/?phone=3116723728&text=${mensajeCodificado}&type=phone_number&app_absent=0`,
      '_blank'
    );

  }

});