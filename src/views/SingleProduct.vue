<template>
  <div>
    <HeaderView />
    <v-container v-if="product">
      <v-card>
        <!-- Display product details here -->
        <v-card-title class="text-h5">{{ product.title }}</v-card-title>
        <v-img
          :src="product.thumbnail"
          :alt="product.title"
          class="align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="400"
          width="full"
          ><v-card-title class="text-white">{{ product.title }}</v-card-title>
        </v-img>
        <v-card-text>
          <div>Price: {{ product.price }}</div>
          <div>DiscountPercentage: {{ product.discountPercentage }}</div>
          <div>Stock: {{ product.stock }}</div>
          <div>Brand: {{ product.brand }}</div>
          <div>Category: {{ product.category }}</div>
          <div>Description: {{ product.description }}</div>
          <!-- Additional product details -->
        </v-card-text>
        <v-slide-group v-model="model" selected-class="bg-success" show-arrows>
          <v-slide-group-item v-for="image in product.images" :key="image.id">
            <v-col>
              <v-img :src="image" height="200px" width="200px"></v-img>
            </v-col>
          </v-slide-group-item>
        </v-slide-group>
      </v-card>
    </v-container>
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
      product: null,
    };
  },
  mounted() {
    const productId = this.$route.params.id;
    this.fetchProduct(productId);
  },
  methods: {
    fetchProduct(productId) {
      const apiUrl = `https://dummyjson.com/products/${productId}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          this.product = data;
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    },
  },
};
</script>
