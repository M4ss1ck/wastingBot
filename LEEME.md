<h1 align="center">
  Bot de Telegram usando Node JS
</h1>

Bot de pruebas. Puede hacer montones de cosas inútiles en los grupos, pero tiene algunas funciones decentes.

Cualquier duda o -lo más probable- sugerencia me la puedes hacer llegar [vía telegram](https://t.me/m4ss1ck)

## 👀 Dependencias

- [Telebot](https://github.com/mullwar/telebot): Para comunicarnos con la API de Telegram
- [dotenv](https://github.com/motdotla/dotenv): Para las variables de entorno
- [process](https://github.com/shtylman/node-process): Manejo de algunos errores específicos
- [jimp](https://github.com/oliver-moran/jimp): Nuestro conversor de imágenes, aunque puede hacer mucho más
- [expr-eval](https://github.com/silentmatt/expr-eval): Para calcular las operaciones matemáticas usando el comando `/calc`
- [pg](https://github.com/brianc/node-postgres): Nuestra base de datos, para gestionar usuarios, mensajes guardados, reputación...
- [node-cron](https://github.com/merencia/node-cron): Para programar mensajes a un chat específico con el fin de mantener el bot en funcionamiento

  ##### Por alguna razón instalé express.js... ya lo usaré

## 👀 Instalación

```shell
    # clona este repo https://github.com/M4ss1ck/wastingBot
    npm install
    npm run start
```

## 👀 Uso

Primeramente necesitas establecer algunas variables en el archivo `.env` (renombrado como `.env.sample` en el repositorio)

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

`TG_TOKEN` es el token que obtienes de [@BotFather](https://t.me/BotFather) cuando creas tu bot.

`ADMIN_ID` ID de Telegram del propietario

`VICTIM` se refiere a la víctima por defecto de nuestro comando `/tag`.

`KEEP_ALIVE_CHAT_ID` es el id del chat al que enviamos nuestros mensajes programados

`DATABASE_URL` url de nuestra base de datos postgresql

`PGDATABASE` nombre de la base de datos

`PGHOST` host de la base de datos

`PGPASSWORD` contraseña de la base de datos

`PGPORT` puerto de la base de datos

`PGUSER` usuario de la base de datos

`RAPIDAPI_KEY` nuestra clave de la api para usar en los comandos `/ud` (búsqueda del Urban Dictionary) y `/tr` (traductor de google).

**Comandos disponibles:**

- `/ayuda` o `/help` nos muestran una lista de los comandos disponibles
- `/calc <operaciones>` nos permite resolver operaciones aritméticas sencillas
- `/s/<viejo>/<nuevo>` nos permite reemplazar `viejo` por `nuevo` al responder un mensaje. Borra nuestro mensaje si tiene permisos suficientes 🌚
- `/foto <url>` y `/get <url>` nos permiten descargar fotos y otros archivos cualesquiera, respectivamente, a partir de su dirección
- `/size` nos permite conocer tamaño y dimensiones de imágenes y stickers. Se usa respondiendo la imagen o sticker
- `/conv <ancho> <alto> <calidad>` o `/conv <ancho y alto> <calidad>` o `/conv <calidad>` nos permite convertir una imagen con el objetivo de reducir su tamaño. `ancho` y `alto` toman valores en pixeles (ej: 100, 200) o `auto` que reduce las dimensiones a la mitad en ambos casos, `calidad` toma valores 1-100
- `/r` o `/reddit` muestra una lista preestablecida de los canales de reddits en forma de botones, cuando se hace clic en ellos, se obtienen las últimas publicaciones allí. Nota: no se puede usar en grupos o canales.
- `/r <nombre>` o `/reddit <nombre>` muestra el último post del canal de reddit `<nombre>`. Cada post viene con un botón para descargar archivos multimedia. Nota: no se puede usar en grupos o canales.
- `/ping` indica el tiempo que el bot ha estado despierto.
- `/size` muestra, al responder un mensaje, el tamaño (y otros metadatos) de la multimedia. También puedes conseguirlo reenviando el mensaje al bot.
- `/filtros`, `/add <nombre>`, `/rem <nombre` enumeran, añaden y eliminan, respectivamente, notas y/o filtros.
- `+`, `++`, `+++` y así sucesivamente... aumentan la reputación del usuario del mensaje respondido.
- `-`, `--`, `---` y así sucesivamente... disminuyen la reputación del usuario del mensaje respondido.
- `/nick <nuevo_nick>` establece `<nuevo_nick>` como tu nombre para que el bot lo use.
- `/ud <consulta>` busca `<consulta>` en el Diccionario Urbano
- `/tr <código de idioma>` (al responder) traduce el mensaje respondido al idioma deseado

Hay varios más, esta sección está en constante evolución. Por ejemplo, el bot ahora puede responder a preguntas (estilo bola 8)

**Comandos solo para `ADMIN_ID`:**

- `/quit` el bot sale del grupo
- `/set_del` añade el texto del mensaje respondido a la lista negra del bot. Borrará los mensajes exactamente iguales a cualquiera de la lista
- `/reset_rep` restablece los valores de reputación de todos los usuarios
- `/set_rep <id> <valor>` establece la reputación de `<valor>` para el usuario de id `<id`

**Comandos inline**
Ahora puedes usar el bot como una calculadora inline o un generador de porcentajes aleatorios.

#### Esta lista no es exhaustiva ni mucho menos, constantemente estoy modificando los comandos y añadiendo otros

## 🚀 Publicación sobre cómo crear un bot

[Crear bot de Telegram usando node.js (1ra parte)](https://massick.netlify.app/blog/telegram-bot-part-i/)

## Deploy on railway.app

[![Desplegar en Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2FM4ss1ck%2FwastingBot&plugins=postgresql&envs=ADMIN_ID%2CKEEP_ALIVE_CHAT_ID%2CRAPIDAPI_KEY%2CTG_TOKEN%2CVICTIM&ADMIN_IDDesc=Telegram+id+of+bot+owner&KEEP_ALIVE_CHAT_IDDesc=Chat+id+for+sending+scheduled+messages&RAPIDAPI_KEYDesc=key+for+some+apis&TG_TOKENDesc=bot+token&VICTIMDesc=telegram+id+of+someone+you+hate&referralCode=hCqxlN)

## 👀 Descargo de responsabilidad

Este es un trabajo en progreso, con el que de paso estudio javascript y node js, de ahí que coexistan tantos comandos distintos en un mismo bot. En un futuro organizaré un poco (o un muchísimo) el código, que a veces no lo entiendo ni yo.
