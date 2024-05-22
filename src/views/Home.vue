<template>
  <DefaultLayout>
    <div class="mx-auto max-w-242.5">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <!-- Breadcrumb End -->

      <Header />
      <!-- ====== Form Layout Section Start -->
      <div class="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div class="flex flex-col gap-9">
          <ShortenerTable
            :shorterners="shortenerStore.shorterners"
            @shorternerDeleted="shortenerStore.handleShorternerDeleted"
          />
        </div>

        <div class="flex flex-col gap-9">
          <AddShortener @shorternersSubmitted="shortenerStore.handleShorternersSubmitted" />
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

// import Header from '../components/Header.vue'
// import ShortenerList from '../components/Shortener.vue'
import ShortenerTable from '../components/ShortenerTable.vue'
import AddShortener from '../components/AddShortener.vue'

import { ref, onMounted } from 'vue'
import { useShortenerStore } from '../stores/shortener'

const shortenerStore = useShortenerStore()
const pageTitle = ref('Home')

onMounted(async () => {
  await shortenerStore.getShortener()
})
</script>
