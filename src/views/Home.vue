<template>
  <Header />
  <div class="container">
    <ShortenerList
      :shorterners="shortenerStore.shorterners"
      @shorternerDeleted="shortenerStore.handleShorternerDeleted"
    />
    <AddShortener
      @shorternersSubmitted="shortenerStore.handleShorternersSubmitted"
    />
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import ShortenerList from "../components/Shortener.vue";
import AddShortener from "../components/AddShortener.vue";

import { onMounted } from "vue";
import { useShortenerStore } from "../stores/shortener";

const shortenerStore = useShortenerStore();

onMounted(async () => {
  await shortenerStore.getShortener();
});
</script>
