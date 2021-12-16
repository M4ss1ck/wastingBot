function parseMSG(msg) {
  let formatted = msg.text ? msg.text : msg.caption ? msg.caption : msg;
  // replace markdown links with html anchors
  formatted = formatted.replace(
    /\[([^\]]+)\]\(([^\)]+)\)/g,
    '<a href="$2">$1</a>'
  );
  // replace markdown bold with html bold
  formatted = formatted.replace(/\*\*([^\*]+)\*\*/g, "<b>$1</b>");
  // replace markdown italic with html italic
  formatted = formatted.replace(/\*([^\*]+)\*/g, "<i>$1</i>");
  // replace markdown code with html code
  formatted = formatted.replace(/`([^`]+)`/g, "<code>$1</code>");
  // replace {user} with user name
  if (msg.from?.first_name) {
    formatted = formatted.replace(/\{user\}/g, msg.from.first_name);
  }
  // replace {i} with i
  formatted = formatted.replace(/\{(\d+)\}/g, "$1");
  return formatted;
}

function parseTEXT(text) {
  let formatted = text;
  if (formatted !== undefined) {
    // replace markdown links with html anchors
    formatted = formatted.replace(
      /\[([^\]]+)\]\(([^\)]+)\)/g,
      '<a href="$2">$1</a>'
    );
    // replace markdown bold with html bold
    formatted = formatted.replace(/\*\*([^\*]+)\*\*/g, "<b>$1</b>");
    // replace markdown italic with html italic
    formatted = formatted.replace(/\*([^\*]+)\*/g, "<i>$1</i>");
    // replace markdown code with html code
    formatted = formatted.replace(/`([^`]+)`/g, "<code>$1</code>");
    // replace {i} with i
    formatted = formatted.replace(/\{(\d+)\}/g, "$1");
  }

  return formatted;
}

export { parseMSG, parseTEXT };
