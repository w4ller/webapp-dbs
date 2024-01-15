"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
class App {
    constructor(controllers, port) {
        this._controllers = controllers;
        this.app = express();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeControllers();
    }
    initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }
    initializeControllers() {
        this._controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
    // express instance getter
    getExpressInstance() {
        return this.app;
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map