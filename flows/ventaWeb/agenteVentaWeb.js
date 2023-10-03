const { addKeyword } = require("@bot-whatsapp/bot");

const flowAgente = addKeyword(["agente"], {
  sensitive: true,
  onlycontains: true,
})
  .addAnswer("Estamos desviando tu conversación a nuestro agente de venta web")
  .addAction(async (ctx, { provider }) => {
    const nanoid = await import("nanoid");
    const ID_GROUP = nanoid.nanoid(5);
    const refProvider = await provider.getInstance();
    await refProvider.groupCreate(`Media Tech Support (${ID_GROUP})`, [
      `${ctx.from}@s.whatsapp.net`,
      `5492995947950@s.whatsapp.net`
    ]);
  })
  .addAnswer(
    "Te hemos agregado a un grupo con un asesor para resolver tus dudas. ¡Gracias!"
  );

module.exports = flowAgente; 
