"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
exports.default = (function (app) {
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json());
    app.listen(process.env.PORT || 3000, function () {
        console.log("READY");
    });
    app.get("/", function (request, response) {
        response.json({ result: "READY" });
    });
});
