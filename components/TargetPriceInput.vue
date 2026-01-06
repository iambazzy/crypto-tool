<template>
  <div>
    <label for="target-price" class="block text-xs font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-2">
      Target Price
    </label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <span class="text-primary-500 dark:text-primary-400 text-lg font-semibold">$</span>
      </div>
      <input
        id="target-price"
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
        aria-label="Enter target price"
        :aria-invalid="!isValid"
        :aria-describedby="isValid ? 'price-helper' : 'price-error'"
      />
    </div>
    <p
      v-if="isValid"
      id="price-helper"
      class="mt-2 text-xs text-primary-500 dark:text-primary-400"
    >
      Enter the price you want to analyze
    </p>
    <p
      v-else
      id="price-error"
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
    displayValue.value = newValue.toString()
  }
}, { immediate: true })

function handleInput(event: Event) {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/[^0-9.]/g, '')

  const parts = value.split('.')
  if (parts.length > 2) {
    value = parts[0] + '.' + parts.slice(1).join('')
  }

  displayValue.value = value

  if (value === '') {
    isValid.value = true
    emit('update:modelValue', null)
    return
  }

  const numValue = parseFloat(value)
  if (!isNaN(numValue) && numValue > 0) {
    isValid.value = true
    emit('update:modelValue', numValue)
  } else {
    isValid.value = false
    emit('update:modelValue', null)
  }
}

function handleBlur() {
  if (displayValue.value !== '') {
    const numValue = parseFloat(displayValue.value)
    if (!isNaN(numValue) && numValue > 0) {
      displayValue.value = numValue.toFixed(2)
    }
  }
}
</script>
