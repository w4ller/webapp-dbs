<template>
  <div>
    <div

        :style="{ height: dynamicHeight }"
        class="textarea textarea-highlight"
        v-html="textareaHighlighted"
    />
    <div
        ref="textarea"
        class="textarea"
        contenteditable="true"
        @click="setHightlightText"
        @keydown="removeHighlightedText"
        v-text="textarea?.innerText"
    />
    {{ foundWord }}
    <div class="q-gutter-xs">
      <q-separator/>
      <q-btn @click="sendQuery">Send query</q-btn>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'

const emit = defineEmits<{
  (e: 'sendQuery'): void,
  (e: 'sendHighlighted', value: string): void
}>()
const store = queryStore()
const dbs = [store.activiti, store.flowDb, store.test3]
const text = defineModel({type: String})
const textarea = ref<HTMLElement>()
const textareaHighlighted = ref('')
let highlightedTextStart: number = 0
let highlightedTextEnd: number = 0
const height = ref<number>(250)
let resize = null

function sendQuery() {
  nextTick().then(() => {
        text.value = textarea.value?.innerText
        const highlighted = getSelectionText()
        highlighted ? emit('sendHighlighted', highlighted) : emit('sendQuery')
      }
  )
}

function removeHighlightedText() {
  getSelectionRange()
  getWritingWord()
  console.log(highlightedTextStart, highlightedTextEnd)
  textareaHighlighted.value = ''
}

function getWritingWord() {
  text.value = textarea.value?.innerText || ''
  const arr = text.value.split(' ')
  console.log(arr[arr.length - 1])
}

const lastWord = computed(() => {
  const arr = text.value?.split(' ') ?? []
  return arr[arr.length - 1] ?? ''
})

const foundWord = computed(() => {
  // console.log(dbs.findIndex(db => db.dbName.includes(lastWord.value)))
  return ''
})

function setHightlightText() {
  textareaHighlighted.value = ''
  const selectedText = getSelectionText();
  getSelectionRange()
  if (!selectedText) return
  const txt = textarea.value?.innerText || ''
  textareaHighlighted.value = [txt.slice(0, highlightedTextEnd), '</span>', txt.slice(highlightedTextEnd)].join('')
  textareaHighlighted.value = [textareaHighlighted.value.slice(0, highlightedTextStart), '<span class="red">', textareaHighlighted.value.slice(highlightedTextStart)].join('')
}

function getSelectionRange() {
  let selection: Selection | null;
  if (window.getSelection) {
    selection = window?.getSelection()
    const focus = selection?.focusOffset ?? 0
    const anchor = selection?.anchorOffset ?? 0
    highlightedTextStart = anchor < focus ? anchor : focus
    highlightedTextEnd = focus > anchor ? focus : anchor
  }
}

function getSelectionText() {
  let selectedTxt = '';
  if (window.getSelection) {
    selectedTxt = window?.getSelection()?.toString() ?? '';
  }
  return selectedTxt;
}

function onResize() {
  height.value = textarea?.value?.clientHeight ?? 0
}

const dynamicHeight = computed(() => {
  return `${height.value}px`
})


onMounted(() => {
  textarea?.value?.insertAdjacentHTML('afterbegin', text.value ?? '')
  resize = new ResizeObserver(onResize)
  resize.observe(textarea?.value ?? new HTMLElement())
})

</script>
<style>
.textarea {
  background-color: #fbfbfb;
  height: 250px;
  width: 100%;
  -moz-appearance: textfield-multiline;
  -webkit-appearance: textarea;
  border: 1px solid gray;
  font: medium -moz-fixed;
  overflow: auto;
  padding: 2px;
  resize: vertical;
  white-space: pre-wrap;
  outline: 0px solid transparent;
  font-size: 19px;
}

.textarea-highlight {
  position: absolute;
  pointer-events: none;
  background-color: transparent;
  color: transparent;
  border: 0px;

}

.red {
  background-color: #e95433;
  color: white;
}

</style>
