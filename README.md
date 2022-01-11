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
- [pg](https://github.com/brianc/node-postgres): Our database, for managing users, saved messages, reputation...
- [node-cron](https://github.com/merencia/node-cron): To schedule messages to an specific chat in order to keep the bot running

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
VICTIM=987654321
ADMIN_ID=123456789
KEEP_ALIVE_CHAT_ID=-123456789
DATABASE_URL=localhost
PGDATABASE=botlocal
PGHOST=localhost
PGPASSWORD=password
PGPORT=5432
PGUSER=postgres
RAPIDAPI_KEY=abdc1234e9abcdefg69d1725e0552p124d4cjsnf48c7cf0a52c
```

`TG_TOKEN` is the token you get from [@BotFather](https://t.me/BotFather) when you create your bot.

`ADMIN_ID` Telegram ID of the owner

`VICTIM` refers to the default victim of our `/tag` command.

`KEEP_ALIVE_CHAT_ID` is the id of the chat we send our scheduled messages

`DATABASE_URL` url of our postgresql database

`PGDATABASE` database name

`PGHOST` database host

`PGPASSWORD` database password

`PGPORT` database port

`PGUSER` database user

`RAPIDAPI_KEY` our api key to use in `/ud` (Urban Dictionary search) and `/tr` (google translator) commands.

**Available commands:**

- `/ayuda` or `/help` show us a list of the available commands
- `/calc <operations>` allows us to solve simple arithmetic operations
- `/s/<old>/<new>` allows us to replace `old` with `new` when replying to a message. Delete our message if the bot have the required permissions 🌚
- `/foto <url>` and `/get <url>` allow us to download photos and any other files, respectively, using their `url`s
- `/size` allows us to know size and dimensions of images and stickers. It is used by responding to the image or sticker
- `/conv <width> <height> <quality>` or `/conv <width and height> <quality>` or `/conv <quality>` allows us to convert an image in order to reduce its size. `width` and `height` take values in pixels (e.g. 100, 200) or `auto` which reduces the dimensions by half in both cases, `quality` takes values 1-100.
- `/r` or `/reddit` shows a preset list of reddits channels in the form of buttons, when you click them, you get the last posts there. Note: it can't be used in groups or channels.
- `/r <name>` or `/reddit <name>` shows the last post for reddit channel `<name>`. Each post comes with a button to download multimedia files. Note: it can't be used in groups or channels.
- `/ping` tells how much time has the bot been awake.
- `/size` shows, when replying a message, the size (and other metadata) of the multimedia. You can achieve this by forwarding the message to the bot too.
- `/filtros`, `/add <name>`, `/rem <name` list, add and remove, respectively, notes and/or filters.
- `+`, `++`, `+++` and so on increase reply message's user reputation.
- `-`, `--`, `---` and so on decrease reply message's user reputation.
- `/nick <new_nick>` sets `<new_nick>` as your name for the bot to use.
- `/ud <query>` searches for `<query>` in Urban Dictionary
- `/tr <language code>` (when replying) translates the replied message to the desired language

There are several others, this section is evolving constantly. For example, the bot now can answer questions (8-ball style)

**Commands for `ADMIN_ID` only:**

- `/quit` the bot leaves the group
- `/set_del` adds the text of the replied message to the bot's blacklist. It will delete messages exactly the same as any in the list.
- `/reset_rep` resets reputation values for all users
- `/set_rep <id> <value>` set `<value>` reputation for the user of id `<id`

**Inline commands**
Now you can use the bot as an inline calculator or a random percentage generator (in Spanish).

### This list is by no means exhaustive, I am constantly modifying commands and adding others.

## 🚀 Post on how to create this bot

[Creating a Telegram bot using node.js (part I)](https://massick.netlify.app/blog/telegram-bot-part-i/)

## Deploy on railway.app

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2FM4ss1ck%2FwastingBot&plugins=postgresql&envs=ADMIN_ID%2CKEEP_ALIVE_CHAT_ID%2CRAPIDAPI_KEY%2CTG_TOKEN%2CVICTIM&ADMIN_IDDesc=Telegram+id+of+bot+owner&KEEP_ALIVE_CHAT_IDDesc=Chat+id+for+sending+scheduled+messages&RAPIDAPI_KEYDesc=key+for+some+apis&TG_TOKENDesc=bot+token&VICTIMDesc=telegram+id+of+someone+you+hate&referralCode=hCqxlN)

## 👀 Disclaimer

This is a work in progress, with which I am studying javascript and node js, that's why so many different commands coexist in the same bot. In the future I will organize a little (or a lot) this code, which sometimes I don't even understand it myself.
