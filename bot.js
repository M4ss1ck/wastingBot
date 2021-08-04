const TeleBot = require("telebot");
const bot = new TeleBot("1712168159:AAFhf_IJmGpoEAIW9ZLGknzKIuOjNbScsNE");
const Parser = require("expr-eval").Parser;

const parser = new Parser({
  operators: {
    // These default to true, but are included to be explicit
    add: true,
    concatenate: true,
    conditional: true,
    divide: true,
    factorial: true,
    multiply: true,
    power: true,
    remainder: true,
    subtract: true,
    logical: true,
    comparison: true,
    in: true,
    assignment: true,
  },
});

let default_del = ["/borrame", /^@m4ss1ck ghei$/];

bot.on(/^\/calc (.+)$/, (msg, props) => {
  const math = props.match[1];
  let result = parser.parse(math).simplify();
  console.log("El resultado de " + math + " es " + result);
  return bot
    .sendMessage(
      msg.chat.id,
      `<b>El resultado de:</b>  <pre>${math}</pre>\n=> <pre>${result}</pre>`,
      {
        parseMode: "html",
      }
    )
    .catch((error) => {
      console.log("Hubo un error", error.description);
      return bot.sendMessage(msg.from.id, error.description);
    });
});

bot.on(["/start", "/hello", "/jelou"], (msg) =>
  msg.reply.text("Ya empezaron a joder...")
);

bot.on("/ping", (msg) => msg.reply.text("Pong!"));

bot.on("/chatid", (msg) =>
  msg.reply.text("El ID de este chat es " + msg.chat.id, { asReply: true })
);

bot.on("/size", (msg) =>
  msg.reply.text(
    "Tamaño: " +
      msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1]
        .file_size,
    {
      asReply: true,
    }
  )
);

// Testing sending files
bot.on(/^\/foto (.+)$/, (msg, props) => {
  const url = props.match[1];
  return bot.sendPhoto(msg.chat.id, url).catch((error) => {
    console.log("Hubo un puto error", error.description);
    return bot.sendMessage(msg.from.id, error.description);
  });
});

bot.on(/^\/get (.+)$/, (msg, props) => {
  const url = props.match[1];
  return bot.sendDocument(msg.chat.id, url).catch((error) => {
    console.log("Hubo un puto error", error.description);
    return bot.sendMessage(msg.from.id, error.description);
  });
});

// echo
bot.on(/^\/say (.+)$/, (msg, props) => {
  const text = props.match[1];
  console.log(msg);
  return bot.sendMessage(msg.chat.id, text, { replyToMessage: msg.message_id });
});

// my username is currently hardcoded
bot.on("/quit", (msg) => {
  console.log(msg.from);
  if (msg.from.username === "m4ss1ck") {
    return bot.leaveChat(msg.chat.id).catch((error) => {
      console.log("Hubo un puto error", error.description);
      return bot.sendMessage(msg.from.id, error.description);
    });
  }
});

// Función reemplazar
// TODO: que funcione con caracteres especiales
bot.on(/^\/s\/(.+)\/(.+)/, (msg, props) => {
  const oldm = props.match[1];
  const newm = props.match[2];
  const text =
    '<b>En realidad quisiste decir:</b> \n\n"' +
    msg.reply_to_message.text.replaceAll(oldm, newm) +
    '"';
  //console.log(msg.reply_to_message);
  // bot.deleteMessage(<chat_id>, <from_message_id>);
  return (
    bot.sendMessage(msg.chat.id, text, {
      parseMode: "html",
      replyToMessage: msg.reply_to_message.message_id,
    }) && bot.deleteMessage(msg.chat.id, msg.message_id)
  );
});

