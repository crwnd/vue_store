<script setup>
const cacheTime = 5 * 60; // 5 minutes
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductsStore } from "@/stores/products";
import { useCatalogStore } from "@/stores/catalog";
import IconHeart from "@/icons/IconHeart.vue";
const route = useRoute();
const router = useRouter();
const products = useProductsStore();
const catalog = useCatalogStore();
const catalogObj = reactive({ isLoading: true, lastUpdate: -1, content: [] });
const filteredProducts = ref([]);
const filters = reactive({ content: {} });

const subcategoryObj = computed(() =>
	catalogObj.isLoading === false
		? catalogObj.content
			.find((el) => el.id == route.params.categoryid)
			.subcategories.find((el) => el.id == route.params.subcategoryid)
		: {}
);

async function refreshProducts(filters) {
	let json = await (
		await fetch(
			"https://api.crwnd.dev/api/get-subcategory/?" +
			new URLSearchParams(
				Object.assign({}, filters, {
					category: route.params.categoryid,
					subcategory: route.params.subcategoryid,
				})
			)
		)
	).json();
	if (json.code == 0) {
		console.log("json", json);
		await products.informNewProducts(json.content.map((el) => el.id));
		filteredProducts.value = json.content;
	}
}

function multipleEntriesToArr(entries) {
	let filters = {};
	for (const pair of entries) {
		if (filters[pair[0]] === undefined) {
			filters = Object.assign({}, filters, Object.fromEntries([pair]));
			continue;
		}
		if (Array.isArray(filters[pair[0]])) {
			filters[pair[0]].push(pair[1]);
			continue;
		}
		filters[pair[0]] = new Array(filters[pair[0]], pair[1]);
	}
	return filters;
}

async function formChange(event) {
	let filtersFormData = new FormData(event.target.closest("form"));
	filters.content = multipleEntriesToArr(filtersFormData.entries());

	// delete filters.content.category;
	// delete filters.content.subcategory;
}
async function formReset(event) {
	await formChange(event);
	return;
}

onMounted(() => {
	let cachedCatalogJSON = localStorage.getItem("catalogObj");
	if (cachedCatalogJSON !== undefined && cachedCatalogJSON !== null) {
		let cachedCatalogObj = JSON.parse(cachedCatalogJSON);
		if (
			cachedCatalogObj.lastUpdate + cacheTime <
			Math.floor(Date.now() / 1000)
		) {
			catalog.refreshCatalog();
		} else {
			catalogObj.isLoading = false;
			catalogObj.lastUpdate = cachedCatalogObj.lastUpdate;
			catalogObj.content = cachedCatalogObj.content;
		}
	} else {
		catalog.refreshCatalog();
	}

	let toRefreshObj = {
		category: route.params.categoryid,
		subcategory: route.params.subcategoryid,
	};
	toRefreshObj = Object.assign(
		{},
		toRefreshObj,
		multipleEntriesToArr(Object.entries(route.query))
	);
	filters.content = Object.assign(
		{},
		filters.content,
		multipleEntriesToArr(Object.entries(route.query))
	);
	refreshProducts(toRefreshObj);

	watch(filters, async (currentValue, oldValue) => {
		await router.push({ query: filters.content });
		await refreshProducts(currentValue.content);
	});
});
</script>

