import path from "path";
import fs from "fs";
import {DbsSingletonService} from "./DbsSingleton.service";
import {fileURLToPath} from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export class DbsConfigService {
    private path = path.join(__dirname, '../', 'config', 'config.json');
    private config = JSON.parse(fs.readFileSync(this.path, 'utf8'))
    private dbs: Array<any> = []

    private QUERY = "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'"

    public async list(): Promise<Array<any>> {
        for (const [key] of Object.entries(this.config)) {
            // @ts-ignore
            this.dbs.push({
                name: key,
                tables: (await DbsSingletonService.getInstance().db(key).query(this.QUERY)).rows ?? []
            })
        }
        return this.dbs
    }
}
