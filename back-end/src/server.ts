import App from './app'
// import 'module-alias/register';
import {QueryDbController} from "./controller/QueryDb.controller";

const app = new App(
[
    new QueryDbController()
],
    3000
)

app.listen()
