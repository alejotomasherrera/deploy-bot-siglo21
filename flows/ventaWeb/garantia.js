const { addKeyword } = require("@bot-whatsapp/bot");
const { readFileSync } = require("fs");
const { join } = require("path");
/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */

const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "promps");
  const text = readFileSync(join(pathPromp, "garantias.txt"), "utf-8");
  return text;
};

module.exports = {
  garantias: (chatgptClass) => {
    return addKeyword("garantias", {
      sensitive: true,
      onlycontains: true,
    })
      .addAnswer(
        "📢 Garantías: Todos los productos tienen 6 meses de garantía en el local directamente. Debes traerlo o enviarlo según sea el caso. 🛍️ \n Garantías: +54 9 299 511-3720"
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
            const data = await getPrompt();
            await chatgptClass.handleMsgChatGPT(data);
            const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
            await fallBack(textFromAI.text);
          }
        }
      );
  },
};
