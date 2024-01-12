import express = require('express')
import bodyParser = require('body-parser')
import BaseController from './controller/Base.controller'

class App {
    public app: express.Application
    public port: number
    private _controllers: Array<BaseController>

    constructor (controllers: Array<BaseController>, port: number) {
      this._controllers = controllers
      this.app = express()
      this.port = port
      this.initializeMiddlewares()
      this.initializeControllers()
    }

    private initializeMiddlewares () {
      this.app.use(bodyParser.json())
    }

    private initializeControllers (): void {
      this._controllers.forEach((controller: BaseController): any => {
        this.app.use('/', controller.router)
      })
    }

    public listen () {
      this.app.listen(this.port, () => {
        console.log(`App listening on the port ${this.port}`)
      })
    }
    // express instance getter
    public getExpressInstance(): express.Application {
        return this.app;
    }

}

export default App
