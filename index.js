"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stein_js_client_1 = __importDefault(require("stein-js-client"));
class Stein {
    store;
    config = { sheetName: "" };
    constructor(apiId, sheetName = "") {
        this.store = new stein_js_client_1.default(`https://api.steinhq.com/v1/storages/${apiId}`);
        this.setConfig({ sheetName });
    }
    setConfig = (config) => {
        this.config = config;
    };
    clearConfig = () => {
        this.config = { sheetName: this.config.sheetName };
    };
    create(rows, sheetName) {
        const { authentication } = this.config;
        const sheet = sheetName ?? this.config.sheetName;
        return this.store.append(sheet, rows, { authentication });
    }
    update(options, sheetName) {
        const { authentication } = this.config;
        const sheet = sheetName ?? this.config.sheetName;
        return this.store.edit(sheet, { ...options, authentication });
    }
    delete(options, sheetName) {
        const sheet = sheetName ?? this.config.sheetName;
        const { authentication } = this.config;
        return this.store.delete(sheet, { ...options, authentication });
    }
    async get(sheetName, options) {
        const sheet = sheetName ?? this.config.sheetName;
        const response = await this.store.read(sheet, options);
        return response.filter((data) => {
            const values = Object.values(data);
            return values.filter((value) => value !== null).length > 0;
        });
    }
    async getWithType(sheetName, options) {
        const response = await this.get(sheetName, options);
        const typeResponse = await this.getType(sheetName);
        return response.map((data) => {
            const keys = Object.keys(data);
            return keys.reduce((ret, key) => {
                const [type, delimiter] = typeResponse[key];
                const value = data[key];
                ret[key] = value;
                if (type === "array")
                    ret[key] = value.split(delimiter);
                if (type === "number")
                    ret[key] = parseFloat(value);
                if (type === "object")
                    ret[key] = JSON.parse(value);
                return ret;
            }, {});
        });
    }
    async getType(sheetName, options) {
        const { sheetName: nameSheet, authentication } = this.config;
        const sheet = sheetName ?? nameSheet;
        const response = await this.store.read(`${sheet}Type`, {
            ...options,
            authentication,
        });
        return response.reduce((ret, { column, type, delimiter }) => {
            ret[column] = [type, delimiter];
            return ret;
        }, {});
    }
}
exports.default = Stein;
