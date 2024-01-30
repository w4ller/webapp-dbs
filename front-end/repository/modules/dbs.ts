import {type FetchOptions} from 'ofetch';
import {type AsyncDataOptions} from '#app';


// locals
import FetchFactory from '../factory';
import type {IDb} from "~/components/IDb";

class DbsModule extends FetchFactory<Array<IDb>> {
    private RESOURCE = '/dbs';

    async list(
        asyncDataOptions?: AsyncDataOptions<Array<IDb>>
    ) {

        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {}
                };
                return this.call(
                    'GET',
                    `${this.RESOURCE}`,
                    undefined, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }
}

export default DbsModule;

