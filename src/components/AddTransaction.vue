<template>
  <h3>Add url shortener</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <input type="text" id="text" v-model="text" placeholder="Enter text..." />
    </div>
    <div class="form-control">
    </div>
    <button class="btn">Add transaction</button>
  </form>
</template>
<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";

const text = ref("");
// const amount = ref("");

const emit = defineEmits(["transactionSubmitted"]);

const toast = useToast();

const onSubmit = () => {
  if (!text.value) {
    toast.error("Field must be filled");
    return;
  }

  const transactionData = {
    text: text.value,
  };

  emit("transactionSubmitted", transactionData);

  text.value = "";
  // amount.value = "";
};
</script>
