<template>
  <q-table
      :columns="columns"
      :filter="filter"
      :pagination.sync="pagination"
      :rows="data"
      :separator="separator"
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

const separator = ref('vertical')
const filter = ref('')
const pagination = {
  rowsPerPage: 15,
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
</script>
