let usuarioId = "";
let nombreUsuario = "";

function registrarUsuario() {
  const codigo = document.getElementById("codigoInvitacion").value;
  if (!codigo) return alert("Ingresa un código de invitación");

  usuarioId = Date.now().toString();
  nombreUsuario = "Usuario_" + usuarioId.slice(-4);

  firebase.database().ref("usuarios/" + usuarioId).set({
    nombre: nombreUsuario,
    saldo: 0,
    historial: [],
    codigoInvitacion: codigo
  });

  document.getElementById("authSection").style.display = "none";
  document.getElementById("appSection").style.display = "block";
  document.getElementById("userSaludo").innerText = "Hola, " + nombreUsuario;

  escucharCambiosSaldo();
  escucharHistorial();
}

function recargarSaldo() {
  const monto = parseFloat(document.getElementById("cantidadRecarga").value);
  if (!monto || monto <= 0) return alert("Monto inválido");

  const ref = firebase.database().ref("usuarios/" + usuarioId);
  ref.once("value").then(snapshot => {
    const saldoActual = snapshot.val().saldo || 0;
    const nuevoSaldo = saldoActual + monto;
    ref.update({ saldo: nuevoSaldo });
    guardarHistorial("Recarga de $" + monto);
  });
}

function solicitarRetiro() {
  const monto = parseFloat(document.getElementById("cantidadRetiro").value);
  if (!monto || monto <= 0) return alert("Monto inválido");

  firebase.database().ref("retiros/" + usuarioId + "_" + Date.now()).set({
    usuario: nombreUsuario,
    monto: monto,
    aprobado: false
  });

  guardarHistorial("Solicitud de retiro: $" + monto);
  alert("Solicitud enviada al administrador");
}

function escucharCambiosSaldo() {
  firebase.database().ref("usuarios/" + usuarioId + "/saldo").on("value", snapshot => {
    document.getElementById("saldoActual").innerText = snapshot.val() || 0;
  });
}

function escucharHistorial() {
  firebase.database().ref("usuarios/" + usuarioId + "/historial").on("value", snapshot => {
    const lista = snapshot.val() || [];
    const ul = document.getElementById("historial");
    ul.innerHTML = "";
    lista.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
  });
}

function guardarHistorial(mensaje) {
  const ref = firebase.database().ref("usuarios/" + usuarioId + "/historial");
  ref.once("value").then(snapshot => {
    const lista = snapshot.val() || [];
    lista.push(mensaje);
    ref.set(lista);
  });
}