<script lang="ts" setup>
import type {ModelRef} from "vue";
import type {IQueryResponse} from "~/components/IQueryResponse";
import type {IQueryError} from "~/components/IQueryError";
import type {IDb} from "~/components/IDb";

const {$api} = useNuxtApp()
const queryContent = defineModel('query') as ModelRef<string>
const resultData = defineModel('resultData') as ModelRef<IQueryResponse>
const pendingData = ref(false)
const errorData = ref(null) as any
const store = queryStore()

async function sendQuery(sql: string) {
  if (sql === '') return
  const {
    data,
    pending,
    error
  } = await $api.query.getRows(sql);

  errorData.value = error
  pendingData.value = pending.value && toRaw(pending.value)
  resultData.value = data.value && toRaw(data.value) || {} as IQueryResponse // rows ?? [{}]
}

const errors = computed(() => {
  console.log(errorData)
  return errorData as IQueryError && toRaw(errorData) as IQueryError || {} as IQueryError
})

async function dataTableClick(data: string) {
  await nextTick()
  await sendQuery(data)

}

function showDbTables(db: IDb) {
  resultData.value = {
    dbName: db.name,
    rows: db.tables
  }
}
</script>

<template>
  <q-item-section>
    <TextArea
        v-model="queryContent"
        @sendHighlighted="sendQuery($event)" @sendQuery="sendQuery(queryContent)"/>
    <div class="q-gutter-xs">
      <q-btn v-for="db in store.dbs" @click="showDbTables(db)">{{ db.name }}</q-btn>
    </div>
    <q-separator/>

    <DataTable
        :db-data="resultData"
        @dt-click="dataTableClick"/>
    <q-separator/>
    <div v-if="errorData?.value">
      <p>{{ errorData }}</p>
    </div>

  </q-item-section>
</template>
