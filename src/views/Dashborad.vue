<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn text @click="logout">Logout</v-btn>
    </v-app-bar>
    <v-spacer></v-spacer>

    <v-content style="margin-top: 70px">
      <v-container fluid>
        <v-col lg="12">
          <v-card>
            <v-card-title>
              <span class="headline">Create Product</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="createProductForm">
                <v-text-field
                  v-model="name"
                  label="Product Name"
                  required></v-text-field>
                <v-textarea
                  v-model="description"
                  label="Description"
                  required></v-textarea>
                <v-file-input
                  v-model="image"
                  label="Image"
                  accept="image/*"
                  @change="onImageChange"></v-file-input>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="createProduct">Create</v-btn>
              <v-btn color="error" @click="resetForm">Reset</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-row>
          <v-col
            v-for="product in products"
            :key="product.id"
            cols="12"
            md="6"
            lg="4">
            <v-card>
              <v-img
                :src="product.thumbnail"
                :alt="product.title"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                cover>
              </v-img>
              <v-card-title>{{ product.title }}</v-card-title>
              <v-card-text>{{ product.description }}</v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="editProduct(product)"
                  >Edit</v-btn
                >
                <v-btn color="error" @click="deleteProduct(product.id)"
                  >Delete</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-dialog v-model="editingProduct" max-width="500px">
        <v-card v-if="editingProduct">
          <v-card-title>
            <span class="headline">Edit Product</span>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="editingProduct.name"
                label="Product Name"
                required></v-text-field>
              <v-textarea
                v-model="editingProduct.description"
                label="Description"
                required></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="updateProduct">Save</v-btn>
            <v-btn color="error" @click="editingProduct = null">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      name: "",
      description: "",
      image: null,
      newProduct: {
        name: "",
        description: "",
        image: null,
      },
      products: [],
      editingProduct: null,
    };
  },
  async created() {
    await this.fetchProducts();
  },

  methods: {
    async fetchProducts() {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        this.products = data.products;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    createProduct() {
      if (this.$refs.createProductForm.validate()) {
        fetch("https://dummyjson.com/products/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: "",
            description: "",
            image: "",
            /* other product data */
          }),
        })
          .then((res) => res.json())
          .then(console.log);
        this.resetForm();
      }
    },
    deleteProduct() {
      fetch("https://dummyjson.com/products/delete", {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(console.log);
      // const index = this.products.findIndex(
      //   (product) => product.id === productId

      // );
      // if (index > -1) {
      //   this.products.splice(index, 1);
      // }
    },
    editProduct(product) {
      this.editingProduct = { ...product };
    },
    updateProduct() {
      const index = this.products.findIndex(
        (product) => product.id === this.editingProduct.id
      );
      if (index > -1) {
        this.products.splice(index, 1, this.editingProduct);
        this.editingProduct = null;
      }
    },
    resetForm() {
      this.$refs.createProductForm.reset();
      this.newProduct = {
        name: "",
        description: "",
        image: null,
      };
    },
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newProduct.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    logout() {
      // Perform logout logic here
      // For example, clearing authentication token or session
      // After logout, redirect to home page
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>