<template>
	<div id="page-content" class="subcategory">
		<h1 id="component-content-heading">{{ subcategoryObj.name }}</h1>
		<div id="subcategory-content__holder">
			<aside id="filters" class="hidden modalable">
				<div id="filters-content">
					<form id="filters-form" method="get" action="/catalog/" @change="formChange"
						@submit.prevent="formChange" @reset="formReset">
						<div id="filters-content__header" class="modal-content__header">
							<h2>Filters</h2>
							<button class="close-filters modal-content__header__close close-modal" type="button">
								<svg>
									<use xlink:href="/svgs/icons.svg?1659470833#close-outline"></use>
								</svg>
							</button>
							<!-- <input
								type="hidden"
								name="category"
								:value="route.params.categoryid"
							/>
							<input
								type="hidden"
								name="subcategory"
								:value="route.params.subcategoryid"
							/> -->
						</div>
						<div class="chips" v-if="catalogObj.isLoading === false"
							v-for="(filterValue, filterID) in filters.content">
							<span class="chip" v-if="typeof filterValue === 'string'" @click="
																							{
								delete filters.content[filterID];
							}
								">{{
		subcategoryObj.availableParameters.find(
			(el) => el.id == filterID
		).type == "enum"
		? subcategoryObj.availableParameters
			.find((el) => el.id == filterID)
			.values.find(
				(el) => el.id == filterValue
			).name
		: filterValue
	}}</span>
							<span class="chip" v-if="typeof filterValue === 'object'"
								v-for="(filterValueElem, index) in filterValue" @click="
																									{
									filters.content[filterID].splice(
										index,
										1
									);
								}
									">{{
		subcategoryObj.availableParameters.find(
			(el) => el.id == filterID
		).type == "enum"
		? subcategoryObj.availableParameters
			.find((el) => el.id == filterID)
			.values.find(
				(el) =>
					el.id == filterValueElem
			).name
		: filterValue
	}}</span>
						</div>
						<div class="filter-group" v-if="subcategoryObj" v-for="filterGroup in subcategoryObj.filters"
							:data-id="filterGroup.id">
							<span>{{ filterGroup.name }}</span>
							<details class="filter" v-for="filterObj in filterGroup.content" :data-id="filterObj.id">
								<summary class="filter__name">
									<span>{{ filterObj.name }}</span>
									<div class="filter__name__chevron">
										<svg>
											<use xlink:href="/svgs/icons.svg?1659470833#chevron-down"></use>
										</svg>
									</div>
								</summary>
								<ul v-if="filterObj.type == 'enum'">
									<li v-for="filterValue in filterObj.values">
										<label class="form-control">
											<input type="checkbox" :name="filterObj.id" :value="filterValue.id" :checked="filters.content[
												filterObj.id
											] !== undefined &&
												(filters.content[
													filterObj.id
												] === filterValue.id ||
													filters.content[
														filterObj.id
													].includes(
														filterValue.id
													))
												" />
											<span class="filter__name__text">{{
												filterValue.name
											}}</span>
										</label>
									</li>
								</ul>
							</details>
						</div>
						<div class="filters-btns modal-content__bottom-sticky">
							<button id="filters-btns__reset" class="secondary" type="reset">
								Reset
							</button>
							<button id="filters-btns__apply" class="smallerOnHover" type="submit">
								Apply
							</button>
						</div>
					</form>
				</div>
			</aside>
			<main>
				<ul id="subcategory__goods" v-if="filteredProducts">
					<li v-for="product in filteredProducts" class="subcategory__good product-card">
						<div class="subcategory__good__content">
							<!-- <span class="subcategory__good__label">New arrival</span> -->
							<div class="product-card-actions">
								<button class="product-card-like-btn" @click="
									products.likedList.some(
										(el) =>
											el.productID == product.id &&
											el.bundleID ==
											product.suitableBundles[0]
									)
										? products.unlikeProduct(
											product.id,
											product.suitableBundles[0]
										)
										: products.likeProduct(
											product.id,
											product.suitableBundles[0]
										)
									">
									<IconHeart v-if="!products.likedList.some(
										(el) =>
											el.productID ==
											product.id &&
											el.bundleID ==
											product
												.suitableBundles[0]
									)
										" icon-style="outline" />
									<IconHeart v-if="products.likedList.some(
										(el) =>
											el.productID ==
											product.id &&
											el.bundleID ==
											product
												.suitableBundles[0]
									)
										" icon-style="filled" />
								</button>
								<button class="">
									<svg>
										<use xlink:href="/svgs/icons.svg?1659470833#compare-outline"></use>
									</svg>
								</button>
							</div>
							<div class="loadingspinner" v-if="products.getProductByID(product.id)
								.isLoading !== false
								"></div>
							<RouterLink class="subcategory__good__img" :to="'/product/' +
								product.id +
								'/' +
								product.suitableBundles[0] +
								'/0'
								" v-if="products.getProductByID(product.id)
		.isLoading === false
		">
								<img v-for="image in products.getProductByID(
									product.id
								).bundles[product.suitableBundles[0]]
									.images" :src="image" alt="" />
							</RouterLink>
							<div class="subcategory__good__qos" v-if="product.qos.content.length > 0">
								<RouterLink v-if="product.qos.type != 'color'" v-for="qo in product.qos.content" :to="'/product/' +
									product.id +
									'/' +
									qo.bundleIndex +
									'/'
									" class="subcategory__good__qo"><svg>
										<use xlink:href="/svgs/icons.svg?1659470833#checkmark-outline"></use>
									</svg>
									<span>{{ qo.value }}</span>
								</RouterLink>
								<RouterLink v-if="product.qos.type == 'color'" v-for="qo in product.qos.content" :to="'/product/' +
									product.id +
									'/' +
									qo.bundleIndex +
									'/'
									" class="subcategory__good__qo color" :style="{ 'background-color': qo.value }"><svg>
										<use xlink:href="/svgs/icons.svg?1659470833#checkmark-outline"></use>
									</svg>
								</RouterLink>
							</div>
							<!-- <a class="subcategory__good__info" href="../product/sample1.html"> -->
							<a class="subcategory__good__info__name" href="/product/0/?bundle=0">
								<span>{{
									products.getProductByID(product.id)
										.isLoading === false
									? products.getProductByID(product.id)
										.bundles[
										product.suitableBundles[0]
									].name
									: "loading"
								}}</span>
							</a>
							<a class="reviews_small" href="../product/1/reviews" title="Reviews">
								<div class="reviews_small__stars">
									<svg>
										<use xlink:href="/svgs/icons.svg?1659470833#star-filled"></use>
									</svg>
									<svg>
										<use xlink:href="/svgs/icons.svg?1659470833#star-filled"></use>
									</svg>
									<svg>
										<use xlink:href="/svgs/icons.svg?1659470833#star-filled"></use>
									</svg>
									<svg>
										<use xlink:href="/svgs/icons.svg?1659470833#star-filled"></use>
									</svg>
									<svg>
										<use xlink:href="/svgs/icons.svg?1659470833#star-filled"></use>
									</svg>
								</div>
								<span>4.5</span>
							</a>
							<div class="subcategory__good__info__price">
								<span>$100</span>
							</div>
							<div class="subcategory__good__info__description">
								<p></p>
							</div>
							<!-- </a> -->
						</div>
					</li>
				</ul>
				<div v-if="filteredProducts.length == 0">
					<span>No products found (</span>
				</div>
			</main>
		</div>
	</div>
</template>

<style scoped>
#subcategory-content__holder {
	width: 100%;
	display: flex;
	flex-direction: row;
}

