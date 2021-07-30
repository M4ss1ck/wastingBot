const TeleBot = require("telebot");
const bot = new TeleBot("1174711451:AAFX3Wx7K9gA7WuD9HWlQ1DyUM9tBhJR2no");

bot.on(["/start", "/hello", "/jelou"], (msg) =>
  msg.reply.text("Ya empezaron a joder...")
);

bot.on(/^\/say (.+)$/, (msg, props) => {
  const text = props.match[1];
  return bot.sendMessage(msg.from.id, text, { replyToMessage: msg.message_id });
});

bot.start();
