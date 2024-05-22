<template>
  <!-- Add Shortener Start -->
  <DefaultCard cardTitle="Add Shortener">
    <form id="form" @submit.prevent="onSubmit">
      <div class="p-6.5">
        {{ url }}

        <InputGroup
          label="URL"
          id="url"
          type="text"
          placeholder="Enter url address..."
          customClasses="mb-4.5"
          v-model="url"
        />

        <button
          class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
        >
          Add shortener
        </button>
      </div>
    </form>
  </DefaultCard>
  <!-- Add Shortener End -->
</template>
<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

import DefaultCard from '@/components/Forms/DefaultCard.vue'
import InputGroup from '@/components/Forms/InputGroup.vue'

const url = ref('aaa')
const emit = defineEmits(['shorternersSubmitted'])
const toast = useToast()

const onSubmit = () => {
  if (!url.value) {
    toast.error('Field must be filled')
    return
  }

  const shortenerData = {
    url: url.value
  }

  emit('shorternersSubmitted', shortenerData)

  url.value = ''
}
</script>
