const socket = io();

const estado = document.getElementById("estado");
const hora = document.getElementById("hora");
const iconoEstado = document.getElementById("iconoEstado");
const cardPrincipal = document.querySelector(".principal");
const historial = document.getElementById("historial");
const limpiar = document.getElementById("limpiar");

const contadorAsistio = document.getElementById("contadorAsistio");
const contadorNoAsistio = document.getElementById("contadorNoAsistio");
const contadorTotal = document.getElementById("contadorTotal");

let asistencias = 0;
let noAsistencias = 0;
let total = 0;

socket.on("estado", (data) => {
  estado.textContent = data.texto;
  hora.textContent = data.hora;

  cardPrincipal.classList.remove("asistio", "noasistio", "listo");

  if (data.tipo === "asistio") {
    iconoEstado.textContent = "✅";
    cardPrincipal.classList.add("asistio");
    asistencias++;
    total++;
  }

  if (data.tipo === "noasistio") {
    iconoEstado.textContent = "❌";
    cardPrincipal.classList.add("noasistio");
    noAsistencias++;
    total++;
  }

  if (data.tipo === "listo") {
    iconoEstado.textContent = "🔌";
    cardPrincipal.classList.add("listo");
  }

  actualizarContadores();
  agregarHistorial(data);
});

function actualizarContadores() {
  contadorAsistio.textContent = asistencias;
  contadorNoAsistio.textContent = noAsistencias;
  contadorTotal.textContent = total;
}

function agregarHistorial(data) {
  const vacio = historial.querySelector(".vacio");

  if (vacio) {
    vacio.remove();
  }

  const item = document.createElement("li");
  item.classList.add(data.tipo);
  item.innerHTML = `<strong>${data.hora}</strong> — ${data.texto}`;

  historial.prepend(item);
}

limpiar.addEventListener("click", () => {
  historial.innerHTML = `<li class="vacio">Todavía no hay registros.</li>`;

  asistencias = 0;
  noAsistencias = 0;
  total = 0;

  actualizarContadores();

  estado.textContent = "Esperando acción...";
  hora.textContent = "--:--:--";
  iconoEstado.textContent = "⌛";
  cardPrincipal.classList.remove("asistio", "noasistio", "listo");
});