#page-content.subcategory #filters {
	width: 250px;
}

#filters-content {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 0;
}

#filters-content__header {
	display: none;
}

.filter {
	width: 100%;
	display: flex;
	flex-direction: column;
}

.filter__name {
	width: 100%;
	height: 48px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	flex-shrink: 0;
	padding: 0 24px;
	cursor: pointer;
	font-size: 16px;
	user-select: none;
}

.filter__name__chevron {
	width: 24px;
	height: 24px;
	transform: rotate(0);
	transition: all 0.2s;
}

.filter__name__chevron>svg {
	width: 100%;
	height: 100%;
}

.filter[open] .filter__name__chevron {
	transform: rotate(180deg);
	transition: all 0.2s;
}

.filter ul {
	padding: 0;
	margin: 0;
	list-style-type: none;
}

.filter ul li {
	width: 100%;
	height: 36px;
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 16px;
}

.filter ul li label {
	padding: 0 0 0 30px;
}

.form-control {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	position: relative;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.form-control+.form-control {
	margin-top: 1em;
}

.form-control--disabled {
	color: var(--form-control-disabled);
	cursor: not-allowed;
}

input[type="checkbox"] {
	/* Add if not using autoprefixer */
	-webkit-appearance: none;
	/* Remove most all native input styles */
	-moz-appearance: none;
	appearance: none;
	/* For iOS < 15 */
	background-color: var(--form-background);
	/* Not removed via appearance */
	margin: 0;
	font: inherit;
	color: var(--text-color);
	width: 1.1em;
	height: 1.1em;
	/* border: 0.15em solid currentColor; */
	border: 1.5px solid var(--text-color);
	border-radius: 0.15em;
	transform: translateY(-0.075em);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	margin-right: 12px;
}

input[type="checkbox"]::before {
	content: "";
	width: 0.65em;
	height: 0.65em;
	-webkit-clip-path: polygon(14% 44%,
			0 65%,
			50% 100%,
			100% 16%,
			80% 0%,
			43% 62%);
	clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
	transform: scale(0);
	transform-origin: bottom left;
	transition: 120ms transform ease-in-out;
	box-shadow: inset 1em 1em var(--form-control-color);
	/* Windows High Contrast Mode */
	background-color: var(--text-color);
}

input[type="checkbox"]:checked::before {
	transform: scale(1);
}

input[type="checkbox"]:focus {
	outline: max(2px, 0.15em) solid currentColor;
	outline-offset: max(2px, 0.15em);
}

input[type="checkbox"]:disabled {
	--form-control-color: var(--form-control-disabled);
	color: var(--form-control-disabled);
	cursor: not-allowed;
}

/*  */

.filters-btns {
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 16px;
}

.filters-btns>button {
	width: 48%;
	height: 42px;
	display: inline-block;
	margin: 1%;
	background: #f4f5f7;
	border-radius: 8px;
	flex-shrink: 1;
	border: none;
}

#filters-btns__apply {
	background: #6b4eff;
	color: #fff;
}

