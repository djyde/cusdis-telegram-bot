const dotenv = require("dotenv");
dotenv.config();
const Bot = require("node-telegram-bot-api");
const token = process.env.TOKEN;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const bot = new Bot(token, {
  polling: true,
});

const env = {
  token: process.env.TOKEN,
  host: process.env.HOST || "https://tg-bot.cusdis.com",
};

if (process.env.RAILWAY_STATIC_URL) {
  env.host = `https://${process.env.RAILWAY_STATIC_URL}`;
}

bot.onText(/\/gethook/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `Click to copy your Telegram Webhook URL:
\`${env.host}/api/hook/${msg.chat.id}\``,
    {
      parse_mode: "MarkdownV2",
    }
  );
});

app.get("/", (req, res) => {
  res.send("works");
});

app.post("/api/hook/:chatId", async (req) => {
  const { chatId } = req.params;
  const { type, data } = req.body;

  switch (type) {
    case "new_comment": {
      const msg = `New comment on website <strong>${
        data.project_title
      }</strong> in page <strong>${data.page_title}</strong>:
<pre>
${data.content.replace(/<[^>]*>?/gm, "")}
</pre>
by: <strong>${data.by_nickname}</strong>`;
      await bot.sendMessage(chatId, msg, {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Approve without login",
                url: data.approve_link,
              },
            ],
          ],
        },
      });
      break;
    }
  }

  res.json({
    msg: "works",
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("running on port:", port);
});
