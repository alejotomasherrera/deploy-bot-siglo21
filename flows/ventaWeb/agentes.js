const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { readFileSync } = require("fs");
const { join } = require("path");
/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */

const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "/flows/ventaWeb/promps");
  const text = readFileSync(
    join(pathPromp, "05_CONTACTOYUBICACION.txt"),
    "utf-8"
  );
  return text;
};

module.exports = {
  agentes: (chatgptClass) => {
    return addKeyword([EVENTS.WELCOME], {
      sensitive: true,
    })
      .addAnswer(
        "¡Hola! 👋 Soy Don Carlos, el asistente virtual de Siglo 21 Máquinas y Herramientas. Estoy aquí para ayudarte con gusto. 😊\n\n" +
          "Puedes contactarnos en los siguientes enlaces:\n" +
          "*Ventas Web*📞|(https://wa.me/5492995947950)\n" +
          "*Cotizaciones*📞|(https://wa.me/5492995947950)\n" +
          "*Repuestos*📞|(https://wa.me/5492994053248)\n" +
          "*Alquileres - Garantías* 📞|(https://wa.me/5492995113720)\n" +
          "*Servicio Técnico* 📞|(https://wa.me/5492995772751)\n\n" +
          "¡Selecciona el enlace que mejor se adapte a tu consulta y te redirigiremos a un agente listo para ayudarte! 😃\n\n" +
          "Recuerda que nuestros agentes están disponibles de *Lunes a Viernes de 9:00 a 19:00 hs* y los *Sábados de 9:00 a 13:00 hs*."
      )
      .addAnswer(
        `Ingresa *Menu* para dirigirte a mas opciones!`,
        { capture: true },
        async (ctx, { fallBack }) => {
          if (
            !ctx.body.toLowerCase().includes("Menu") &&
            !ctx.body.toLowerCase().includes("MENU") &&
            !ctx.body.toLowerCase().includes("menu") &&
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
            //send prompt to gpt
            const data = await getPrompt();
            await chatgptClass.handleMsgChatGPT(data); //Dicinedole actua!!
            const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
            await fallBack(textFromAI.text);
          }
        }
      );
  },
};