#filters-btns__reset {
	color: #000;
}

#page-content.subcategory>main {
	width: calc(100% - 250px);
}

.page-category-elem .slider {
	aspect-ratio: 3/1;
}

.good-content__layout {
	width: 100%;
	display: flex;
	/* padding: 0 32px; */
}

#page-sidebar {
	width: 300px;
	height: 100%;
	padding: 8px;
}

#sidebar-catalog {
	list-style: none;
	padding: 8px;
}

.sidebar-1cat {
	display: flex;
	flex-direction: column;
	user-select: none;
}

.sidebar-1cat>ul {
	list-style: none;
	padding: 0;
	margin: 0;
}

.sidebar-catalog-main-category {
	width: 100%;
	padding: 8px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	border-bottom: 1px solid #e6e6e6;
	cursor: pointer;
}

.sidebar-catalog-main-category:hover {
	background-color: #dddddd;
	text-decoration: underline;
}

.sidebar-1cat>ul {
	max-height: 0;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	pointer-events: none;
	transition: all 0.2s;
}

.sidebar-1cat.active>ul {
	max-height: 500px;
	overflow: visible;
	pointer-events: all;
	transition: all 0.2s;
}

.sidebar-1cat>.sidebar-catalog-main-category>svg {
	width: 24px;
	height: 24px;
	margin-right: 12px;
	fill: #595959;
}

.sidebar-2cat {
	display: block;
	cursor: pointer;
}

.sidebar-2cat a {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	padding: 4px;
	padding-left: 40px;
	color: var(--text-color);
	text-decoration: none;
}

.sidebar-2cat:hover {
	background-color: #dddddd;
	text-decoration: underline;
}

.sidebar-2cat>a>svg {
	width: 24px;
	height: 24px;
	margin-right: 12px;
	fill: #595959;
}

#subcategory__goods {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	padding: 0;
}

#subcategory__goods .no-goods {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0;
	margin: 0;
	color: var(--text-color);
}

.no-goods .primary {
	margin-top: 50px;
}

.subcategory__good {
	width: 20%;
	height: 500px;
	overflow: hidden;
	display: block;
	position: relative;
	padding: 8px;
}

