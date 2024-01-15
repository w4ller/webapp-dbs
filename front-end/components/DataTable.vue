<template>
  <q-table
      :rows="data"
      title="data table"
  ></q-table>
</template>
<script lang="ts" setup>
import {ref} from "vue"

const props = defineProps({
  data: {
    type: Object,
    require: true,
    default: []
  }
})


// const props = defineProps(['data'])

</script>
