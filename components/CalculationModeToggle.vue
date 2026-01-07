<template>
  <div>
    <label class="block text-xs font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-3 text-center">
      Calculation Mode
    </label>
    <div
      role="radiogroup"
      aria-label="Select calculation mode"
      class="inline-flex bg-primary-100 dark:bg-primary-800 rounded-lg p-1 shadow-inner"
      @keydown="handleKeyDown"
    >
      <button
        type="button"
        role="radio"
        :aria-checked="modelValue === 'price'"
        :tabindex="modelValue === 'price' ? 0 : -1"
        @click="selectMode('price')"
        :class="[
          'px-4 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2',
          modelValue === 'price'
            ? 'bg-accent-500 text-white shadow-md'
            : 'text-primary-700 dark:text-primary-300 hover:text-primary-900 dark:hover:text-primary-100'
        ]"
      >
        <span class="whitespace-nowrap">Target Price → Market Cap</span>
      </button>
      <button
        type="button"
        role="radio"
        :aria-checked="modelValue === 'marketCap'"
        :tabindex="modelValue === 'marketCap' ? 0 : -1"
        @click="selectMode('marketCap')"
        :class="[
          'px-4 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2',
          modelValue === 'marketCap'
            ? 'bg-accent-500 text-white shadow-md'
            : 'text-primary-700 dark:text-primary-300 hover:text-primary-900 dark:hover:text-primary-100'
        ]"
      >
        <span class="whitespace-nowrap">Target Market Cap → Price</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
type CalculationMode = 'price' | 'marketCap'

interface Props {
  modelValue: CalculationMode
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: CalculationMode]
}>()

function selectMode(mode: CalculationMode) {
  emit('update:modelValue', mode)
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    selectMode('price')
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    selectMode('marketCap')
  }
}
</script>
