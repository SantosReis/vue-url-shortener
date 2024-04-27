<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <li
      v-for="shorterner in shorterners"
      :key="shorterner.id"
      :class="'plus'"
    >
      <a :href="shorterner.long">{{ shorterner.short }}</a>
      <button @click="deleteShorterner(shorterner.id)" class="delete-btn">
        x
      </button>
      <button @click="copyLink(shorterner.short)" class="btn clipboard-btn">
        Copy
      </button>
    </li>
  </ul>
</template>
<script setup>
import { defineProps } from "vue";
import { useToast } from "vue-toastification";

const emit = defineEmits(["shorternerDeleted"]);
const toast = useToast();

const props = defineProps({
  shorterners: {
    type: Array,
    required: true,
  },

});

const deleteShorterner = (id) => {
  emit("shorternerDeleted", id);
};

const copyLink = (url) => {

  console.log(url)
  navigator.clipboard.writeText(url);
  toast.success("Copied!");

};
</script>
