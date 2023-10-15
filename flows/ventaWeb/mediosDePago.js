const { addKeyword } = require("@bot-whatsapp/bot");
const { readFileSync } = require("fs");
const { join } = require("path");
const principalWeb = require("./principalVentaWeb");

/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */

const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "/flows/ventaWeb/promps");
  const text = readFileSync(join(pathPromp, "03_MEDIOSDEPAGO.txt"), "utf-8");
  return text;
};

module.exports = {
  mediosDePago: (chatgptClass) => {
    return addKeyword(["pagos", "PAGOS", "Pagos"], {
      sensitive: true,
    })
      .addAnswer(
        "💳 Medios de pago 💰\n\n*Tarjetas de crédito*: Disponibles con 3 cuotas con interes en adelante 💳\n\n*Transf o deposito*.: Realiza una transferencia o deposito bancaria para pagar tus compras 🏦\n\n *Mercado pago*:\n" +
          "Utiliza tu cuenta de Mercado Pago para una transacción segura 🔄\n" +
          " -Información adicional para Mercado Pago:\n" +
          " -Nombre: Juan Manuel Sepulveda\n" +
          " -CVU: 0000003100013169360007\n" +
          " -Alias: siglo21maqyher\n" +
          " -CUIT/CUIL: 20236414273"
      )

      .addAnswer(
        `Necesitas más información o tienes alguna pregunta sobre los medios de pago? Si deseas volver al menu de venta web ingresa: *volver* `,
        { capture: true, sensitive: false },
        async (ctx, { fallBack, flowDynamic }) => {
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
              "Si deseas volver al menu de venta web ingresa: *volver* "
            );
          }
        }
      );
  },
};
