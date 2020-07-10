"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var short_hash_1 = __importDefault(require("short-hash"));
function mergeHashedLevels(levels) {
    var hashedLevel = '';
    levels.forEach(function (level) { return (hashedLevel = hashedLevel + short_hash_1.default(level)); });
    return hashedLevel;
}
exports.default = mergeHashedLevels;
