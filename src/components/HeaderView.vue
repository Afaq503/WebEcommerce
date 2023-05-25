<template>
  <v-app-bar>
    <div class="d-lg-none d-xl-flex">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </div>

    <div class="mx-4">
      <v-toolbar-title class="v-toolbar__title"
        >Web E commerence</v-toolbar-title
      >
    </div>
    <v-spacer></v-spacer>
    <v-list class="d-none d-lg-flex d-xl-none">
      <v-list-item value="home" to="/">Home</v-list-item>
      <v-list-item value="category" to="/category">Categories</v-list-item>
      <v-list-item value="singleProduct" to="/singleproduct"
        >SingleProduct</v-list-item
      >
    </v-list>

    <v-spacer></v-spacer>

    <div class="d-none d-sm-flex">
      <v-btn variant="outlined" to="/login" class="mr-2">Login</v-btn>
    </div>
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    color="#FFFFFF00"
    location="top"
    class="d-lg-none d-xl-flex text-grey-darken-4"
    style="height: auto">
    <v-list>
      <v-list-item value="categories" to="/">Home</v-list-item>
      <v-list-item value="categories" to="/categories">Categories</v-list-item>
      <v-list-item value="Login" to="/login">Login</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
<style>
.v-toolbar__title {
  font-size: 32px;
  color: #4caf50;
  font-weight: 700;
  font-family: cursive;
}
</style>
