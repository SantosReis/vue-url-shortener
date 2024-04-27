<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <li
      v-for="transaction in transactions"
      :key="transaction.id"
      :class="'plus'"
    >
      <a :href="transaction.long">{{ transaction.short }}</a>
      <button @click="deleteTransaction(transaction.id)" class="delete-btn">
        x
      </button>
      <button @click="copyLink(transaction.short)" class="btn clipboard-btn">
        Copy
        <span :class="{ 'visible' : isVisible }">URL copied!</span>
      </button>
    </li>
  </ul>
</template>
<script setup>
import { defineProps } from "vue";
import { ref } from "vue";
import { useToast } from "vue-toastification";

const emit = defineEmits(["transactionDeleted"]);
const toast = useToast();

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },

});

// console.log(props)

const deleteTransaction = (id) => {
  emit("transactionDeleted", id);
};

// let isVisible = false;
let isVisible = ref(false);

const copyLink = (url) => {

  console.log(url)
  navigator.clipboard.writeText(url);
  toast.success("Copied!");
  // console.log('Copied!')
  // console.log(isVisible)
  // isVisible.value = true

	// setTimeout(function () {
  //   console.log('hello darkness my old friend');
	// 	isVisible.value = false
	// }, 1000);

};
</script>
