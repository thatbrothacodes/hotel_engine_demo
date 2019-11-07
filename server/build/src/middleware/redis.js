"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
const client = redis_1.default.createClient();
exports.default = (req, res, next) => {
    let key = "__express__" + req.originalUrl || req.url;
    client.get(key, (err, reply) => {
        if (reply) {
            res.send(reply);
        }
        else {
            res.sendResponse = res.send;
            res.send = (body) => {
                client.set(key, JSON.stringify(body));
                res.sendResponse(body);
            };
            next();
        }
    });
};
//# sourceMappingURL=redis.js.map