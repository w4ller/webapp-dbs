import BaseController from "./Base.controller";
import express from 'express'
import {DbsSingletonService} from "../service/DbsSingleton.service";


export class MyQueriesController extends BaseController {
    private url: string = '/myQueries'

    constructor() {
        super()
        this.intializeRoutes()
    }

    public async myQueries(_request: express.Request, _response: express.Response): Promise<void> {
        try {
            const db = DbsSingletonService.getInstance().db('local')
            _response.send(await db.getQueries())
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
        this.router.get(this.url, this.myQueries)
    }

}
