<script setup>
import { useProductsStore } from "@/stores/products";
import IconHeart from "@/icons/IconHeart.vue";
import IconCart from "@/icons/IconCart.vue";
import IconTrashOutline from "@/assets/svgs/trash-outline.svg";
const products = useProductsStore();
defineProps([]);
defineEmits([]);
</script>

<template>
	<div id="cart-content">
		<h1 id="component-content-heading">Cart</h1>
		<ul
			id="modal-cart__content__categories-list"
			class="modal-content__shows-on-unempty"
			v-if="products.carted.content.length > 0"
		>
			<li
				v-for="product in products.cartedProducts"
				:key="product.id + '-' + product.bundleID"
				class="product-card product-card-in-list"
				:class="{
					liked: products.likedList.some(
						(el) =>
							el.productID == product.id && el.bundleID == product.bundleID
					),
					carted: products.carted.content.some(
						(el) =>
							el.productID == product.id && el.bundleID == product.bundleID
					),
				}"
				:data-id="product.id"
			>
				<RouterLink
					:to="
						'/product/' +
						product.id +
						'/' +
						product.bundleID +
						'/' +
						(product.sellerID !== undefined ? product.sellerID : 0)
					"
				>
					<div class="product-card-in-list__image">
						<div class="loadingspinner" v-if="product.isLoading"></div>
						<img
							v-if="!product.isLoading"
							class="product-card-in-list__mainimage"
							:src="product.bundles[product.bundleID].images[0]"
							loading="lazy"
							alt="Product main image"
						/>
					</div>
					<div class="product-card-in-list__info">
						<span class="product-card-in-list__info__name">{{
							product.isLoading ? "" : product.bundles[product.bundleID].name
						}}</span>
						<span class="product-card-in-list__info__bundleInfo"
							><span>64gb</span></span
						>
						<div class="product-card-in-list__info__crossed-price">
							<span class="amount">150</span>
							<span class="curency">₴</span>
						</div>
						<div class="product-card-in-list__info__price">
							<span class="amount">120</span>
							<span class="curency">₴</span>
						</div>
					</div>
				</RouterLink>
				<div class="product-card-in-list__actions">
					<button
						class="product-card-in-list__action product-card-in-list__actions__like-btn smallerOnHover"
						:style="{
							opacity: products.likedList.some(
								(el) =>
									el.productID == product.id &&
									el.bundleID == product.bundleID &&
									el.isLoading === true
							)
								? 0.5
								: 1,
						}"
						@click="
							products.likedList.some(
								(el) =>
									el.productID == product.id && el.bundleID == product.bundleID
							)
								? products.unlikeProduct(product.id, product.bundleID)
								: products.likeProduct(product.id, product.bundleID)
						"
					>
						<IconHeart
							icon-style="outline"
							class="product-card-in-list__actions__unlike-btn-empty not-in-liked"
						/>
						<IconHeart
							icon-style="filled"
							class="product-card-in-list__actions__unlike-btn-empty in-liked"
						/>
						<span class="in-liked">Unlike</span>
						<span class="not-in-liked">Like</span>
					</button>
					<button
						class="product-card-in-list__action product-card-in-list__actions__add-to-cart-btn smallerOnHover"
						:style="{
							opacity: products.carted.content.some(
								(el) =>
									el.productID == product.id &&
									el.bundleID == product.bundleID &&
									el.isLoading === true
							)
								? 0.5
								: 1,
						}"
						@click="
							products.carted.content.some(
								(el) =>
									el.productID == product.id && el.bundleID == product.bundleID
							)
								? products.uncartProduct(
										product.id,
										product.bundleID,
										product.sellerID !== undefined
											? product.sellerID
											: undefined
								  )
								: products.cartProduct(
										product.id,
										product.bundleID,
										product.sellerID !== undefined
											? product.sellerID
											: undefined
								  )
						"
					>
						<IconCart
							icon-style="outline"
							class="product-card-in-list__actions__add-to-cart not-in-cart"
						/>
						<IconTrashOutline
							class="product-card-in-list__actions__added-to-cart in-cart"
						/>
						<span class="not-in-cart">Add again</span>
						<span class="in-cart">Remove</span>
					</button>
				</div>
				<div class="product-card-in-list__info__quantity">
					<button
						class="product-card-in-list__info__quantity__reduce-btn"
						:disabled="product.quantity == 1"
						@click="
							products.cartChangeProductQuantity(
								product.id,
								product.bundleID,
								product.sellerID,
								product.quantity - 1
							)
						"
					>
						-
					</button>
					<input
						type="number"
						v-model="product.quantity"
						min="1"
						max="999"
						class="amount"
					/>
					<button
						class="product-card-in-list__info__quantity__add-btn"
						:disabled="product.quantity == 999"
						@click="
							products.cartChangeProductQuantity(
								product.id,
								product.bundleID,
								product.sellerID,
								product.quantity + 1
							)
						"
					>
						+
					</button>
				</div>
			</li>
		</ul>
		<div class="modal-content__bottom-sticky modal-content__shows-on-unempty">
			<!-- Price and pay btn -->
			<div class="modal-cart__content__bottom-content__first">
				<span>Total:</span>
				<span>135 UAH</span>
			</div>
			<div class="modal-cart__content__bottom-content__second">
				<a href="/cart">
					<button class="smallerOnHover primary">Proceed to Checkout</button>
				</a>
			</div>
		</div>
		<div
			class="modal-content__shows-on-empty"
			v-if="products.carted.content.length == 0"
		>
			<svg>
				<use xlink:href="/svgs/icons.svg#bag-outline"></use>
			</svg>
			<span>You haven't added to cart any products yet</span>
			<a href="/">
				<button class="smallerOnHover">Find something</button>
			</a>
		</div>
	</div>
