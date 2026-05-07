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
     PEDIDO
  ========================= */
  let pedido = [];

  /* =========================
     DATA
  ========================= */
  const reservaData = {

    Entradas: [
      {
        name: "Combo Neom",
        desc: "Ceviche caribeño de camarón con chips de plátano, elección de lomo ahumado, salmón al maracuyá o pollo al vino blanco, y postre de frutos rojos.",
        price: "$63.900",
        img: "IMAGENES/comboneom.jpg"
      }
    ],

  };

  /* =========================
     RENDER CATEGORÍA
  ========================= */
  function renderReservaCategory(cat) {

    if (!reservaData[cat]) return;

    reservaCategoryTitle.textContent = cat;

    reservaItemsContainer.innerHTML =
      reservaData[cat].map((item, i) => `

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

            <button
              class="ver-btn"
              data-cat="${cat}"
              data-index="${i}"
            >
              VER
            </button>

            <button
              class="reservar-btn"
              data-cat="${cat}"
              data-index="${i}"
            >
              RESERVAR
            </button>

          </div>

        </div>

      </div>

    `).join('');

    activarBotones(cat);
  }

  /* =========================
     BOTONES
  ========================= */
  function activarBotones(cat) {

    document.querySelectorAll('.ver-btn').forEach(btn => {

      btn.addEventListener('click', () => {

        const index = btn.dataset.index;
        const item = reservaData[cat][index];

        abrirModal(item);

      });

    });

    document.querySelectorAll('.reservar-btn').forEach(btn => {

      btn.addEventListener('click', () => {

        const index = btn.dataset.index;
        const item = reservaData[cat][index];

        agregarPedido(item);

      });

    });

  }

  /* =========================
     MODAL
  ========================= */
  function abrirModal(item) {

    if (reservaModal) reservaModal.remove();

    reservaModal = document.createElement('div');

    reservaModal.className = 'modal show';

    reservaModal.innerHTML = `

      <div class="modal-content">

        <button class="close-modal">✕</button>

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

    reservaModal
      .querySelector('.close-modal')
      .addEventListener('click', () => {

        reservaModal.remove();
        reservaModal = null;

      });

    reservaModal.addEventListener('click', (e) => {

      if (e.target === reservaModal) {

        reservaModal.remove();
        reservaModal = null;

      }

    });

  }

  /* =========================
     AGREGAR PEDIDO
  ========================= */
  function agregarPedido(item) {

    pedido.push(item);

    actualizarBotonCarrito();

  }

  /* =========================
     PANEL PEDIDO
  ========================= */
  const panel = document.createElement('div');

  panel.id = 'pedidoPanel';

  panel.style.display = 'none';

  document.body.appendChild(panel);

  /* =========================
     BOTÓN CARRITO
  ========================= */
  const carritoBtn = document.createElement('button');

  carritoBtn.id = 'carritoBtn';

  carritoBtn.innerHTML = `
    🛒 Ver carrito (<span id="carritoCantidad">0</span>)
  `;

  document.body.appendChild(carritoBtn);

  /* =========================
     ACTUALIZAR BOTÓN
  ========================= */
  function actualizarBotonCarrito() {

    const cantidad =
      document.getElementById('carritoCantidad');

    if (cantidad) {

      cantidad.textContent = pedido.length;

    }

    carritoBtn.style.display =
      pedido.length > 0
        ? 'block'
        : 'none';

  }

  /* =========================
     ABRIR CARRITO
  ========================= */
  carritoBtn.addEventListener('click', () => {

    panel.style.display = 'block';

    panel.classList.add('open');

    carritoBtn.style.display = 'none';

    renderPedido();

  });

  /* =========================
     RENDER PEDIDO
  ========================= */
  function renderPedido() {

    panel.innerHTML = `

      <div class="pedido-header">

        <h3>
          🛒 Tu Reserva (${pedido.length})
        </h3>

        <button id="minimizarCarrito">
          ➖
        </button>

      </div>

      ${
        pedido.length === 0
          ? '<p>No has agregado productos.</p>'
          : pedido.map(item => `
              <div class="pedido-item">
                ${item.name} x1
              </div>
            `).join('')
      }

      <div class="cliente-form">

        <input
          type="text"
          id="clienteNombre"
          placeholder="Nombre completo"
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
          placeholder="Notas adicionales..."
        ></textarea>

      </div>

      <button id="enviarWhatsapp">
        ENVIAR POR WHATSAPP
      </button>

    `;

    document
      .getElementById('enviarWhatsapp')
      .addEventListener('click', enviarWhatsapp);

    /* minimizar */
    const minimizarBtn =
      document.getElementById('minimizarCarrito');

    minimizarBtn.addEventListener('click', () => {

      panel.classList.remove('open');

      panel.style.display = 'none';

      carritoBtn.style.display = 'block';

    });

  }

  /* =========================
     WHATSAPP
  ========================= */
  function enviarWhatsapp() {

    if (pedido.length === 0) {
      alert("Agrega productos primero");
      return;
    }

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

`;

    pedido.forEach(item => {

      mensaje += `• 1x ${item.name}\n`;

    });

    mensaje += `

👤 Nombre: ${nombre}
📞 Teléfono: ${telefono}
📅 Fecha: ${fecha}
⏰ Hora: ${hora}
👥 Personas: ${personas}

📝 Notas:
${notas}
`;

    const url =
`https://api.whatsapp.com/send/?phone=3116723728&text=${encodeURIComponent(mensaje)}&type=phone_number&app_absent=0`;

    window.open(url, '_blank');

  }

  /* =========================
     ABRIR RESERVA
  ========================= */
  reservaBtn.addEventListener('click', () => {

    reservaPanel.style.display = 'flex';

    reservaPanel.offsetHeight;

    reservaPanel.classList.add('show');

    renderReservaCategory('Entradas');

  });

  /* =========================
     CERRAR RESERVA
  ========================= */
  if (closeReserva) {

    closeReserva.addEventListener('click', () => {

      reservaPanel.classList.remove('show');

      panel.style.display = 'none';

      carritoBtn.style.display = 'none';

      setTimeout(() => {

        reservaPanel.style.display = 'none';

      }, 400);

    });

  }

  /* =========================
     CATEGORÍAS
  ========================= */
  if (reservaCategoryList) {

    reservaCategoryList
      .querySelectorAll('li')
      .forEach(li => {

        li.addEventListener('click', () => {

          reservaCategoryList
            .querySelectorAll('li')
            .forEach(el => el.classList.remove('active'));

          li.classList.add('active');

          const cat = li.dataset.category;

          renderReservaCategory(cat);

        });

      });

  }

});