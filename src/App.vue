<template>
  <Header />
  <div class="container">
    <ShortenerList
      :shorterners="shorterners"
      @shorternerDeleted="handleShorternerDeleted"
    />
    <AddShortener @shorternersSubmitted="handleShorternersSubmitted" />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import ShortenerList from "./components/Shortener.vue";
import AddShortener from "./components/AddShortener.vue";

import { useToast } from "vue-toastification";
import axios from "axios";
import { ref, onMounted } from "vue";

const toast = useToast();
const shorterners = ref([]);
const API_URL = import.meta.env.VITE_API_URL;

onMounted(async () => {
  const shortenerList = await fetch(API_URL + `/api/shortener-list`).then((r) =>
    r.json()
  );
  if (shortenerList) {
    shorterners.value = shortenerList;
  }
});

// Add Shortener
const handleShorternersSubmitted = (shortenerData) => {
  axios
    .post(API_URL + "/api/shortener", {
      url: shortenerData.url,
    })
    .then(function (response) {
      if (!response.data.generated) {
        toast.error("Shortener already exists!");
        return false;
      }

      //update new shortener into history
      shorterners.value.push({
        short: response.data.short_url,
        long: response.data.long_url,
      });

      toast.success("Shortener added");
    })
    .catch(function (error) {
      //TODO sanatize errors in a better way
      if (error.response.data.errors.url[0]) {
        toast.error(error.response.data.errors.url[0]);
      }
    });
};

// Delete Shortener
const handleShorternerDeleted = (id) => {
  shorterners.value = shorterners.value.filter(
    (shorterner) => shorterner.id !== id
  );

  toast.success("Shortener deleted");
};
</script>
