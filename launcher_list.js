export default lista = [
  {
    search: /^(nud(e|es))$/i,
    used_alone: `<a href="tg://user?id=${msg.from.id}"> ${msg.from.first_name} </a> se envía su <b>colección de nudes</b> a <a href="tg://user?id=${msg.from.id}"> sí mism@ </a> porque no tiene amigos... mucho menos novi@`,
    used_as_reply: `<a href="tg://user?id=${msg.from.id}"> ${msg.from.first_name} </a> le envía su <b>colección de nudes</b> a <a href="tg://user?id=${msg.reply_to_message.from.id}"> ${msg.reply_to_message.from.first_name} </a>`,
  },
];
