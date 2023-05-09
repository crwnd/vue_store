<script setup>
import { useProductsStore } from "@/stores/products";
import { useModalsStore } from "@/stores/modals";
import ProductListRow from "@/views/ProductLists/Row.vue";
const products = useProductsStore();
const modals = useModalsStore();
</script>

<template>
  <div id="main-page-content">
    <ProductListRow
      title="Liked"
      :provided-products="products.likedProducts"
      :key="'liked' + products.likedProducts.length"
      :see-more-function="() => (modals.openedModal = 'likedModal')"
    />
    <ProductListRow
      title="Last seen"
      :provided-products="products.lastSeenProducts"
      :key="'lastseen' + products.lastSeenProducts.length"
      :see-more-function="() => {}"
    />
  </div>
</template>
