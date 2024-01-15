import {defineStore} from "pinia";

export const queryStore = defineStore("queryStore", {
    state: () => ({
        queryResult: {},
    }),
    actions: {
        async fetchQuery(sql: string) {
            console.log("sql", sql);
            const data: any = await useFetch("http://127.0.0.1:3000/query", {
                method: "GET",
                body: {
                    sql,
                },
            });
            console.log(data);
            if (data) {
                this.queryResult = data.value;
            }
        },
    },
});
