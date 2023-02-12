# cusdis-telegram-bot

Official Telegram bot for [Cusdis](https://cusdis.com). (Works on both Cusdis Cloud and self-host Cusdis).

<img src="screenshot.png" width="375" />

## Usage

1. Open and start bot https://t.me/CusdisBot
2. send `/gethook` command
3. Copy the URL result and paste in Cusdis project's webhook settings


## Self deployed guide

1. Set the environment variables:

- `TOKEN` Telegram bot token
- `HOST` Your host url. e.g, `https://tg-bot.cusdis.com`

2. Start the app

- `pnpm i`
- `npm start`