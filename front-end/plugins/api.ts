import {$fetch, type FetchOptions} from 'ofetch';

// locals
import QueryModule from '../repository/modules/query';
import MyQueriesModule from "../repository/modules/myQueries";
import DbsModule from "~/repository/modules/dbs";

interface IApiInstance {
    query: QueryModule;
    myQueries: MyQueriesModule;
    dbs: DbsModule
}

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const fetchOptions: FetchOptions = {
        baseURL: `${config.public.apiBaseUrl}`
    };
    // Create a new instance of $fecther with custom option
    const apiFecther = $fetch.create(fetchOptions);

    // An object containing all repositories we need to expose
    const modules: IApiInstance = {
        query: new QueryModule(apiFecther),
        myQueries: new MyQueriesModule(apiFecther),
        dbs: new DbsModule(apiFecther)
    };

    return {
        provide: {
            api: modules
        }
    };
});
