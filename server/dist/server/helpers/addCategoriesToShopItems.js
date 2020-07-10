"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mergeHashedLevels_1 = __importDefault(require("./mergeHashedLevels"));
function addCategoriesToShopItems(shopItems, categoriesWithLevelsInArray) {
    var categories = [];
    function addCategoriesToShopItem(shopItem) {
        var shopItemId = shopItem.shopItemId;
        var matchedCategories = categoriesWithLevelsInArray.filter(function (category) { return category.shopItemId === shopItemId; });
        var levels = matchedCategories.map(function (_a) {
            var levels = _a.levels;
            return mergeHashedLevels_1.default(levels);
        });
        return __assign(__assign({}, shopItem), { inCategories: levels, imageNames: shopItem.imageNames.split('\n') });
    }
    for (var _i = 0, shopItems_1 = shopItems; _i < shopItems_1.length; _i++) {
        var shopItem = shopItems_1[_i];
        // @ts-ignore
        categories = __spreadArrays(categories, [addCategoriesToShopItem(shopItem)]);
    }
    return categories;
}
exports.default = addCategoriesToShopItems;
