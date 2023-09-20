"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getWord_1 = require("./controllers/getWord");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3000;
app.get('/api/getWord', getWord_1.getWord);
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});
