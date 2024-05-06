<template>
  <h3>Add url shortener</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <input
        type="text"
        id="url"
        v-model="url"
        placeholder="Enter url address..."
      />
    </div>
    <div class="form-control"></div>
    <button class="btn">Add shortener</button>
  </form>
</template>
<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";

const url = ref("");
const emit = defineEmits(["shorternersSubmitted"]);
const toast = useToast();

const onSubmit = () => {
  if (!url.value) {
    toast.error("Field must be filled");
    return;
  }

  const shortenerData = {
    url: url.value,
  };

  emit("shorternersSubmitted", shortenerData);

  url.value = "";
};
</script>