// dividir en 2 comandos distintos (FAILED)
bot.on(/^\/set_del( .+)?$/, (msg, props) => {
  if (msg.reply_to_message) {
    const new_del_input = new RegExp("^" + msg.reply_to_message.text + "$");
    default_del.push(new_del_input);
    return (
      bot.sendMessage(
        msg.from.id,
        "Se eliminarán los mensajes que consistan en: " +
          new_del_input +
          "\nLa lista completa es: \n" +
          default_del
      ) &&
      bot.on(default_del, (msg) =>
        bot.deleteMessage(msg.chat.id, msg.message_id).catch((error) => {
          console.log(
            "Hubo un error al intentar borrar el mensaje: ",
            error.description
          );
          return bot.sendMessage(msg.from.id, error.description);
        })
      )
    );
  } else if (props.match[1] !== undefined) {
    const del_input = new RegExp("^" + props.match[1] + "$");

    default_del.push(del_input);
    console.log("Borrar por defecto:", default_del, "Regex:", del_input);
    return (
      bot.sendMessage(
        msg.from.id,
        "Se eliminarán los mensajes que consistan en: " +
          del_input +
          "\nLa lista completa es: \n" +
          default_del
      ) &&
      bot.on(default_del, (msg) =>
        bot.deleteMessage(msg.chat.id, msg.message_id).catch((error) => {
          console.log(
            "Hubo un error al intentar borrar el mensaje: ",
            error.description
          );
          return bot.sendMessage(msg.from.id, error.description);
        })
      )
    );
  } else
    return bot.sendMessage(
      msg.from.id,
      "Responde un mensaje o pon algo de texto. No soy mago."
    );
});

bot.on(default_del, (msg) =>
  bot.deleteMessage(msg.chat.id, msg.message_id).catch((error) => {
    console.log(
      "Hubo un error al intentar borrar el mensaje: ",
      error.description
    );
    return bot.sendMessage(msg.from.id, error.description);
  })
);

// setChatStickerSet(<chat_id>, <sticker_set_name>)

//Funciones del tipo "nudes", "beso"...

bot.on("text", (msg) => {
  console.log(msg.reply_to_message);
  if (msg.text.match(/^(nud(e|es))$/i)) {
    if (!msg.reply_to_message) {
      return bot.sendMessage(
        msg.chat.id,
        `<a href="tg://user?id=${msg.from.id}"> ${msg.from.first_name} </a> se envía su <b>colección de nudes</b> a <a href="tg://user?id=${msg.from.id}"> sí mism@ </a> porque no tiene amigos... mucho menos novi@`,
        { parseMode: "html" }
      );
    } else {
      return bot.sendMessage(
        msg.chat.id,
        `<a href="tg://user?id=${msg.from.id}"> ${msg.from.first_name} </a> le envía su <b>colección de nudes</b> a <a href="tg://user?id=${msg.reply_to_message.from.id}"> ${msg.reply_to_message.from.first_name} </a>`,
        { parseMode: "html" }
      );
    }
  }
  if (msg.text.match(/^(pinga|penga)$/i)) {
    if (!msg.reply_to_message) {
      return bot.sendMessage(
        msg.chat.id,
        `<a href="tg://user?id=${msg.from.id}"> ${msg.from.first_name} </a> se va <b>pa' la pinga</b> ya que no puede irse del país...`,

        { parseMode: "html" }
      );
    } else {
      return bot.sendMessage(
        msg.chat.id,
        `<a href="tg://user?id=${msg.from.id}"> ${msg.from.first_name} </a> <em>cariñosamente</em> manda <b>pa' la pinga</b> a <a href="tg://user?id=${msg.reply_to_message.from.id}"> ${msg.reply_to_message.from.first_name} </a>`,

        { parseMode: "html" }
      );
    }
  }
});

// EXPERIMENTAL
bot.on(/^\/tag( \d+)?/, (msg, props) => {
  console.log(props);
  let n = 1;
  if (props) {
    n = props.match[1];
  }
  if (n > 50 || n === undefined) {
    n = 1;
  }
  let victim = 706890648;
  if (msg.reply_to_message) {
    victim = msg.reply_to_message.from.id;
  }
  console.log("Se repetirá: ", n);
  if (victim === 771214579) {
    bot.sendMessage(
      msg.chat.id,
      `<a href="tg://user?id=${msg.from.id}"> Cariño </a>, no puedo hacer eso`,
      { parseMode: "html" }
    );
  } else {
    for (let i = 0; i < n; i++) {
      bot.sendMessage(
        msg.chat.id,
        `<a href="tg://user?id=${victim}"> tag tag </a>\n<em>llamada número ${i}</em>`,
        { parseMode: "html" }
      );
    }
  }
});

bot.on("/sticker", (msg) => {
  console.log(msg.reply_to_message);
  if (msg.reply_to_message.sticker) {
    return bot
      .setChatStickerSet(msg.chat.id, msg.reply_to_message.sticker.set_name)
      .catch((error) => {
        console.log("Hubo un puto error", error.description);
        return bot.sendMessage(msg.from.id, error.description);
      });
  }
});

// error handling

// bot.on("error", (error, data) => {
//   // console.log(msg);
//   console.log(error);
//   return bot.sendMessage(data.from.id, error.description);
// });

bot.start();
