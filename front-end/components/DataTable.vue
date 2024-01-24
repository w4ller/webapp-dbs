<template>
  <q-table
      :columns="columns"
      :filter="filter"
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
import sql from "../sql/sql.enum"
import type {IQueryResponse} from "~/components/Tabs.vue";

const emit = defineEmits<{
  dtClick: [data: string]
}>()
const separator = ref('vertical')
const filter = ref('')
const pagination = {
  rowsPerPage: 30,
}
const props = defineProps<{
  dbData: IQueryResponse
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
  console.log(firstRow)
  return []
})


async function onRowClick(e: Event, row: any) {
  if (row.tablename) {
    emit('dtClick', `${props.dbData.dbName}:${sql.selectAllFrom} ${row.tablename};`)
  }
}


</script>
