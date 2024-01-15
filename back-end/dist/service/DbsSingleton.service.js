"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbsSingletonService = exports.dbClientWrapper = void 0;
const tslib_1 = require("tslib");
const pg_1 = require("pg");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
class dbClientWrapper {
    constructor(name, client) {
        this.name = name;
        this.client = client;
    }
    query(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.query(query);
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        });
    }
}
exports.dbClientWrapper = dbClientWrapper;
class DbsSingletonService {
    constructor() {
        this.path = path_1.default.join(__dirname, '..', 'config', 'config.json');
        this.config = JSON.parse(fs_1.default.readFileSync(this.path, 'utf8'));
        this.connections = [];
    }
    static getInstance() {
        if (!DbsSingletonService.instance) {
            DbsSingletonService.instance = new DbsSingletonService();
        }
        return DbsSingletonService.instance;
    }
    db(dbName) {
        let clientWrapper = this.connections.find(c => c.name === dbName);
        if (clientWrapper)
            return clientWrapper;
        try {
            clientWrapper = new dbClientWrapper(dbName, new pg_1.Pool(this.config[dbName]));
            this.connections.push(clientWrapper);
            return clientWrapper;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
}
exports.DbsSingletonService = DbsSingletonService;
//# sourceMappingURL=DbsSingleton.service.js.map