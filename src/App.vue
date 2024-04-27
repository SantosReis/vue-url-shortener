<template>
  <Header />
  <div class="container">
    <TransactionList
      :transactions="transactions"
      @transactionDeleted="handleTransactionDeleted"
    />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import TransactionList from "./components/TransactionList.vue";
import AddTransaction from "./components/AddTransaction.vue";

import { useToast } from "vue-toastification";
import axios from 'axios';
import { ref, onMounted } from "vue";

const toast = useToast();
const transactions = ref([]);
const API_URL = import.meta.env.VITE_API_URL;

onMounted(async () => {

  const savedTransactionsApi = await fetch(API_URL+`/api/shortener-list`).then((r) => r.json());
  if (savedTransactionsApi) {
    transactions.value = savedTransactionsApi;
  }
});

// Add Shortener
const handleTransactionSubmitted = (transactionData) => {

  axios.post(API_URL+'/api/shortener', {
    url: transactionData.text,
  })
  .then(function (response) {
    console.log(response);

    if(!response.generated){
      toast.error("Shortener already exists!");
      return false;
    }

    toast.success("Shortener added");
    
  })
  .catch(function (error) {
    console.log(error);

    if(error.response.data.errors.url[0]){
      toast.error(error.response.data.errors.url[0]);
    }

  });
  
};

// Delete Shortener
const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter(
    (transaction) => transaction.id !== id
  );

  toast.success("Shortener deleted");
};
</script>
