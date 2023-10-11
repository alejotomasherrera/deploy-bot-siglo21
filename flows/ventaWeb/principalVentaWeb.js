const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const principalWeb = addKeyword([EVENTS.WELCOME])
  .addAnswer(
    "¡Hola! 👋 Soy Don Carlos, el asistente de *Siglo 21 Máquinas y Herramientas* 🛠️🌱",
    "Expertos en productos de fuerza, máquinas, herramientas, construcción y más. 🛒🚚💳"
  )
  .addAnswer([
    "Estás en el chat de atención al cliente de venta web.",
    "¿Cómo podemos ayudarte? 🤔",
    "",
    "Por favor, ingresa la palabra de la opción que deseas: ⌨️",
    "",
    "Métodos de envíos y entregas 🚚:  *envios*",
    "Medios de pagos 💳:  *pagos*",
    "Contacto 📞:  *contacto*",
    "Ubicación 🗺️:  *ubicacion*",
    "Finalizar chat 📝👋",
  ]);

module.exports = principalWeb;