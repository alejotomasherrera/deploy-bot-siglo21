const { addKeyword } = require("@bot-whatsapp/bot");

const volverPrincipalWeb = addKeyword(["volver","VOLVER","Volver"])
  .addAnswer([
    "Estás en el chat de atención al cliente de venta web.",
    "¿Cómo podemos ayudarte? 🤔",
    "",
    "Por favor, ingresa la palabra de la opción que deseas: ⌨️",
    "",
    "Métodos de envío y entrega 🚚: *envios*",
    "Medios de pago 💳: *pagos*",
    "Contacto 📞: *agente*",
    "Ubicación 🗺️: *ubicacion*",
    "Finalizar chat 📝👋",
  ]);

module.exports = volverPrincipalWeb;
