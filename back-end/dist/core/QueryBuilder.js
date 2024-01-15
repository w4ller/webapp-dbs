"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
const tslib_1 = require("tslib");
/**
 * Example query:
 *  test3:select id from media where media_barcode = 'PQQ1NG07';
 *  flowDB: select * from picture_blacklist WHERE media_id = @0;
 */
const DbsSingleton_service_1 = require("../service/DbsSingleton.service");
const BlacklistQueryCommands_enum_1 = require("./BlacklistQueryCommands.enum");
class QueryBuilder {
    constructor() {
        return this;
    }
    replaceParams(sql, params) {
        return sql.replace(/@(\d+)/g, function (match, idx) {
            const idxArray = parseInt(idx, 10);
            return params[idxArray] || match;
        });
    }
    thorwErrorOnBlacklistCommands(query) {
        if (Object.values(BlacklistQueryCommands_enum_1.BlacklistQueryCommandsEnum)
            .some(value => query.toUpperCase().includes(value.toUpperCase()))) {
            throw new Error('Modify or write databases is not allowed');
        }
    }
    singleQuery(query, params = null) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!query)
                throw new Error('No query to execute');
            this.thorwErrorOnBlacklistCommands(query);
            const [db, sql] = query.split(':');
            const sqlWithParams = params ? this.replaceParams(sql, params) : sql;
            const result = yield DbsSingleton_service_1.DbsSingletonService.getInstance().db(db.trim()).query(`${sqlWithParams};`);
            return result;
        });
    }
    arrayToSqlString(array) {
        if (array.length <= 1)
            return [array[0].toString()];
        let sql = array.map(s => {
            if (typeof s === 'string')
                return "'" + s + "'";
            return s;
        }).toString();
        return [`(${sql})`];
    }
    formatParams(result) {
        let a = result.rows.map((row) => {
            return row[result.fields[0].name];
        });
        a = this.arrayToSqlString(a);
        return a;
    }
    parseQuery(query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const params = [];
            let result = null;
            const queries = query.split(';');
            queries.pop();
            for (let n = 0; n <= queries.length - 1; n++) {
                const r = yield this.singleQuery(queries[n], params[n - 1]);
                n !== queries.length - 1 ? params.push(this.formatParams(r)) : result = r;
            }
            return (_a = result.rows) !== null && _a !== void 0 ? _a : [];
        });
    }
    build(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.parseQuery(query);
        });
    }
}
exports.QueryBuilder = QueryBuilder;
//# sourceMappingURL=QueryBuilder.js.map