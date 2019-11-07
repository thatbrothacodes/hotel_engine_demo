"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const controllers_1 = __importDefault(require("./controllers"));
const axios_1 = __importDefault(require("axios"));
const app = express_1.default();
const router = express_1.default.Router();
const port = parseInt(process.env.PORT) || 4000;
const environment = process.env.NODE_ENV || "development";
axios_1.default.defaults.baseURL = "https://api.github.com";
axios_1.default.defaults.headers.accept = 'application/vnd.github.mercy-preview+json';
// include error handling
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET");
    console.log(req.method, req.url);
    next();
});
app.use('/', controllers_1.default(router));
app.listen(port, () => {
    console.log("environment: " + environment);
    console.log(`App listening on port ${port}`);
});
//# sourceMappingURL=index.js.map