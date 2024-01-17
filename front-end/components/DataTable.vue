<template>
  <q-table
      :columns="columns"
      :filter="filter"
      :pagination.sync="pagination"
      :rows="tableRows"
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
import {ref} from "vue"
import sql from "../sql/sql.enum"

const {$api} = useNuxtApp();
const separator = ref('vertical')
const filter = ref('')
const tableRows = ref([])
const emit = defineEmits(['outputData'])
const pagination = {
  rowsPerPage: 30,
}
const props = defineProps({
  data: {
    type: Object,
    require: true,
    default: []
  },

})
const columns = computed(() => {
  return Object.keys(props.data[0] ?? []).map((key: string) => {
    return {
      name: key,
      label: key,
      field: key,
      sortable: true,
      align: 'left'
    }
  })
})


async function onRowClick(e: Event, row: any) {

  const {
    data: rows,
    pending,
    error
  }: any = await $api.query.getRows(`flowDB:${sql.selectAllFrom} ${row.tablename};`)
  emit('outputData', rows.value)
}

watch(() => props.data, (data: any) => {
  tableRows.value = data
});

</script>
