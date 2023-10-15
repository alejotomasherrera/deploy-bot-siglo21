const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const principalWeb = addKeyword([EVENTS.WELCOME]).addAnswer([
  "¡Hola! 👋 Soy Don Carlos, el asistente de *Siglo 21 Máquinas y Herramientas* 🛠️🌱",
  "Expertos en productos de fuerza, máquinas, herramientas, construcción y más. 🛒🚚💳",
  "Estás en el chat de atención al cliente de venta web.",
  "¿Cómo podemos ayudarte? 🤔",
  "",
  "Por favor, ingresa la palabra de la opción que deseas: ⌨️",
  "",
  "Métodos de envíos y entregas 🚚:  *envios*",
  "Medios de pagos 💳:  *pagos*",
  "Contacto 📞:  *contacto*",
  "Ubicación 🗺️:  *ubicacion*",
  "Finalizar chat 📝👋"
])
.addAnswer([
  { capture: true, sensitive: false },
  async (ctx, { fallBack }) => {
    if (
      !ctx.body
        .toLowerCase()
        .includes(
          "volver",
          "VOLVER",
          "Volver",
          "envios",
          "Envios",
          "ENVIOS",
          "PAGOS",
          "pagos",
          "Pagos",
          "ubicacion",
          "Ubicacion",
          "UBICACION",
          "ubicacion",
          "garantias",
          "contacto",
          "contactos",
          "Contacto",
          "Contactos"
        )
    ) {
      const data = await getPrompt();
      await chatgptClass.handleMsgChatGPT(data); //Dicinedole actua!!
      const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
      await fallBack(textFromAI.text);
      await fallBack(
        "Ingrese una opcion valida del menu de venta web"
      );
    }
  }
]);

module.exports = principalWeb;
