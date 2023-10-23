"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var db_1 = require("./config/db");
var amqplib_1 = __importDefault(require("amqplib"));
var channel;
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    var amqpServer, connection, error_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                if (!process.env.NODE_ENV) {
                    throw new Error('NODE_ENV must be defined');
                }
                if (!process.env.SERVER_PORT) {
                    throw new Error('SERVER_PORT must be defined');
                }
                if (!process.env.PG_PORT) {
                    throw new Error('PG_PORT must be defined');
                }
                console.log("----------------------");
                console.log(process.env.NODE_ENV);
                console.log(process.env.SERVER_PORT);
                console.log("----------------------");
                try {
                    db_1.db.initialize();
                    console.log('Product database Connected');
                }
                catch (error) {
                    console.log('Product database error:', error);
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                amqpServer = "amqp://".concat(process.env.RABBITMQ_URL, ":").concat(process.env.RABBITMQ_PORT) || 'amqp://localhost:5673';
                return [4 /*yield*/, amqplib_1.default.connect(amqpServer)];
            case 2:
                connection = _a.sent();
                return [4 /*yield*/, connection.createChannel()];
            case 3:
                channel = _a.sent();
                return [4 /*yield*/, channel.assertQueue('PRODUCT')];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log("error in rabbitmq connection: ", error_1);
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 8];
            case 7:
                error_2 = _a.sent();
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
start();
app_1.app.listen(process.env.SERVER_PORT, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("Product server listening on port ".concat(process.env.SERVER_PORT, "!!!!!!"));
        return [2 /*return*/];
    });
}); });
