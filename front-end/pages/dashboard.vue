<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <tabs></tabs>
      </q-page>
    </q-page-container>
  </q-layout>
</template>


<script lang="ts" setup>
const store = queryStore()


onMounted(async () => {
  await store.dbsList()
})
</script>
