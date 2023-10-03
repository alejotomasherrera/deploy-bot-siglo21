const fs = require("fs");

const { addKeyword } = require("@bot-whatsapp/bot");

const flowDespedida = addKeyword(
  ["chau", "gracias", "finalizar chat", "adios", "hasta luego","7"],
  {
    onlyContainsKeyword: true,
  }
)
  .addAnswer(
    "Gracias por contactar a Siglo 21 Máquinas y Herramientas. Estoy aquí para ayudarte en cualquier momento. ¡Que tengas un excelente día!"
  )

module.exports = flowDespedida;

