import BaseController from "./Base.controller";
import express from 'express'
import {DbsConfigService} from "../service/DbsConfig.service";

export class DbsController extends BaseController {
    private url: string = '/dbs'

    constructor() {
        super()
        this.intializeRoutes()
    }

    public async list(_request: express.Request, _response: express.Response): Promise<void> {
        try {
            const dbsConfigService = new DbsConfigService()
            _response.send(await dbsConfigService.list())
        } catch (error: any) {
            _response.send({
                error: {
                    message: error.message,
                    stack: error.stack
                },

            })
        }
    }

    public intializeRoutes() {
        this.router.get(this.url, this.list)
    }


}
