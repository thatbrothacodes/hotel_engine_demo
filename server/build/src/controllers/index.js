"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = __importDefault(require("./repositories"));
exports.default = (router) => {
    router.use('/repositories', repositories_1.default());
    return router;
};
//# sourceMappingURL=index.js.map