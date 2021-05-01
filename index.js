const Bot = require("node-telegram-bot-api");
const token = process.env.TOKEN

const bot = new Bot(token, {
  polling: true,
});

bot.onText(/\/gethook/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `Click to copy your Telegram Webhook URL:
\`https://tg-bot.cusdis.com/api/hook/${msg.chat.id}\``,
    {
      parse_mode: "MarkdownV2",
    }
  );
});
