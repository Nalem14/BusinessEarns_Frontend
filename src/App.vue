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

<script>
import Header from "./views/partials/Header.vue";
import Footer from "./views/partials/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer
  },
};
</script>

<style lang="scss">
</style>
