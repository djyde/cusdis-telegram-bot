const chatId = process.env.CHAT_ID;
const token = process.env.TOKEN;

import axios from 'axios'

function sendMessage(content: string, options?) {
  return axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
    chat_id: chatId,
    text: content,
    parse_mode: 'HTML',
    ...options
  });
}

type NewCommentBody = {
  type: "new_comment";
  data: {
    by_nickname: string;
    by_email: string;
    content: string;
    page_id: string;
    page_title: string;
    project_title: string;
    approve_link: string;
  };
};

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { type, data } = req.body as NewCommentBody;

    switch (type) {
      case "new_comment": {
        const msg = `New comment on website <strong>${data.project_title}</strong> in page <strong>${data.page_title}</strong>:
<pre>
${data.content.replace(/<[^>]*>?/gm, "")}
</pre>
by: <strong>${data.by_nickname}</strong>`;
        await sendMessage(msg, {
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
  }
};
