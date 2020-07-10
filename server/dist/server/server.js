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
        while (_) try {
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
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var addCategoriesToShopItems_1 = __importDefault(require("./helpers/addCategoriesToShopItems"));
var convertLevelsToArray_1 = __importDefault(require("./helpers/convertLevelsToArray"));
var makeTreeFromCategories_1 = __importDefault(require("./helpers/makeTreeFromCategories"));
var config_1 = require("./config");
var mailer_1 = require("./mailer");
var app = express_1.default();
var port = 9999;
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
function withDatabase(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body;
                    return [4 /*yield*/, config_1.database.ref().once('value')];
                case 1: return [4 /*yield*/, _b.sent()];
                case 2:
                    _a.database = _b.sent();
                    next();
                    return [2 /*return*/];
            }
        });
    });
}
app.post('/send', withDatabase, function (req, res) {
    mailer_1.sendEmail(req.body.values, req.body.database).catch(console.error);
    res.end();
});
app.get('/api', withDatabase, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, categories, categoriesTree, shopItems, shopItemsVariants;
    return __generator(this, function (_a) {
        db = req.body.database.val();
        categories = convertLevelsToArray_1.default(db.categories.data);
        categoriesTree = makeTreeFromCategories_1.default(categories);
        shopItems = addCategoriesToShopItems_1.default(db.shopItems.data, categories);
        shopItemsVariants = db.shopItemsVariants.data;
        res.json({
            categories: categories,
            categoriesTree: categoriesTree,
            shopItems: shopItems,
            shopItemsVariants: shopItemsVariants,
        });
        return [2 /*return*/];
    });
}); });
app.listen(port, function (err) {
    if (err)
        throw err;
    console.log("server is listening on port: " + port);
});
