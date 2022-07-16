"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stein_js_client_1 = __importDefault(require("stein-js-client"));
class Stein {
    client;
    authentication;
    constructor(apiId, authentication = {}) {
        this.authentication = authentication;
        this.client = new stein_js_client_1.default(`https://api.steinhq.com/v1/storages/${apiId}`);
    }
    create(sheetName, rows) {
        return this.client.append(sheetName, rows, {
            authentication: this.authentication,
        });
    }
    update(sheetName, options) {
        return this.client.edit(sheetName, {
            ...options,
            authentication: this.authentication,
        });
    }
    delete(sheetName, options) {
        return this.client.delete(sheetName, {
            ...options,
            authentication: this.authentication,
        });
    }
    async get(sheetName, options) {
        const response = await this.client.read(sheetName, {
            ...options,
            authentication: this.authentication,
        });
        return response.filter((data) => {
            const values = Object.values(data);
            return values.filter((value) => value !== null).length > 0;
        });
    }
    async getWithType(sheetName, options) {
        const [typeResponse, response] = await Promise.all([
            this.getType(sheetName),
            this.get(sheetName, options),
        ]);
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
    async getType(sheetName) {
        const response = await this.client.read(`${sheetName}Type`, {
            authentication: this.authentication,
        });
        return response.reduce((ret, { column, type, delimiter }) => {
            ret[column] = [type, delimiter];
            return ret;
        }, {});
    }
}
exports.default = Stein;
