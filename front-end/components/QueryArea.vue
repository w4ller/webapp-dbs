<script lang="ts" setup>
import type {ModelRef} from "vue";
import type {IQueryResponse} from "~/components/IQueryResponse";
import type {IQueryError} from "~/components/IQueryError";
import type {IDb} from "~/components/IDb";

const queryContent = defineModel('query') as ModelRef<string>
const resultData = defineModel('resultData') as ModelRef<IQueryResponse | null>
const errorData = ref(null) as any
const qStore = queryStore()
const fStore = filterStore()
const {filter} = reactive(filterStore())


/*
const resultData = computed(() => {
  if (qStore.queryResultSql) {
    return qStore.queryResultSql as IQueryResponse
  }
  return {
    dbName: qStore.db.name,
    rows: qStore.table ?? qStore.db.tables
  } as IQueryResponse
})
*/

async function sendQuery(sql: string) {
  fStore.filter = {
    db: '',
    table: '',
    sql: sql
  }
  // await qStore.applyFilters()
  // resultData.value = qStore.queryResultSql
}

const errors = computed(() => {
  console.log(errorData)
  return errorData as IQueryError && toRaw(errorData) as IQueryError || {} as IQueryError
})


async function showDbTableFromButton(db: IDb) {
  fStore.filter = {
    db: db.name,
    table: '',
    sql: ''
  }
//  await qStore.applyFilters()
}

function fillTable() {
  if (qStore.queryResultSql) {
    resultData.value = qStore.queryResultSql
    return
  }
  resultData.value = {
    dbName: qStore.db.name,
    rows: qStore.table ?? qStore.db.tables
  }
}

onMounted(async () => {

})


watch(() => filter,
    async () => {
      await qStore.applyFilters()
      fillTable()
    },
    {deep: true}
)

</script>

<template>
  <q-item-section>
    <TextArea
        v-model="queryContent"
        @sendHighlighted="sendQuery($event)" @sendQuery="sendQuery(queryContent)"/>
    <div class="q-gutter-xs">
      <q-btn v-for="db in qStore.dbs" @click="showDbTableFromButton(db)">{{ db.name }}</q-btn>
    </div>
    <q-separator/>

    <DataTable
        :db-data="resultData"
        :loading="qStore.pending"/>
    <q-separator/>
    <div v-if="errorData?.value">
      <p>{{ errorData }}</p>
    </div>

  </q-item-section>
</template>
