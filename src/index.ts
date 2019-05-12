import express from "express";
import setup from "./setup"
import emoji from "./bot/emoji"

const app = express();

setup(app);
emoji(app, "/emoji");