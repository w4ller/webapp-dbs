<template>
  <q-table
      :columns="columns"
      :filter="filter"
      :loading="loading"
      :pagination.sync="pagination"
      :rows="dbData?.rows"
      :separator="separator"
      dense
      @row-click="onRowClick"
  >
    <template v-slot:top-right>
      <q-input v-model="filter" borderless debounce="300" dense placeholder="Search">
        <template v-slot:append>
          <q-icon name="search"/>
        </template>
      </q-input>
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
      tab: ''
    }
  }
}
</script>
