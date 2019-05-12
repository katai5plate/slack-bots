import express from "express";
import axios from "axios";

export default (app: express.Express, uri: string): void => {
  app.get(uri, ($, response) => {
    response.json({ result: "PLEASE_POST" })
  })
  app.post(uri, (request, response) => {
    const { SLACK_WEBHOOK_EMOJI_URL = "" } = process.env;
    if (request && request.body) {
      const { body } = request;
      if (!!body.challenge) {
        response.json({ challenge: body.challenge })
      }
      if (!!body.event) {
        const { subtype, name, value } = body.event;
        response.json({ result: "OK" })
        if (subtype === "add") {
          if (/^alias:/.test(value)) {
            const antiAlias = value.replace("alias:", "");
            axios.post(SLACK_WEBHOOK_EMOJI_URL, {
              text:
                [
                  ":arrow_up: エイリアスが追加されました！",
                  `\`:${antiAlias}:\` -> \`:${name}:\``, `:${antiAlias}:`,
                ].join("\n")
            })
          } else {
            axios.post(SLACK_WEBHOOK_EMOJI_URL, {
              text:
                [
                  ":repeat: 絵文字が追加されました！", `\`:${name}:\``, value,
                ].join("\n")
            })
          }
        }
      }
    } else {
      response.json({ result: "BAD_REQUEST" })
    }
  });
}