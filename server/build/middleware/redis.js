"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
const axios_1 = __importDefault(require("axios"));
const client = redis_1.default.createClient({
    port: 6379,
    host: 'localhost'
});
exports.default = (req, res, next) => {
    const apiUrl = `https://api.github.com/search${req.originalUrl}`;
    let key = "__express__" + req.originalUrl || req.url;
    client.get(key, 6000, (err, reply) => {
        if (reply) {
            console.log("Cached");
            res.send(JSON.parse(reply));
        }
        else {
            console.log("Fresh");
            axios_1.default.get(apiUrl)
                .then(externalRes => {
                client.set(key, JSON.stringify(externalRes.data));
                res.status(200).json(externalRes.data);
                next();
            }).catch(() => {
                res.status(500).json({
                    error: 'Internal Sever Error'
                });
                next();
            });
        }
    });
};
//# sourceMappingURL=redis.js.map