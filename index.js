"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stein_js_client_1 = __importDefault(require("stein-js-client"));
class Stein {
    store;
    sheetName = "";
    constructor(apiId, sheetName) {
        this.store = new stein_js_client_1.default(`https://api.steinhq.com/v1/storages/${apiId}`);
        this.setSheetName(sheetName);
    }
    setSheetName(sheetName) {
        if (sheetName !== undefined)
            this.sheetName = sheetName;
    }
    create(rows, options) {
        return this.store.append(this.sheetName, rows, options);
    }
    update(options) {
        return this.store.edit(this.sheetName, options);
    }
    delete(options) {
        return this.store.delete(this.sheetName, options);
    }
    async get(options) {
        const response = await this.store.read(this.sheetName, options);
        return response.filter((data) => {
            const values = Object.values(data);
            return values.filter((value) => value !== null).length > 0;
        });
    }
}
exports.default = Stein;
