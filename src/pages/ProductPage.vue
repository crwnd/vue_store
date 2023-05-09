<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import ProductListRow from "@/views/ProductLists/Row.vue";
import { useProductsStore } from "@/stores/products";
import { useModalsStore } from "@/stores/modals";

const tabsObj = [
	{ visibleName: "Overview", url: "", componentName: "" },
	{
		visibleName: "Properties",
		url: "/characteristics",
		componentName: "Chars",
	},
	{ visibleName: "Sellers", url: "/sellers", componentName: "Sellers" },
	{ visibleName: "Reviews", url: "/reviews", componentName: "Reviews" },
	{ visibleName: "Questions", url: "/qas", componentName: "Qas" },
	{ visibleName: "Photos", url: "/photos", componentName: "Photos" },
	{ visibleName: "Buy with", url: "/buy-with", componentName: "BuyWith" },
];
const route = useRoute();
const products = useProductsStore();
const modals = useModalsStore();
const productObj = computed(() =>
	Object.assign({}, products.getProductByID(parseInt(route.params.productid)), {
		bundleID: parseInt(route.params.bundleid),
		sellerID: parseInt(route.params.sellerid),
	})
);
const activeTab = ref("");

onMounted(() => {
	activeTab.value = route.params.tab || "";
});
</script>

<template>
	<div class="content-header">
		<div class="breadcrumb"></div>
		<div
			id="component-content-heading"
			:class="{ loading: productObj.isLoading !== false }"
		>
			<h1>
				{{
					productObj.isLoading === false
						? productObj.bundles[parseInt(route.params.bundleid)].name
						: "loading"
				}}
			</h1>
		</div>
	</div>
	<div class="good-rating"></div>
	<div class="good-tabs">
		<RouterLink
			v-for="tabItem in tabsObj"
			:to="
				'/product/' +
				$route.params.productid +
				'/' +
				$route.params.bundleid +
				'/' +
				$route.params.sellerid +
				tabItem.url
			"
			:key="tabItem.componentName"
			class="good-tab"
			exact-active-class="active"
			active-class="active"
			>{{ tabItem.visibleName }}</RouterLink
		>
	</div>
	<div id="good-content__tabs-content">
		<RouterView :product-obj="productObj" :bundleid="$route.params.bundleid" />
	</div>
	<ProductListRow
		title="Liked"
		:provided-products="products.likedProducts"
		:key="'liked' + products.likedProducts.length"
		:see-more-function="() => (modals.openedModal = 'likedModal')"
	/>
	<ProductListRow
		:provided-products="products.lastSeenProducts"
		title="Last seen"
		:key="'lastseen' + products.lastSeenProducts.length"
		:see-more-function="() => {}"
	/>
	<ProductListRow
		:provided-products="products.likedProducts"
		:key="'liked' + products.likedProducts.length"
		:see-more-function="() => (modals.openedModal = 'likedModal')"
	/>
</template>

<style>
#good-name {
	font-size: 1rem;
	margin-left: 8px;
}

.good-tabs {
	width: 100%;
	height: 40px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: 4px;
	padding: 0 4px;
	flex-shrink: 0;
	position: sticky;
	top: 72px;
	overflow-x: auto;
	overflow-y: hidden;
	/* border-bottom: 1px solid var(--tabs-border-color); */
	background: var(--main-bg-color);
	/* background: var(--tabs-bg); */
	z-index: 100;
}

.good-tab {
	display: flex;
	justify-content: center;
	align-items: center;
	/* margin: 0 4px; */
	padding: 8px 16px;
	/* border-bottom: 2px solid rgba(0, 0, 0, 0); */
	/* scroll-snap-align: start; */
	flex-shrink: 0;
	font-size: 0.9rem;
	border-radius: 6px;
	color: var(--tabs-color);
}
.good-tab:hover {
	background-color: var(--tabs-bg-hover);
	text-decoration: none;
	color: var(--tabs-color);
}
.good-tab.active {
	/* border-bottom: 2px solid #005bff; */
	background-color: #464a4c;
	color: #fff;
	/* color: #fff; */
	/* text-decoration: none; */
}

@media screen and (min-width: 768px) {
	.good-tab:not(.good-tab.active):hover {
		/* border-bottom: 2px solid #005bff; */
		text-decoration: none;
	}
}
@media screen and (max-width: 768px) {
	.good-tabs {
		top: 60px;
	}
}
.section-products-row {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	list-style: none;
	padding: 0;
	overflow-x: auto;
	overflow-y: hidden;
}
</style>
