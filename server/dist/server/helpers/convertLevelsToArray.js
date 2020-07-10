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
Object.defineProperty(exports, "__esModule", { value: true });
function convertLevelsToArray(rawCategories) {
    var categoriesWithLevelsInArray = [];
    function processRawCategory(rawCategory) {
        var _a;
        var rest = {};
        var levelsBuffer = [];
        for (var rawCategoryKey in rawCategory) {
            if (/level\d/.test(rawCategoryKey)) {
                // @ts-ignore
                levelsBuffer = __spreadArrays(levelsBuffer, [rawCategory[rawCategoryKey]]);
            }
            else {
                rest = __assign((_a = {}, _a[rawCategoryKey] = rawCategory[rawCategoryKey], _a), rest);
            }
        }
        return __assign({ levels: levelsBuffer }, rest);
    }
    for (var _i = 0, rawCategories_1 = rawCategories; _i < rawCategories_1.length; _i++) {
        var rawCategory = rawCategories_1[_i];
        // @ts-ignore
        categoriesWithLevelsInArray = __spreadArrays(categoriesWithLevelsInArray, [
            processRawCategory(rawCategory),
        ]);
    }
    return categoriesWithLevelsInArray;
}
exports.default = convertLevelsToArray;
