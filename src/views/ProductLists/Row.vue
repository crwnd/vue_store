<script setup>
import { useProductsStore } from "@/stores/products";
import IconHeart from "@/assets/svgs/heart.svg";
import IconHeartOutline from "@/assets/svgs/heart-outline.svg";
defineProps(["providedProducts", "title", "see-more-function"]);
defineEmits([]);
const products = useProductsStore();
</script>

<template>
	<div class="portal-section liked-goods">
		<div class="portal-section__heading">
			<h2>{{ title || "" }}</h2>
			<button v-if="providedProducts.length > 8" @click="seeMoreFunction">
				More
			</button>
		</div>
		<ul class="section-products-row">
			<li
				v-for="productObj in providedProducts.slice(-8)"
				:key="productObj.id + '-' + productObj.bundleID"
				class="product-card portal-section-item product-card-ingrid"
				:class="{
					liked: products.likedList.some(
						(el) =>
							el.productID == productObj.id &&
							el.bundleID == productObj.bundleID
					),
				}"
				:data-id="productObj.id"
				:style="{ opacity: productObj.isLoading === false ? 1 : 0.5 }"
			>
				<RouterLink
					:to="'/product/' + productObj.id + '/' + productObj.bundleID"
				>
					<div
						class="product-card__image"
						:class="{ loading: productObj.isLoading }"
					>
						<div class="loadingspinner" v-if="productObj.isLoading"></div>
						<img
							class="product-card__mainimage"
							v-if="!productObj.isLoading"
							:src="
								productObj.isLoading
									? '/'
									: productObj.bundles[productObj.bundleID].images[0]
							"
							alt="Product main image"
							loading="lazy"
						/>
					</div>
					<div class="portal-section-item-info">
						<span class="portal-section-item-info-name">{{
							productObj.isLoading
								? ""
								: productObj.bundles[productObj.bundleID].name
						}}</span>
						<div
							class="portal-section-item-crossed-price"
							v-if="!productObj.isLoading"
						>
							<span class="amount">150</span>
							<span class="curency">₴</span>
						</div>
						<div
							class="portal-section-item-info-price"
							v-if="!productObj.isLoading"
						>
							<span class="amount">120</span>
							<span class="curency">₴</span>
						</div>
					</div>
				</RouterLink>
				<div class="product-card-actions">
					<button
						class="product-card-like-btn"
						@click="
							products.likedList.some(
								(el) =>
									el.productID == productObj.id &&
									el.bundleID == productObj.bundleID
							)
								? products.unlikeProduct(productObj.id, productObj.bundleID)
								: products.likeProduct(productObj.id, productObj.bundleID)
						"
						:style="{
							opacity: products.likedList.some(
								(el) =>
									el.productID == productObj.id &&
									el.bundleID == productObj.bundleID &&
									el.isLoading === true
							)
								? 0.5
								: 1,
						}"
					>
						<IconHeartOutline class="product-card-like-btn-empty" />
						<IconHeart class="product-card-like-btn-full" />
					</button>
				</div>
			</li>
		</ul>
	</div>
</template>
<style>
.portal-section__heading {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0 8px;
}
.product-card-actions svg {
	width: 18px;
	height: 18px;
}
.product-card-ingrid {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	width: calc(100% / 8);
	padding: 16px;
	cursor: pointer;
	flex-shrink: 0;
	position: relative;
	border-right: 1px solid var(--divider-color);
}

.product-card-ingrid a {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	color: inherit;
}

.product-card-in-list a:hover {
	text-decoration: none;
}

.product-card-ingrid:hover .portal-section-item-info-name {
	color: #005bff;
}

.product-card-ingrid .product-card__image {
	width: 100%;
	height: 150px;
	position: relative;
	display: block;
	margin-bottom: 16px;
	text-align: center;
}
.product-card-ingrid .product-card__image.loading {
	width: 100%;
	height: 150px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.product-card__mainimage {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	max-height: 140px;
	max-width: 100%;
}

.product-card-actions {
	width: 32px;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: flex-start;
	position: absolute;
	top: 6px;
	right: 8px;
	z-index: 5;
}

.product-card-actions button {
	width: 32px;
	min-width: 32px;
	height: 32px;
	display: flex;
	margin: 2px 0;
	padding: 0;
	background-color: var(--btns-bg);
	justify-content: center;
	align-items: center;
}

.product-card.liked .product-card-like-btn-empty,
.product-card .product-card-like-btn-full {
	display: none;
}

.product-card.liked .product-card-like-btn-full,
.product-card .product-card-like-btn-empty {
	display: block;
}

.product-card.liked .product-card-like-btn-full {
	color: var(--accent-color);
}
@media screen and (max-width: 1600px) {
	.product-card-ingrid {
		width: calc(100% / 6);
	}
}

@media screen and (max-width: 1024px) {
	.product-card-ingrid {
		width: 25%;
	}
}
@media screen and (max-width: 768px) {
	.product-card-ingrid {
		width: 50%;
	}
}
</style>
