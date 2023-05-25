<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "../src/components/Footer.vue";
export default {
  name: "App",
  components: {
    Footer,
  },
};
</script>
