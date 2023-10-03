require("dotenv").config();
const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

/**
 * ChatGPT
 */
const ChatGPTClass = require("./chatgpt.class");
const chatGPT = new ChatGPTClass();

// Generar promp al inicio del chat

/**
 * Flows
 */

const despedida = require("./flows/despedida");
//venta web
const agenteVentaWeb = require("./flows/ventaWeb/agenteVentaWeb");
const { contacto } = require("./flows/ventaWeb/contacto");
const { formasdeEntrega } = require("./flows/ventaWeb/formasdeEntrega");
const { mediosDePago } = require("./flows/ventaWeb/mediosDePago");
const principalVentaWeb = require("./flows/ventaWeb/principalVentaWeb");
const { ubicacion } = require("./flows/ventaWeb/ubicacion");
const volverPrincipalVentaWeb = require("./flows/ventaWeb/volverPrincipalVentaWeb");
const { garantias } = require("./flows/ventaWeb/garantia");
/**
 * Funcion principal
 */
const main = async () => {
  const adapterDB = new MockAdapter();

  const adapterFlow = createFlow([
    principalVentaWeb,
    volverPrincipalVentaWeb,
    despedida,
    //Venta Web
    contacto(chatGPT),
    formasdeEntrega(chatGPT),
    mediosDePago(chatGPT),
    ubicacion(chatGPT),
    agenteVentaWeb,
    garantias(chatGPT),
  ]);

  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
