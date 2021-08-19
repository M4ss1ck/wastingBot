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
- [nedb-promises](https://github.com/bajankristof/nedb-promises): Nuestra base de datos, aunque se me da muy mal trabajar con ellas 😥

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
ADMIN_USERNAME=your_username
VICTIM=987654321
ADMIN_ID=123456789
```

`TG_TOKEN` es el token que obtienes de [@BotFather](https://t.me/BotFather) al crear tu bot.

`ADMIN_USERNAME` es un nombre de usuario con algunos privilegios

`ADMIN_ID` lo mismo que la variable anterior, esta vez con el ID de Telegram

`VICTIM` se refiere a la víctima por defecto de nuestro comando `/tag`

**Comandos disponibles:**

- `/ayuda` o `/help` nos muestran una lista de los comandos disponibles
- `/calc <operaciones>` nos permite resolver operaciones aritméticas sencillas
- `/s/<viejo>/<nuevo>` nos permite reemplazar `viejo` por `nuevo` al responder un mensaje. Borra nuestro mensaje si tiene permisos suficientes 🌚
- `/foto <url>` y `/get <url>` nos permiten descargar fotos y otros archivos cualesquiera, respectivamente, a partir de su dirección
- `/size` nos permite conocer tamaño y dimensiones de imágenes y stickers. Se usa respondiendo la imagen o sticker
- `/conv <ancho> <alto> <calidad>` o `/conv <ancho y alto> <calidad>` o `/conv <calidad>` nos permite convertir una imagen con el objetivo de reducir su tamaño. `ancho` y `alto` toman valores en pixeles (ej: 100, 200) o `auto` que reduce las dimensiones a la mitad en ambos casos, `calidad` toma valores 1-100

**Comandos solo para `ADMIN_ID`:**

- `/quit` el bot sale del grupo
- `/set_del` añade el texto del mensaje respondido a la lista negra del bot. Borrará los mensajes exactamente iguales a cualquiera de la lista

**Otros**
En `launcher_list.js` tenemos un arreglo de objetos con 3 elementos: `search`, `alone` y `as_reply`.
Al bot detectar un mensaje que consiste en `search`:

1. Si no está respondiendo otro mensaje: menciona al usuario y le añade un string al azar de `alone`
2. Si está respondiendo otro mensaje: menciona al usuario, le añade un string al azar de `as_reply` y menciona al usuario que envió el mensaje respondido.

Esta lista no es exhaustiva ni mucho menos, constantemente estoy modificando los comandos y añadiendo otros

## 🚀 Publicación sobre cómo crear un bot

Pendiente

## 👀 Descargo de responsabilidad

Este es un trabajo en progreso, con el que de paso estudio javascript y node js, de ahí que coexistan tantos comandos distintos en un mismo bot. En un futuro organizaré un poco (o un muchísimo) el código, que a veces no lo entiendo ni yo.
