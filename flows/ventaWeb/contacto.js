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
  contacto: (chatgptClass) => {
    return addKeyword("contacto", {
      onlycontains: true,
      sensitive: true,
    })
      .addAnswer(
        "🔧 **Siglo 21 Máquinas y Herramientas** 📍 \n\nPara cualquier consulta, puedes contactarnos en las siguientes áreas: \n\n📡 *Ventas Web / Marketing*: +54 9 299 422 9156 📞 | ventasonline@siglo21myh.com.ar 📧\n\n📑 *Cotizaciones / Presupuestos*: +54 9 299 594-7950 📞 | cotizaciones@siglo21myh.com.ar 📧\n\n🔩 *Repuestos*: +54 9 299 405-3248 / +54 9 299 622-3938 📞\n\n 🔧 *Alquileres / Garantías*: +54 9 299 511-3720 📞\n\n🛠️ *Reparaciones / Servicio Técnico*: +54 9 299 577-2751 📞\n\nEstamos aquí para ayudarte en lo que necesites. 😊"
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
                "pagos",
                "contacto",
                "ubicacion",
                "garantias",
                "agente"
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
