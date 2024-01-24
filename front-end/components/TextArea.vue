<template>
  <div class="q-pa-md">
    <q-input v-model="text" type="textarea"/>

    <div class="q-gutter-xs">
      <q-separator/>
      <q-btn @click="sendQuery">Send query</q-btn>
    </div>
  </div>
</template>
<script lang="ts" setup>

const emit = defineEmits(['sendQuery'])
const text = defineModel({type: String})

function sendQuery() {
  nextTick().then(() => {
        emit('sendQuery')
      }
  )
}

</script>
