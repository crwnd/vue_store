<script setup>
import { onMounted, ref } from "vue";
import { useProductsStore } from "@/stores/products";
import { useModalsStore } from "@/stores/modals";
import { useCatalogStore } from "@/stores/catalog";
import ProductListRow from "@/views/ProductLists/Row.vue";
import { register } from 'swiper/element/bundle';
register();
const products = useProductsStore();
const modals = useModalsStore();
const catalog = useCatalogStore();
const randomProducts = ref([]);

onMounted(async () => {
  catalog.init();
  randomProducts.value = await products.fetchRandomProducts();
});
</script>

<template>
  <div id="main-page-content">
    <div id="main-page-content__top">
      <div id="main-page-content__top__left">
        <ul id="main-page-content__top__left__categories">
          <li v-if="catalog.isLoading === false" v-for="category in catalog.mainPageCategories" :key="category.id"
            class="main-page-content__top__left__categories__elem">
            <RouterLink :to="'/catalog/' + category.id">
              <div class="main-page-content__top__left__categories__elem__left">
                <svg class="main-page-content__top__left__categories__elem__left__icon">
                  <use :xlink:href="category.icons.svg"></use>
                </svg>
                <div class="main-page-content__top__left__categories__elem__left__name">
                  <span>{{ category.name }}</span>
                </div>
              </div>
            </RouterLink>
          </li>
          <li v-if="catalog.isLoading !== false" v-for="ind in 4">Loading ...</li>
        </ul>
      </div>
      <div id="main-page-content__top__right">
        <swiper-container slides-per-view="1" navigation="true" pagination="true">
          <swiper-slide lazy="true"><img src="/static/banners/christopher-gower-_aXa21cf7rY-unsplash.jpg"
              alt=""></swiper-slide>
          <swiper-slide lazy="true"><img src="/static/banners/compare-fibre-hXVVNB6Qctg-unsplash.jpg"
              alt=""></swiper-slide>
          <swiper-slide lazy="true"><img src="/static/banners/carlos-irineu-da-costa-r8dmu2mchQw-unsplash.jpg"
              alt=""></swiper-slide>
        </swiper-container>
      </div>
    </div>
    <ProductListRow title="Random products" :provided-products="products.getProductsByID(randomProducts)"
      :key="'random' + randomProducts.toString()" :see-more-function="() => { }" />
    <ProductListRow title="Liked" :provided-products="products.likedProducts"
      :key="'liked' + products.likedProducts.length" :see-more-function="() => (modals.openedModal = 'likedModal')" />
    <ProductListRow title="Last seen" :provided-products="products.lastSeenProducts"
      :key="'lastseen' + products.lastSeenProducts.length" :see-more-function="() => { }" />
  </div>
</template>

<style scoped>
#main-page-content__top {
  width: 100%;
  display: flex;
  flex-direction: row;
}

#main-page-content__top__left {
  width: 25%;
  display: flex;
  flex-direction: column;
}

#main-page-content__top__right {
  width: 75%;
  display: flex;
  flex-direction: column;
}

#main-page-content__top__right swiper-container {
  width: 100%;
  height: auto;
  aspect-ratio: 3/1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 8px;
}

#main-page-content__top__right swiper-slide img {
  width: 100%;
  height: auto;
  overflow: hidden;
  border-radius: 8px;
}

#main-page-content__top__left__categories {
  width: 100%;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 4px;
}

.main-page-content__top__left__categories__elem {
  width: 100%;
  height: 48px;
}

.main-page-content__top__left__categories__elem a {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
}

.main-page-content__top__left__categories__elem__left {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.main-page-content__top__left__categories__elem__left__icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  margin-right: 8px;
}

@media screen and (max-width: 768px) {
  #main-page-content__top__left__categories {
    flex-wrap: wrap;
    flex-direction: row;
  }

  .main-page-content__top__left__categories__elem {
    width: 50%;
  }

  #main-page-content__top {
    flex-direction: column-reverse;
  }

  #main-page-content__top__left,
  #main-page-content__top__right {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }
}
</style>