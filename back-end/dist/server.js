"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = tslib_1.__importDefault(require("./app"));
// import 'module-alias/register';
const QueryDb_controller_1 = require("./controller/QueryDb.controller");
const app = new app_1.default([
    new QueryDb_controller_1.QueryDbController()
], 3000);
app.listen();
//# sourceMappingURL=server.js.map