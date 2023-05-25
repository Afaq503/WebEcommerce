<template>
  <HeaderView />
  <div class="mt-10">
    <v-row dense>
      <v-col v-for="category in categories" :key="category">
        <v-btn rounded="xl" size="small" @click="showProducts(category)">{{
          category
        }}</v-btn>
      </v-col>
    </v-row>
  </div>
  <div class="d-flex align-center mt-10">
    <v-row dense>
      <v-col
        cols="6"
        md="6"
        lg="3"
        v-for="product in categoriesbyname"
        :key="product.id">
        <v-card max-width="400" class="d-flex align-content-end flex-wrap">
          <v-img
            :src="product.thumbnail"
            :alt="product.title"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
            width="200px"
            cover>
            <v-card-title class="text-white">{{ product.title }}</v-card-title>
          </v-img>
          <div class="d-flex flex-column">
            <v-card-subtitle class="pt-4"
              >Price: {{ product.price }}</v-card-subtitle
            >
            <v-card-text>
              <div>Brand: {{ product.brand }}</div>
              <div>Category: {{ product.category }}</div>
              <div>Stock: {{ product.stock }}</div>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import HeaderView from "../components/HeaderView.vue";
export default {
  components: {
    HeaderView,
  },
  data() {
    return {
      categories: [],
      categoriesbyname: [],
    };
  },
  async created() {
    await this.fetchCategory();
  },
  methods: {
    async fetchCategory() {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories"
        );
        this.categories = await response.json();
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    showProducts(category) {
      fetch(`https://dummyjson.com/products/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
          this.categoriesbyname = data.products;
        })
        .catch((error) => {
          console.error("Error fetching products for category:", error);
        });
    },
  },
};
</script>

<style></style>
