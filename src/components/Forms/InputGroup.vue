<script setup>
const props = defineProps({
  label: String,
  type: String,
  placeholder: String,
  customClasses: String,
  modelValue: String,
  required: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <div :class="props.customClasses">
    <label class="mb-2.5 block text-black dark:text-white">
      {{ props.label }}
      <span v-if="required" class="text-meta-1">*</span>
    </label>
    <input
      :type="props.type"
      :placeholder="props.placeholder"
      class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
