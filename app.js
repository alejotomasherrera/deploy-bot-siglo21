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
const { agentes } = require("./flows/ventaWeb/agentes");
const { formasdeEntrega } = require("./flows/ventaWeb/formasdeEntrega");
const { mediosDePago } = require("./flows/ventaWeb/mediosDePago");
const principalVentaWeb = require("./flows/ventaWeb/principalVentaWeb");
const { ubicacion } = require("./flows/ventaWeb/ubicacion");
const volverPrincipalVentaWeb = require("./flows/ventaWeb/volverPrincipalVentaWeb");

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
    agentes(chatGPT),
    formasdeEntrega(chatGPT),
    mediosDePago(chatGPT),
    ubicacion(chatGPT),
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
