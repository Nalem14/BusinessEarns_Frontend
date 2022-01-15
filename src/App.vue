<template>
  <div>
    <Header />
    <main>

      <!-- <section> page content -->
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "./views/partials/Header.vue";
import Footer from "./views/partials/Footer.vue";
</script>

<style lang="scss">
</style>
