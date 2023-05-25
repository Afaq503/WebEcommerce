<template>
  <HeaderView />
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field
          density="compact"
          variant="outlined"
          append-inner-icon="mdi-magnify"
          v-model="searchQuery"
          label="Search"
          @input="fetchProducts"></v-text-field>
      </v-col>
    </v-row>
    <div class="d-flex align-center">
      <v-row dense>
        <v-col
          cols="6"
          md="6"
          lg="3"
          v-for="product in paginatedProducts"
          :key="product.id">
          <v-card
            @click="showSingleProduct(product)"
            max-width="400"
            class="d-flex align-content-end flex-wrap">
            <v-img
              :src="product.thumbnail"
              :alt="product.title"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              width="200px"
              cover
              ><v-card-title class="text-white">{{
                product.title
              }}</v-card-title>
            </v-img>
            <div class="d-flex flex-column">
              <v-card-subtitle class="pt-4">
                Price: {{ product.price }}
              </v-card-subtitle>
              <v-card-text>
                <div>Brand: {{ product.brand }}</div>
                <div>category: {{ product.category }}</div>
                <div class="text-center">
                  <v-rating
                    v-model="rating"
                    bg-color="orange-lighten-1"
                    color="blue"></v-rating>
                </div>
                <div class="text-center">
                  <v-btn
                    size="small"
                    color="blue"
                    variant="text"
                    icon="mdi-heart"></v-btn>

                  <v-btn
                    size="small"
                    color="blue"
                    variant="text"
                    icon="mdi-bookmark"></v-btn>

                  <v-btn
                    size="small"
                    color="blue"
                    variant="text"
                    icon="mdi-share-variant"></v-btn>
                  <v-btn
                    size="small"
                    color="blue"
                    variant="text"
                    icon="mdi-cart"></v-btn>
                </div>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="text-center">
      <v-pagination
        v-model="currentPage"
        :total-visible="4"
        :length="Math.ceil(products.length / itemsPerPage)"
        prev-icon="mdi-chevron-left"
        next-icon="mdi-chevron-right"
        class="pagination"></v-pagination>
      <!-- <v-pagination :length="3"></v-pagination> -->
    </div>
  </v-container>
</template>

<script>
import HeaderView from "../components/HeaderView.vue";
export default {
  components: {
    HeaderView,
  },
  data() {
    return {
      rating: 3,
      searchQuery: "",
      products: [],
      currentPage: 1,
      itemsPerPage: 8,
    };
  },
  computed: {
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.products.slice(startIndex, endIndex);
    },
  },
  async mounted() {
    this.fetchProducts();
  },
  // async created() {
  //   this.fetchProducts();
  // },
  methods: {
    fetchProducts() {
      const url = `https://dummyjson.com/products/search?q=${this.searchQuery}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.products = data.products;
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    },
    showSingleProduct(product) {
      this.$router.push({ name: "SingleProduct", params: { id: product.id } });
    },
  },
};
</script>
