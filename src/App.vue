<template>
  <div>
    <Header />
    <main>

      <!-- <section> page content -->
      <!-- use a dynamic transition name -->
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transitionName">
          <component :is="Component" :key="route.path"/>
        </transition>
      </router-view>
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
