<template>
  <h1>SingleProduct</h1>
  <v-card class="d-flex">
    <v-img
      class="align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
      width="200px"
      cover
      ><v-card-title class="text-white">Title</v-card-title>
    </v-img>
    <div class="d-flex flex-column">
      <v-card-subtitle class="pt-4"> Price: 200 </v-card-subtitle>
      <v-card-text>
        <div>Brand: Lenove</div>
        <div>category: Tree</div>
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
</template>

<script>
export default {};
</script>

<style></style>
