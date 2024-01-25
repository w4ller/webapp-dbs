import BaseController from "./Base.controller";
import express from 'express'
import {QueryBuilder} from "../core/QueryBuilder";


export class QueryDbController extends BaseController {
    private url: string = '/query'

    constructor() {
        super()
        this.intializeRoutes()
    }

    public async query(_request: express.Request, _response: express.Response): Promise<any> {
        try {
            const builder = new QueryBuilder()
            _response.send(await builder.build(_request.body.sql))
        } catch (error: any) {
            _response.status(500).send({
                error: {
                    message: error.message,
                    stack: error.stack
                },

            })
        }
    }

    public intializeRoutes() {
        this.router.post(this.url, this.query)
    }

}
