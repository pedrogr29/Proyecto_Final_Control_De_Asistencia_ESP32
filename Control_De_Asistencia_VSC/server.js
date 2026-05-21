const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

// Cambia COM5 si tu ESP32 aparece en otro puerto
const port = new SerialPort(
  {
    path: "COM5",
    baudRate: 115200,
  },
  (err) => {
    if (err) {
      console.log("No se pudo abrir el puerto:", err.message);
    }
  }
);

port.on("error", (err) => {
  console.log("Error en el puerto serial:", err.message);
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

parser.on("data", (data) => {
  const mensaje = data.trim();
  console.log("ESP32:", mensaje);

  if (mensaje === "CLIENTE_ASISTIO") {
    io.emit("estado", {
      texto: "Cliente asistió a la cita",
      tipo: "asistio",
      hora: new Date().toLocaleTimeString(),
    });
  }

  if (mensaje === "CLIENTE_NO_ASISTIO") {
    io.emit("estado", {
      texto: "Cliente no asistió a la cita",
      tipo: "noasistio",
      hora: new Date().toLocaleTimeString(),
    });
  }

  if (mensaje === "SISTEMA_BARBERIA_LISTO") {
    io.emit("estado", {
      texto: "Sistema conectado y listo",
      tipo: "listo",
      hora: new Date().toLocaleTimeString(),
    });
  }
});

server.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});