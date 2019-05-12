import express from "express";
import bodyParser from "body-parser";

export default (app: express.Express): void => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.listen(process.env.PORT || 3000, () => {
    console.log("READY");
  })

  app.get("/", ($, response) => {
    response.json({ result: "READY" })
  })
}