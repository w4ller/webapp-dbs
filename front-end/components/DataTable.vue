<template>
  <q-table
      :columns="columns"
      :filter="filter"
      :loading="loading"
      :no-data-label="dbData?.error"
      :pagination.sync="pagination"
      :rows="dbData?.rows"
      :separator="separator"
      :title="title"
      dense
      no-results-label="The filter didn't uncover any results"
      @row-click="onRowClick"
  >
    <template v-slot:top-right>
      <q-input v-model="filter" borderless debounce="300" dense placeholder="Search">
        <template v-slot:append>
          <q-icon name="search"/>
        </template>
      </q-input>
    </template>

    <template v-slot:no-data="{ icon, message, filter }">
      <div class="full-width row flex-center text-accent q-gutter-sm">
        <q-icon name="sentiment_dissatisfied" size="2em"/>
        <span>

          <h6> {{ message }} </h6>
          </span>
        <q-icon :name="filter ? 'filter_b_and_w' : icon" size="2em"/>
      </div>
    </template>

  </q-table>
</template>
<script lang="ts" setup>
import type {IQueryResponse} from "~/components/IQueryResponse";

const store = filterStore();
const separator = ref('vertical')
const filter = ref('')
const pagination = {
  rowsPerPage: 30,
}
const props = defineProps<{
  dbData: IQueryResponse,
  loading: boolean
}>()

const title = computed(() => {
  return props.dbData?.executedQuery ? `${props.dbData?.executedQuery}` : `${props.dbData.dbName}`
})

const columns = computed(() => {
  const [firstRow] = props.dbData?.rows ?? [{}]
  if (firstRow) {
    return Object.keys(firstRow).map((key: string) => {
      return {
        name: key,
        label: key,
        field: key,
        sortable: true,
        align: 'left'
      }
    })
  }
  return []
})

function onRowClick(e: Event, row: any) {
  if (row.tablename) {
    store.filter = {
      db: props.dbData.dbName,
      table: row.tablename,
      sql: '',

    }
  }
}
</script>
