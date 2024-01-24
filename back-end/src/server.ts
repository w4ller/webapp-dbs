import App from './app'
// import 'module-alias/register';
import {QueryDbController} from "./controller/QueryDb.controller";
import {MyQueriesController} from "./controller/MyQueries.controller";

const app = new App(
    [
        new QueryDbController(),
        new MyQueriesController()
    ],
    3000
)

app.listen()
