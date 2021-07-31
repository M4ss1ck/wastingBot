const TeleBot = require("telebot");
const bot = new TeleBot("1712168159:AAFhf_IJmGpoEAIW9ZLGknzKIuOjNbScsNE");

bot.on(["/start", "/hello", "/jelou"], (msg) =>
  msg.reply.text("Ya empezaron a joder...")
);

bot.on("/ping", (msg) => msg.reply.text("Pong!"));

bot.on("/chatid", (msg) =>
  msg.reply.text("El ID de este chat es " + msg.chat.id, { asReply: true })
);

bot.on(/^\/say (.+)$/, (msg, props) => {
  const text = props.match[1];
  console.log(msg);
  return bot.sendMessage(msg.from.id, text, { replyToMessage: msg.message_id });
});

bot.on(/^\/s\/(.+)\/(.+)/, (msg, props) => {
  const oldm = props.match[1];
  const newm = props.match[2];
  const text = msg.text.replace(oldm, newm);
  console.log(msg.text, props);
  return bot.sendMessage(msg.from.id, text, { replyToMessage: msg.message_id });
});

bot.start();
