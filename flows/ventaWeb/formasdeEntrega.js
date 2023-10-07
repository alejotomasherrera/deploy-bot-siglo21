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
  const text = readFileSync(join(pathPromp, "02_FORMASDEENTREGA.txt"), "utf-8");
  return text;
};

const formasdeEntrega = {
  formasdeEntrega: (chatgptClass) => {
    return addKeyword(["envios","Envios","ENVIOS"], {
      sensitive: true
    })
      .addAnswer(
        "¡Genial! Aquí te presentamos nuestras formas de entrega disponibles 🚚🌟:\n\n" +
          "**Retiro en Sucursal (Neuquén):** 🏢\n" +
          " - Puedes recoger tu pedido en persona en nuestra sucursal en Neuquén.\n\n" +
          "**Envío Gratis (dentro de 25 km) - Entrega en 72 hs:** 🎁🚛\n" +
          " - Compras superiores a $10.000 dentro de 25 km (Plottier, Centenario, Allen, Cipolletti y Cinco Saltos) tienen envío gratis en aproximadamente 72 horas sin contar el peso del producto.\n\n" +
          "**Envío por Correo Argentino (más de 25 km y hasta 20 kg) - Pago en Destino:** 📦\n" +
          " - Para pedidos más distantes o hasta 20 kg, usamos Correo Argentino con pago al momento de la entrega.\n\n" +
          "**Envío por Via Cargo o Cruz del Sur (más de 25 km y más de 20 kg):** 🚛📦\n" +
          " - Pedidos más grandes a 20 kg se envían a través de servicios de transporte como Via Cargo o Cruz del Sur, garantizando la seguridad.", {sensitive: false }
      )
      .addAnswer(
        "¿Necesitas más información o tienes alguna pregunta sobre las formas de entrega? Si deseas volver al menú de venta web, ingresa: *volver* ",
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
                "agente",
                "agentes",
                "Agentes"
              )
          ) {
            // Envía el mensaje a GPT
            const data = await getPrompt();
            await chatgptClass.handleMsgChatGPT(data); // Diciéndole actuar
            const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
            await fallBack(textFromAI.text, { capture: true, sensitive: false });
            await fallBack(
              "Si deseas volver al menú de venta web, ingresa: *volver* "
            );
          }
        }
      );
  },
};

module.exports = formasdeEntrega;
