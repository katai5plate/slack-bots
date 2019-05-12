"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
exports.default = (function (app, uri) {
    app.get(uri, function (request, response) {
        response.json({ result: "PLEASE_POST" });
    });
    app.post(uri, function (request, response) {
        var _a = process.env.SLACK_WEBHOOK_EMOJI_URL, SLACK_WEBHOOK_EMOJI_URL = _a === void 0 ? "" : _a;
        if (request && request.body) {
            var body = request.body;
            if (!!body.challenge) {
                response.json({ challenge: body.challenge });
            }
            if (!!body.event) {
                var _b = body.event, subtype = _b.subtype, name_1 = _b.name, value = _b.value;
                response.json({ result: "OK" });
                if (subtype === "add") {
                    if (/^alias:/.test(value)) {
                        var antiAlias = value.replace("alias:", "");
                        axios_1.default.post(SLACK_WEBHOOK_EMOJI_URL, {
                            text: [
                                ":arrow_up: エイリアスが追加されました！",
                                "`:" + antiAlias + ":` -> `:" + name_1 + ":`", ":" + antiAlias + ":",
                            ].join("\n")
                        });
                    }
                    else {
                        axios_1.default.post(SLACK_WEBHOOK_EMOJI_URL, {
                            text: [
                                ":repeat: 絵文字が追加されました！", "`:" + name_1 + ":`", value,
                            ].join("\n")
                        });
                    }
                }
            }
        }
        else {
            response.json({ result: "BAD_REQUEST" });
        }
    });
});
