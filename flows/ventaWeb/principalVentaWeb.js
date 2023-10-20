const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const principalWeb = addKeyword(["menu","Menu"]).addAnswer(
  [
      "Por favor, ingresa la palabra de la opción que deseas: ⌨️\n" +
      "\n" +
      "Métodos de envíos y entregas 🚚:  *envios*\n" +
      "Medios de pagos 💳:  *pagos*\n" +
      "Ubicación 🗺️:  *ubicacion*\n" +
      "Finalizar chat 📝👋",
  ],
  { capture: true },
  async (ctx, { fallBack }) => {
    if (
      !ctx.body.toLowerCase().includes("volver") &&
      !ctx.body.toLowerCase().includes("envios") &&
      !ctx.body.toLowerCase().includes("pagos") &&
      !ctx.body.toLowerCase().includes("ubicacion") &&
      !ctx.body.toLowerCase().includes("garantias") &&
      !ctx.body.toLowerCase().includes("contacto") &&
      !ctx.body.toLowerCase().includes("contactos") &&
      !ctx.body.toLowerCase().includes("gracias") &&
      !ctx.body.toLowerCase().includes("finalizar chat")
    ) {
      return fallBack(
        "Ingrese una opción válida del menú principal. Por ejemplo: *envios*"
      );
    }
  }
);

module.exports = principalWeb;
