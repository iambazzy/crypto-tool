<template>
  <div>
    <label for="target-marketcap" class="block text-xs font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-2">
      Target Market Cap
    </label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <span class="text-primary-500 dark:text-primary-400 text-lg font-semibold">$</span>
      </div>
      <input
        id="target-marketcap"
        v-model="displayValue"
        type="text"
        inputmode="decimal"
        placeholder="0.00"
        class="w-full pl-8 pr-4 py-3 text-lg font-semibold border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
        :class="[
          isValid
            ? 'border-primary-200 dark:border-primary-700 bg-white dark:bg-primary-800 text-primary-900 dark:text-primary-50'
            : 'border-danger-300 bg-danger-50 dark:bg-danger-900/20 text-danger-700 dark:text-danger-400'
        ]"
        @input="handleInput"
        @blur="handleBlur"
        aria-label="Enter target market cap"
        :aria-invalid="!isValid"
        :aria-describedby="isValid ? 'marketcap-helper' : 'marketcap-error'"
      />
    </div>
    <p
      v-if="isValid"
      id="marketcap-helper"
      class="mt-2 text-xs text-primary-500 dark:text-primary-400"
    >
      Enter the market cap you want to analyze (e.g., 1000000000 for $1B)
    </p>
    <p
      v-else
      id="marketcap-error"
      class="mt-2 text-xs text-danger-600 dark:text-danger-400"
    >
      Please enter a valid positive number
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
}>()

const props = defineProps<{
  modelValue?: number | null
}>()

const displayValue = ref('')
const isValid = ref(true)

watch(() => props.modelValue, (newValue) => {
  if (newValue !== null && newValue !== undefined) {
    displayValue.value = formatDisplayValue(newValue)
  }
}, { immediate: true })

function formatDisplayValue(value: number): string {
  if (value >= 1e12) {
    return (value / 1e12).toFixed(2) + 'T'
  } else if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + 'B'
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(2) + 'M'
  }
  return value.toString()
}

function parseInputValue(input: string): number | null {
  let value = input.trim().toUpperCase()

  let multiplier = 1
  if (value.endsWith('T')) {
    multiplier = 1e12
    value = value.slice(0, -1)
  } else if (value.endsWith('B')) {
    multiplier = 1e9
    value = value.slice(0, -1)
  } else if (value.endsWith('M')) {
    multiplier = 1e6
    value = value.slice(0, -1)
  }

  const numValue = parseFloat(value)
  if (isNaN(numValue) || numValue <= 0) {
    return null
  }

  return numValue * multiplier
}

function handleInput(event: Event) {
  const input = event.target as HTMLInputElement
  const value = input.value

  displayValue.value = value

  if (value === '') {
    isValid.value = true
    emit('update:modelValue', null)
    return
  }

  const parsedValue = parseInputValue(value)
  if (parsedValue !== null) {
    isValid.value = true
    emit('update:modelValue', parsedValue)
  } else {
    isValid.value = false
    emit('update:modelValue', null)
  }
}

function handleBlur() {
  if (displayValue.value !== '') {
    const parsedValue = parseInputValue(displayValue.value)
    if (parsedValue !== null) {
      displayValue.value = formatDisplayValue(parsedValue)
    }
  }
}
</script>
