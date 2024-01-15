"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryDbController = void 0;
const tslib_1 = require("tslib");
const Base_controller_1 = tslib_1.__importDefault(require("./Base.controller"));
const QueryBuilder_1 = require("../core/QueryBuilder");
class QueryDbController extends Base_controller_1.default {
    constructor() {
        super();
        this.url = '/query';
        this.intializeRoutes();
    }
    query(_request, _response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const builder = new QueryBuilder_1.QueryBuilder();
                _response.send(yield builder.build(_request.body.sql));
            }
            catch (error) {
                _response.send({
                    error: {
                        message: error.message,
                        stack: error.stack
                    },
                });
            }
        });
    }
    intializeRoutes() {
        this.router.get(this.url, this.query);
    }
}
exports.QueryDbController = QueryDbController;
//# sourceMappingURL=QueryDb.controller.js.map