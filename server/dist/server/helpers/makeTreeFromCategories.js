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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var short_hash_1 = __importDefault(require("short-hash"));
function makeTreeFromCategories(categoriesWithLevelsInArray) {
    var dump = {};
    var tree = [];
    function makeTree(category, level, parentId) {
        var categoryId = parentId + short_hash_1.default(category.levels[0]);
        if (!dump[categoryId]) {
            dump[categoryId] = {
                name: category.levels[0],
                id: categoryId,
                coverImg: category.coverImg,
                list: [],
            };
        }
        if (parentId.length === 0 &&
            // @ts-ignore
            tree.findIndex(function (x) { return x.id === categoryId; }) < 0) {
            // @ts-ignore
            tree.push(dump[categoryId]);
        }
        else if (parentId.length > 0 &&
            // Same here with definition on beggining of function.
            dump[parentId].list.findIndex(function (x) { return x.id === categoryId; }) === -1) {
            dump[parentId].list.push(dump[categoryId]);
        }
        if (category.levels.length > 1) {
            makeTree(__assign(__assign({}, category), { levels: category.levels.slice(1) }), level + 1, categoryId);
        }
    }
    for (var _i = 0, categoriesWithLevelsInArray_1 = categoriesWithLevelsInArray; _i < categoriesWithLevelsInArray_1.length; _i++) {
        var categoryWithLevelsInArray = categoriesWithLevelsInArray_1[_i];
        makeTree(categoryWithLevelsInArray, 0, '');
    }
    return tree;
}
exports.default = makeTreeFromCategories;
