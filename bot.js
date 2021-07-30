//Importando la libreria node-telegram-bot-api
const TelegramBot = require("node-telegram-bot-api");
// Creando nuestra variable que almacenara nuestro token
// para autenticarnos con el bot creado con BotFather
const token = "1174711451:AAFX3Wx7K9gA7WuD9HWlQ1DyUM9tBhJR2no";
// A continuacion, creamos nuestro bot y configuramos el parametro
// polling igualandolo a True, Con esto logramos que el bot esté en
// constante proceso de escucha y procesamiento de datos respecto al
// token de la API de Telegram.
const bot = new TelegramBot(token, { polling: true });
// A partir de estas tres líneas de código, ya podríamos empezar a crear
// comandos y eventos para darle funcionalidad a nuestro bot.

bot.on("polling_error", function (error) {
  console.log(error);
});

//Declaramos la funcion
bot.onText(/^\/start/, function (msg) {
  // Imprimimos en consola el mensaje recibido.
  console.log(msg);
  // msg.chat.id se encarga de recoger el id del chat donde se está realizando la petición.
  var chatId = msg.chat.id;
  // msg.from.username se encarga de recoger el @alias del usuario.
  var username = msg.from.username;
  // Enviamos un mensaje indicando el id del chat, y concatenamos el nombre del usuario con nuestro saludo
  bot.sendMessage(chatId, "Hola, " + username + " qué pinga e?");
});

// //Declaramos la funcion indicando que el evento esperado sera un "message"
// bot.on("message", function (msg) {
//   console.log(msg);
//   // msg.chat.id se encarga de recoger el id del chat donde se está realizando la petición.
//   var chatId = msg.chat.id;
//   // Enviamos nuestro mensaje indicando el id del chat.
//   bot.sendMessage(chatId, "ya... ya lo vi");
// });

// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function onEchoText(msg, match) {
  const resp = match[1];
  bot.sendMessage(msg.chat.id, resp);
});
