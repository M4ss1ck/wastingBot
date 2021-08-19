<h1 align="center">
  Telegram bot using Node JS
</h1>

It's my test bot. It can do a lot of useless stuff in groups, but it has some decent functions too.

Any doubt or -most likely- suggestion you can find me [here](https://t.me/m4ss1ck)

### \*Esta información también está disponible en español <a href="./LEEME.md">aquí</a>

## 👀 Dependencies

- [Telebot](https://github.com/mullwar/telebot): To communicate with the Telegram API.
- [dotenv](https://github.com/motdotla/dotenv): For environment variables.
- [process](https://github.com/shtylman/node-process): Handling some specific errors.
- [jimp](https://github.com/oliver-moran/jimp): Our image converter, although it can do much more.
- [expr-eval](https://github.com/silentmatt/expr-eval): To calculate mathematical operations using the `/calc` command.
- [nedb-promises](https://github.com/bajankristof/nedb-promises): Our database, although I am very bad at working with them 😥.

  ##### For some reason I installed express.js... I'll use it at some point.

## 👀 How to install it

```shell
    # clone this repo https://github.com/M4ss1ck/wastingBot
    npm install
    npm run start
```

## 👀 How to use it

First of all you need to set some variables in the `.env` file (renamed as `.env.sample` in the repository).

```
TG_TOKEN=123456789:AAFbuKsrLW3Q77HsElI7oHGFqJXItozZ2jQ
ADMIN_USERNAME=your_username
VICTIM=987654321
ADMIN_ID=123456789
```

`TG_TOKEN` is the token you get from [@BotFather](https://t.me/BotFather) when you create your bot.

`ADMIN_USERNAME` is a username with some privileges.

`ADMIN_ID` is the same as the previous variable, this time with the Telegram ID.

`VICTIM` refers to the default victim of our `/tag` command.

**Available commands:**

- `/ayuda` or `/help` show us a list of the available commands
- `/calc <operations>` allows us to solve simple arithmetic operations
- `/s/<old>/<new>` allows us to replace `old` with `new` when replying to a message. Delete our message if the bot have the required permissions 🌚
- `/foto <url>` and `/get <url>` allow us to download photos and any other files, respectively, using their `url`s
- `/size` allows us to know size and dimensions of images and stickers. It is used by responding to the image or sticker
- `/conv <width> <height> <quality>` or `/conv <width and height> <quality>` or `/conv <quality>` allows us to convert an image in order to reduce its size. `width` and `height` take values in pixels (e.g. 100, 200) or `auto` which reduces the dimensions by half in both cases, `quality` takes values 1-100.

**Commands for `ADMIN_ID` only:**

- `/quit` the bot leaves the group
- `/set_del` adds the text of the replied message to the bot's blacklist. It will delete messages exactly the same as any in the list.

**Others**
In `launcher_list.js` we have an array of objects with 3 elements: `search`, `alone` and `as_reply`.
When the bot detects a message consisting of `search`:

1. If you are not replying to another message: mention the user and add a random string of `alone`.
2. If you are replying to another message: mention the user, add a random string from `as_reply` and mention the user who sent the replied message.

This list is by no means exhaustive, I am constantly modifying commands and adding others.

## 🚀 Post on how to create this bot

Pending

## 👀 Disclaimer

This is a work in progress, with which I am studying javascript and node js, that's why so many different commands coexist in the same bot. In the future I will organize a little (or a lot) this code, which sometimes I don't even understand it myself.