</template>

<style scoped>
.modal-content__shows-on-unempty {
	width: 100%;
	/* height: 100%; */
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	padding: 0;
	list-style: none;
}
.modal-window .modal-content__shows-on-unempty,
.modal-window.empty .modal-content__shows-on-empty {
	display: flex;
}

.modal-window.empty .modal-content__shows-on-unempty,
.modal-window .modal-content__shows-on-empty,
.modal-window.loading .modal-content__shows-on-empty,
.modal-window.empty ul {
	display: none;
}
.product-card-in-list {
	width: calc(100% - 24px);
	max-width: 650px;
	min-height: 108px;
	display: block;
	padding: 0;
	margin: 9px;
	position: relative;
	background: var(--modal-list-elem-bg);
	border-radius: 8px;
	overflow: hidden;
	flex-shrink: 0;
	z-index: 115;
}

.product-card-in-list a {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	position: relative;
	padding: 7px;
}
.product-card-in-list a:hover {
	text-decoration: none;
}
.product-card-in-list__image {
	width: 90px;
	height: 90px;
	position: relative;
	margin-right: 18px;
	flex-shrink: 0;
}

.product-card-in-list__mainimage {
	max-width: 100%;
	max-height: 100%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 8px;
	background-color: #fff;
	overflow: hidden;
}

.product-card-in-list__info {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 0;
	padding-bottom: 32px;
	margin: 0;
}

.product-card-in-list__info__name {
	color: var(--text-color);
	/*#040b14*/
	font-size: 16px;
	line-height: 22px;
	margin-bottom: 6px;
}

.product-card-in-list__info__bundleInfo {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	margin-bottom: 6px;
}

.product-card-in-list__info__bundleInfo span {
	margin: 0 2px;
}

.product-card-in-list__info__bundleInfo .color-circle {
	width: 20px;
	height: 20px;
	display: block;
	padding: 0;
	/* border: 1px solid grey; */
	border: 3px solid #fff;
	outline: 1px solid grey;
	border-radius: 50%;
	overflow: hidden;
	margin-right: 4px;
}

.product-card-in-list__info__quantity {
	height: 24px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	position: absolute;
	left: 115px;
	bottom: 8px;
	margin-top: 8px;
	z-index: 117;
}

.product-card-in-list__info__quantity button {
	width: 36px;
	min-width: 36px;
	height: 36px;
	min-height: 36px;
	border: 0.2px solid var(--btns-border-color);
	border-radius: 50%;
	outline: none;
	cursor: pointer;
	z-index: 118;
}

.product-card-in-list__info__quantity .amount {
	width: 40px;
	height: 36px;
	min-height: 36px;
	border: none;
	text-align: center;
	vertical-align: middle;
	line-height: 24px;
	z-index: 118;
	margin: 0 4px;
}

.product-card-in-list__info__quantity .amount::-webkit-outer-spin-button,
.product-card-in-list__info__quantity .amount::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

.product-card-in-list__info__quantity .amount[type="number"] {
	appearance: textfield;
}

.product-card-in-list .product-card-like-btn {
	width: 42px;
	height: 42px;
}

.product-card-actions svg {
	width: 18px;
	height: 18px;
}

.product-card-in-list__actions {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: space-around;
	position: absolute;
	right: 0;
	top: 0;
	padding: 0 7px 0 0;
	z-index: 117;
}

.product-card-in-list__action {
	height: 42px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 4px 8px;
	margin: 6px 0;
	background-color: var(--btns-bg);
	color: var(--text-color);
}

.product-card-in-list__action svg {
	height: 20px;
	width: 20px;
	flex-shrink: 0;
	margin-right: 6px;
}

.product-card-in-list__action span {
	white-space: nowrap;
}
</style>
