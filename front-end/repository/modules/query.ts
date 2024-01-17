import {type FetchOptions} from 'ofetch';
import {type AsyncDataOptions} from '#app';

// locals
import FetchFactory from '../factory';

type IRows = {}

class QueryModule extends FetchFactory<IRows[]> {
    private RESOURCE = '/query';

    /**
     * Return the response as array
     * @param asyncDataOptions options for `useAsyncData`
     * @returns
     */
    async getRows(
        sql: string,
        asyncDataOptions?: AsyncDataOptions<IRows[]>
    ) {

        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        //    'Accept-Language': 'en-US'
                    }
                };
                return this.call(
                    'POST',
                    `${this.RESOURCE}`,
                    {sql: sql}, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }
}

export default QueryModule;
