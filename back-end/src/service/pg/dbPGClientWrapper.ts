import pkg from "pg";
import fs from "fs";
import path from 'path';
import {fileURLToPath} from 'url';
import {IDbClientWrapper} from "../IDbClientWrapper";

const {Pool} = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class dbPGClientWrapper implements IDbClientWrapper {
    public name: string
    public client: any
    private path = path.join(__dirname, '../../', 'config', 'config.json');
    private config = JSON.parse(fs.readFileSync(this.path, 'utf8'))

    constructor(name: string) {
        this.name = name
        this.client = new Pool(this.config[name])
    }

    public async query(query: string): Promise<any> {
        try {
            return await this.client.query(query);
        } catch (error) {
            throw new Error(`${error}`);
        }

    }

    public getQueries(): any {
    }
}
