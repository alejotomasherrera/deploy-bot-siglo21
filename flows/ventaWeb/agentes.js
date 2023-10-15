const { addKeyword } = require("@bot-whatsapp/bot");
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
    return addKeyword(["contacto", "contactos", "Contacto", "Contactos"], {
      sensitive: true,
    })
      .addAnswer(
        "Estamos aquí para ayudarte en los siguientes enlaces:\n\n" +
          "💼 Ventas Web / Marketing 📞 | [Contacto](https://wa.me/5492995947950)\n" +
          "📄 Cotizaciones / Presupuestos 📞 | [Contacto](https://wa.me/5492995947950)\n" +
          "🔩 Repuestos 📞 | [Contacto](https://wa.me/5492994053248)\n" +
          "🔧 Alquileres / Garantías 📞 | [Contacto](https://wa.me/5492995113720)\n" +
          "🛠️ Reparaciones / Servicio Técnico 📞 | [Contacto](https://wa.me/5492995772751)\n\n" +
          "Selecciona el enlace para redirigrte a la conversacion con un agente o escribe 'volver' si deseas regresar al menú principal.\n" +
          "Recuerda que nuestros agentes estan disponibles de Lunes a Viernes de 9:00 a 19:00 hs y los Sabados de 9:00 a 13:00 hs."
      )
      .addAnswer(
        `¿Necesitas más información o tienes alguna pregunta sobre el contacto? Si deseas volver al menu ingresa: *volver* `,
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
