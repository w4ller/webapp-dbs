<template>
  <div>
    <!--    <q-input ref="textarea" v-model="text" type="textarea"
                 @blur="setHighlightedText"
                 @click="getHighlightedText"
                   @blur="setHighlightedText"

        />-->
    <div
        ref="textarea"
        class="textarea-highlight"
        v-html="textareaHighlighted"
    >

    </div>

    <div
        ref="textarea"
        class="textarea"
        contenteditable="true"
        @click="thisRespondHightlightText"
        @keyup="updateContent"
        @keydown.enter="preventDiv"
    >
      {{ text }}
    </div>


    <div class="q-gutter-xs">
      <q-separator/>
      <q-btn @click="sendQuery">Send query</q-btn>
    </div>
  </div>
  {{ textareaHighlighted }} {{ highlightedTextStart }} {{ highlightedTextEnd }}
</template>
<script lang="ts" setup>
import {ref} from 'vue'


// const emit = defineEmits(['sendQuery', 'sendHighlighted'])
const emit = defineEmits<{
  (e: 'sendQuery'): void,
  (e: 'sendHighlighted', value: string): void
}>()

const text = defineModel({type: String})
const textarea = ref('')
const textareaHighlighted = ref('')
let highlightedTextStart: number = 0
let highlightedTextEnd: number = 0

function sendQuery() {
  nextTick().then(() => {
        const highlighted = getSelectionText()
        console.log('sendHigh', highlighted)
        highlighted ? emit('sendHighlighted', highlighted) : emit('sendQuery')
      }
  )
}

function preventDiv($event: Event) {
  $event.preventDefault()
  document.execCommand('insertLineBreak')

}

function updateContent(event: Event) {
  // (event.target as HTMLInputElement).blur()
  textareaHighlighted.value = ''
  text.value = textarea.value?.innerText
}

function thisRespondHightlightText() {
  textareaHighlighted.value = ''
  const selectedText = getSelectionText();
  if (!selectedText) return
  const txt = text.value || ''
  console.log(txt)
  textareaHighlighted.value = [txt.slice(0, highlightedTextEnd), '</span>', txt.slice(highlightedTextEnd)].join('')
  textareaHighlighted.value = [textareaHighlighted.value.slice(0, highlightedTextStart), '<span class="red">', textareaHighlighted.value.slice(highlightedTextStart)].join('')
}

function getSelectionText() {
  let selectedTxt = '';
  let selection = '';

  if (window.getSelection) {
    selectedTxt = window?.getSelection()?.toString() || '';
    selection = window?.getSelection() ?? ''
    highlightedTextStart = selection.baseOffset < selection.focusOffset ? selection.baseOffset : selection.focusOffset
    highlightedTextEnd = selection.focusOffset > selection.baseOffset ? selection.focusOffset : selection.baseOffset
  } else if (document.selection && document.selection.type != "Control") {
    selectedTxt = document.selection.createRange().text;
  }
  console.log(selectedTxt)
  return selectedTxt;
}

function getHighlightedText(event: Event): string {
  const textareaRef = textarea.value
  highlightedTextStart = textareaRef?.nativeEl?.selectionStart
  highlightedTextEnd = textareaRef?.nativeEl?.selectionEnd

  console.log('asd', event)
  if (!highlightedTextStart || !highlightedTextEnd) return ''
  return text.value?.slice(highlightedTextStart, highlightedTextEnd) ?? ''
}

function setHighlightedText() {
  const textareaRef = textarea.value
  /*  textareaRef?.nativeEl?.selectionStart = highlightedTextStart
    textareaRef?.nativeEl?.selectionEnd = highlightedTextEnd*/
  console.log('asd', highlightedTextStart, highlightedTextEnd, textareaRef)
}

function removeTags(inputString: string) {

  const pattern = /<[^>]*>/g;
  const result = inputString.replace(pattern, '')
  return result;
}

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
}

.textarea-highlight {
  position: absolute;
  pointer-events: none;
  background-color: transparent;
  color: transparent;
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
}

.hide {
  display: none !important;
}

.red {
  background-color: #e95433;
  color: white;
}

</style>