.subcategory__good__content {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
}

.subcategory__good__label {
	width: fit-content;
	height: 24px;
	display: block;
	position: absolute;
	top: 8px;
	left: 8px;
	padding: 0 8px;
	margin: 0;
	font-size: 12px;
	line-height: 24px;
	border-radius: 50px;
	background-color: rgb(113, 43, 212);
	color: rgb(255, 255, 255);
	z-index: 5;
}

.subcategory__good__img {
	height: 180px;
	position: relative;
	display: block;
	width: 100%;
	margin-bottom: 8px;
	overflow: hidden;
}

.subcategory__good__img ::before {
	display: block;
	padding-top: 66%;
	padding-bottom: 66%;
	content: "";
}

.subcategory__good__img>img {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	max-width: 100%;
	max-height: 100%;
}

.subcategory__good__img>img:nth-child(2) {
	display: none;
}

.subcategory__good:hover .subcategory__good__img>img:nth-child(1) {
	display: none;
}

.subcategory__good:hover .subcategory__good__img>img:nth-child(2) {
	display: block;
}

.subcategory__good__qos {
	height: auto;
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	margin-bottom: 8px;
	overflow-y: hidden;
	overflow-x: auto;
}

.subcategory__good__qo {
	min-width: 20px;
	height: 40px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 2px 10px;
	margin: 0 4px;
	border: 1px solid var(--bundle-border-color);
	border-radius: 8px;
	overflow: hidden;
	font-size: 14px;
	flex-shrink: 0;
	background-color: var(--bundle-bg);
	color: var(--bundle-text);
}

.good-overview__right__bundle-picker .subcategory__good__qo {
	height: 40px;
	padding: 12px 16px;
}

.subcategory__good__qo span {
	margin: 0 2px;
}

.subcategory__good__qo.checkmarked {
	/* padding-left: 8px; */
	/* border: 2px solid #4f55c8; */
	border: 1px solid var(--selected-bundle-border-color);
	background-color: var(--selected-bundle-bg);
	color: var(--selected-bundle-text);
}

.subcategory__good__qo.color {
	width: 24px;
	height: 24px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0;
	border: 1px solid #5157ca;
	border-radius: 50%;
	overflow: hidden;
}

.subcategory__good__qo.incompatible {
	opacity: 0.4;
	/* pointer-events: none; */
}

.subcategory__good__qo.color-circle {
	width: 20px;
	height: 20px;
	padding: 0;
	/* border: 1px solid grey; */
	/* border: 3px solid #fff; */
	border: 0.2px solid #d1d2cd;
	outline: 2px solid transparent;
	border-radius: 50%;
	overflow: hidden;
}

.subcategory__good__qo.checkmarked.color-circle {
	outline: 2px solid #4f55c8;
}

.subcategory__good__qo svg {
	width: 16px;
	height: 16px;
	margin-right: 4px;
}

.subcategory__good__qo.color svg {
	fill: var(--text-color);
	color: var(--text-color);
}

.subcategory__good__qo>button {
	background: none;
}

.chips {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	margin-top: 10px;
}

.chip {
	height: 32px;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0 12px;
	line-height: 32px;
	border-radius: 16px;
	background-color: #6b4eff;
	color: #ffffff;
	font-size: 14px;
	font-weight: 500;
	margin: 2px;
	border: none;
}

.chip svg {
	width: 24px;
	height: 24px;
	margin-right: 4px;
}

@media screen and (max-width: 1024px) {
	.subcategory__good {
		width: 33.33%;
	}
}

@media screen and (max-width: 768px) {
	#subcategory-content__holder {
		flex-direction: column;
	}

	.subcategory__good {
		width: 50%;
	}
}

.reviews_small {
	width: fit-content;
	height: 36px;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
	overflow: hidden;
}

.reviews_small__stars {
	width: 70px;
	height: 12px;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
	margin-right: 6px;
	overflow: hidden;
}

.reviews_small__stars>svg {
	width: auto;
	height: 100%;
	margin: 0 1px;
	fill: #e95d2a;
}
</style>
