"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var setup_1 = __importDefault(require("./setup"));
var emoji_1 = __importDefault(require("./bot/emoji"));
var app = express_1.default();
setup_1.default(app);
emoji_1.default(app, "/emoji");
