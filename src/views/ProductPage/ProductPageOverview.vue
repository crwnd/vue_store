<script setup>
import { useProductsStore } from "@/stores/products";
import IconCheckmark from "@/assets/svgs/checkmark-outline.svg";
const products = useProductsStore();
defineProps(["product-obj", "bundleid"]);
defineEmits(["update:product"]);
</script>
<template>
	<div
		id="good-overview"
		:class="{
			'good-content__layout': true,
			carted: products.carted.content.some(
				(el) =>
					el.productID == productObj.id && el.bundleID == productObj.bundleID
			),
		}"
	>
		<div class="good-overview__left">
			<div
				class="good-overview__left__img-holder"
				:class="{ loading: productObj.isLoading }"
			>
				<div class="loadingspinner" v-if="productObj.isLoading"></div>
				<div
					class="good-overview__left__img-holder-list__item"
					v-if="productObj.isLoading === false"
					v-for="image in productObj.bundles[parseInt(bundleid)].images"
				>
					<img
						:src="image"
						:alt="productObj.bundles[parseInt(bundleid)].name"
						loading="lazy"
					/>
				</div>
			</div>
			<div class="good-overview__left__sdesc hpadding16">
				<div class="good-overview__left__sdesc__qchars altstyled">
					<div class="good-overview__left__sdesc__qchars__item">
						<div class="left">
							<svg>
								<use xlink:href="/svgs/icons.svg#sizes1"></use>
							</svg>
							<span class="prop-name">Weight:</span>
						</div>
						<div class="center">
							<div class="divider"></div>
						</div>
						<div class="right">
							<span class="prop-val">125</span>
							<span class="prop-unit">g</span>
						</div>
					</div>
					<div class="good-overview__left__sdesc__qchars__item">
						<div class="left">
							<svg>
								<use xlink:href="/svgs/icons.svg#speed"></use>
							</svg>
							<span class="prop-name">Speed:</span>
						</div>
						<div class="center">
							<div class="divider"></div>
						</div>
						<div class="right">
							<span class="prop-val">25</span>
							<span class="prop-unit">km/h</span>
						</div>
					</div>
					<div class="good-overview__left__sdesc__qchars__item">
						<div class="left">
							<svg>
								<use xlink:href="/svgs/icons.svg#sizes"></use>
							</svg>
							<span class="prop-name">Sizes:</span>
						</div>
						<div class="center">
							<div class="divider"></div>
						</div>
						<div class="right">
							<span class="prop-val">25x10x5</span>
							<span class="prop-unit">cm</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="good-overview__right">
			<a
				href="/special/sample-special.html"
				class="good-overview__right__special hpadding16"
			>
				<span>special good for these product</span>
			</a>
			<div
				class="good-overview__right__bundle-picker"
				v-if="
					productObj.isLoading === false &&
					productObj.bundles[parseInt(bundleid)].quickSelect.length >= 0
				"
			>
				<div
					class="bundle-picker__item"
					v-for="quickSelectOption in productObj.bundles[parseInt(bundleid)]
						.quickSelect"
					:key="quickSelectOption.name"
				>
					<p class="bundle-picker__item__title hpadding16">
						{{ quickSelectOption.name }}
					</p>
					<div class="bundle-picker__item__row hpadding16">
						<RouterLink
							v-for="quickSelectOptionElem in quickSelectOption.list"
							:to="
								'/product/' +
								productObj.id +
								'/' +
								quickSelectOptionElem.bundleID
							"
							:class="{
								subcategory__good__qo: true,
								color: quickSelectOptionElem.type == 'color',
								checkmarked: quickSelectOptionElem.isActive,
								unavailable: quickSelectOptionElem.tags.includes('unavailable'),
								compatible: quickSelectOptionElem.tags.includes('compatible'),
								incompatible:
									quickSelectOptionElem.tags.includes('incompatible'),
							}"
							:style="{
								'background-color':
									quickSelectOptionElem.type == 'color'
										? quickSelectOptionElem.value
										: false,
							}"
							><IconCheckmark />
							<span>{{
								quickSelectOptionElem.type != "color"
									? quickSelectOptionElem.value
									: ""
							}}</span>
						</RouterLink>
					</div>
				</div>
			</div>
			<div class="good-overview__right__labels hpadding16">
				<div class="good-overview__right__label">
					<IconCheckmark />
					<span>In stock</span>
				</div>
			</div>
			<div class="good-overview__right__pb hpadding16">
				<div class="good-overview__right__pb__p">
					<select name="seller" id="product-page__seller-picker">
						<option value="0" selected>Alex Just Alex - 120</option>
						<option value="1">Second Seller - 125</option>
					</select>
				</div>
				<div class="good-overview__right__pb__b">
					<button
						class="good-overview__right__pb__b__btn smallerOnHover"
						v-if="productObj.isLoading === false"
						@click="
							products.carted.content.some(
								(el) =>
									el.productID == productObj.id &&
									el.bundleID == productObj.bundleID
							)
								? products.uncartProduct(
										productObj.id,
										productObj.bundleID,
										productObj.sellerID
								  )
								: products.cartProduct(
										productObj.id,
										productObj.bundleID,
										productObj.sellerID
								  )
						"
						:style="{
							opacity: products.carted.content.some(
								(el) =>
									el.productID == productObj.id &&
									el.bundleID == productObj.bundleID &&
									el.isLoading === true
							)
								? 0.5
								: 1,
						}"
					>
						<svg>
							<use xlink:href="/svgs/icons.svg#cart"></use>
						</svg>
						<span class="not-in-cart">Add to cart</span>
						<span class="in-cart">Remove from cart</span>
					</button>
				</div>
			</div>
			<a
				href="/sales/sample-sale.html"
				class="good-overview__right__sale-banner smallerOnHover hpadding16"
			>
				<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
			</a>
			<div class="good-overview__right__seller hpadding16">
				<div class="good-overview__right__seller__text">
					<span class="text">Seller:</span>
					<b class="name">Alex Just Alex</b>
				</div>
				<div class="good-overview__right__seller__img">
					<svg>
						<use xlink:href="/svgs/icons.svg#planet"></use>
					</svg>
				</div>
			</div>
			<div class="good-overview__right__delivery">
				<div class="good-overview__right__delivery__head">
					<span class="text">Delivery to:</span>
					<a><b class="city">Kyiv</b></a>
				</div>
				<span class="good-overview__right__delivery__err"
					>Can't be shipped to you</span
				>
				<div class="good-overview__right__delivery__methods">
					<div class="good-overview__right__delivery__method">
						<div class="good-overview__right__delivery__method__img">
							<svg>
								<use xlink:href="/svgs/icons.svg#earth"></use>
							</svg>
						</div>
						<div class="good-overview__right__delivery__method__other">
							<div class="good-overview__right__delivery__method__nqa">
								<span>NovaPoshta pick-up</span>
								<a>show departments</a>
							</div>
							<b class="good-overview__right__delivery__method__time"
								>tommorow</b
							>
							<span class="good-overview__right__delivery__method__price"
								>28-150₴</span
							>
						</div>
					</div>
					<div class="good-overview__right__delivery__method">
						<div class="good-overview__right__delivery__method__img">
							<svg>
								<use xlink:href="/svgs/icons.svg#flash"></use>
							</svg>
						</div>
						<div class="good-overview__right__delivery__method__other">
							<div class="good-overview__right__delivery__method__nqa">
								<span>NovaPoshta to-door</span>
							</div>
							<b class="good-overview__right__delivery__method__time">Friday</b>
							<span class="good-overview__right__delivery__method__price"
								>28-150₴</span
							>
						</div>
					</div>
				</div>
			</div>
			<div class="good-overview__right__pay good-overview__right__common-elem">
				<div
					class="good-overview__right__pay__left good-overview__right__common-elem__left"
				>
					<svg>
						<use xlink:href="/svgs/icons.svg#payment"></use>
					</svg>
				</div>
				<div
					class="good-overview__right__pay__right good-overview__right__common-elem__right"
				>
					<b>Payment methods:</b
					><span
						>Оплата під час отримання товару, Картою онлайн, Google Pay,
						Безготівковими для юридичних осіб, Оплатити онлайн соціальною картою
						"Пакунок малюка", Безготівковий для фізичних осіб, Apple Pay,
						PrivatPay</span
					>
				</div>
			</div>
			<div
				class="good-overview__right__warranty good-overview__right__common-elem"
			>
				<div
					class="good-overview__right__warranty__left good-overview__right__common-elem__left"
				>
					<svg>
						<use xlink:href="/svgs/icons.svg#payment"></use>
					</svg>
				</div>
				<div
					class="good-overview__right__warranty__right good-overview__right__common-elem__right"
				>
					<b>Warranty:</b
					><span>12 місяців Обмін/повернення товару впродовж 14 днів </span>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
#good-overview {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
}

.good-overview__left,
.good-overview__right {
	width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	overflow: hidden;
}

.good-overview__left {
	padding-right: 24px;
}

.good-overview__left__img-holder {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	overflow-y: hidden;
	overflow-x: auto;
	scroll-snap-type: x mandatory;
	aspect-ratio: 1/1;
}
.good-overview__left__img-holder.loading {
	justify-content: center;
}

.good-overview__left__img-holder-list__item {
	max-width: 100%;
	max-height: 100%;
	height: 100%;
	margin: auto;
	display: flex;
	flex-shrink: 0;
	scroll-snap-align: center;
	scroll-snap-stop: always;
}

.good-overview__left__img-holder-list__item img {
	width: 100%;
	display: block;
	padding: 8px;
	border-radius: 12px;
	overflow: hidden;
}

.good-overview__left__sdesc__qchars {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	flex-wrap: wrap;
	margin: 16px 0;
}

.good-overview__left__sdesc__qchars__item {
	width: 50%;
	height: 50px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	/* justify-content: space-evenly; */
	align-items: center;
	padding: 0 8px;
}

.good-content__tab-content__specs-table__heading {
	padding: 0 8px;
}

.good-content__specs-tab__specs-table__row {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	max-width: 800px;
	padding: 0 8px;
}

.good-content__specs-tab__specs-table__row .left,
.good-content__specs-tab__specs-table__row .right {
	width: 50%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding: 0 8px;
	/* padding: 0 8px; */
}

.good-content__specs-tab__specs-table__row .right {
	padding-left: 16px;
}

.good-content__specs-tab__specs-table__row .prop-name {
	width: auto;
	line-height: 24px;
	padding-right: 6px;
}

.good-content__specs-tab__specs-table__row .left .dots-divider {
	width: 100%;
	display: inline-block;
	height: 24px;
	border-bottom: 1px dotted #d2d2d2;
}

.good-overview__left__sdesc__qchars__item .right,
.good-overview__left__sdesc__qchars__item .left {
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
}

.good-overview__left__sdesc__qchars__item .right {
	margin-left: 2px;
}

.good-overview__left__sdesc__qchars .center {
	display: none;
}

.good-overview__left__sdesc__qchars.altstyled .center {
	width: 100%;
	height: 24px;
	display: block;
	border-bottom: 1px dotted #a2a2a2;
	content: "";
	flex-grow: 1;
}

.good-overview__left__sdesc__qchars__item svg {
	width: 24px;
	height: 24px;
	margin-right: 12px;
	flex-shrink: 0;
}

.good-overview__left__sdesc__qchars__item .prop-name {
	/* color: #595959; */
	margin-right: 2px;
	line-height: 24px;
}

.good-overview__left__sdesc__qchars__item .prop-name::after {
	width: 100%;
}

.good-overview__right__special {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 16px;
	border-radius: 4px;
	border: 1px solid #f84147;
	margin-bottom: 24px;
}

.good-overview__right__bundle-picker {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	margin-bottom: 16px;
}

.bundle-picker__item__title {
	width: 100%;
	font-size: 14px;
	color: var(--text-color);
	margin-bottom: 8px;
}

.bundle-picker__item__row {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	overflow-y: hidden;
	overflow-x: auto;
}

.bundle-picker__item {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	flex-wrap: wrap;
	/* margin: 16px 0; */
}

.good-overview__right__labels {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 16px;
}

.good-overview__right__label {
	margin-left: 16px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding: 8px 16px;
	background-color: var(--product-avability-state-available-bg);
	color: var(--product-avability-state-available-text);
}

.good-overview__right__label svg {
	width: 16px;
	height: 16px;
	margin-right: 12px;
	/* fill: #005a27; */
}

.good-overview__right__pb {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 16px;
}

.good-overview__right__pb__p {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	margin-right: 16px;
}

.good-overview__right__pb__p .old-price {
	display: flex;
	flex-direction: column;
	margin-right: 18px;
}

.good-overview__right__pb__p .economy {
	padding: 3px 12px;
	color: var(--text-color);
	font-size: 16px;
	background: #f3e500;
	border-radius: 5px;
}

.good-overview__right__pb__p .crossed {
	width: 100%;
	text-align: center;
	font-size: 20px;
	text-decoration: line-through;
}

.good-overview__right__pb__p .present {
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	font-weight: 700;
}

.good-overview__right__pb__p .present .amount {
	font-size: 54px;
}

.good-overview__right__pb__p .present .currency {
	font-size: 30px;
	margin-bottom: 5px;
}

.good-overview__right__pb__b__btn {
	min-width: 150px;
	height: 46px;
	padding: 5px 15px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	/* padding: 0 16px; */
	color: #fff;
	background: linear-gradient(90deg, #4e54c8, #8f94fb);
	border: none;
}

.good-overview__right__pb__b__btn svg {
	width: 24px;
	height: 24px;
	margin-right: 12px;
}

.good-overview__right__sale-banner {
	width: 100%;
	min-height: 58px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background: linear-gradient(90deg, #c3ffa1, #90ffdd);
	border-radius: 8px;
	margin-top: 16px;
	padding: 8px;
	cursor: pointer;
	font-weight: 600;
	color: var(--text-color);
	font-size: 26px;
}

.good-overview__right__seller {
	height: 56px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 16px;
	margin-top: 26px;
}

.good-overview__right__seller__text .text {
	/* color: var(--text-color); */
	margin-right: 6px;
}

.good-overview__right__seller__text .name {
	color: var(--text-color);
}

.good-overview__right__seller__img {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

.good-overview__right__seller__img svg,
.good-overview__right__seller__img img {
	height: 39.2px;
	width: 39.2px;
}

.good-overview__right__delivery {
	display: flex;
	flex-direction: column;
	padding: 0 16px;
	margin-top: 16px;
}

.good-overview__right__delivery__head {
	/* height: 40px; */
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
}

.good-overview__right__delivery__head .text {
	/* color: #595959; */
	margin-right: 6px;
}

.good-overview__right__delivery__err {
	color: #b72429;
	font-size: 14px;
	margin-top: 8px;
	display: none;
	visibility: hidden;
}

.good-overview__right__delivery__err.active {
	display: block;
	visibility: visible;
}

.good-overview__right__delivery__methods {
	display: flex;
	flex-direction: column;
	margin-top: 16px;
}

.good-overview__right__delivery__method {
	min-height: 45px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}

.good-overview__right__delivery__method__img img,
.good-overview__right__delivery__method__img svg {
	height: 24px;
	width: 24px;
	margin-right: 12px;
}

.good-overview__right__delivery__method__other {
	width: calc(100% - 36px);
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

.good-overview__right__delivery__method__nqa {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
}

.good-overview__right__common-elem {
	display: flex;
	flex-direction: column;
	flex-direction: row;
	align-items: flex-start;
	margin-top: 16px;
}

.good-overview__right__common-elem__left {
	display: block;
	padding: 0 8px;
}

.good-overview__right__common-elem__left img,
.good-overview__right__common-elem__left svg {
	width: 40px;
	height: 40px;
	padding: 8px;
}

.good-overview__right__common-elem__right {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: center;
	font-family: "textFont";
}

.good-overview__right__common-elem__right b {
	width: 100%;
	margin-right: 6px;
}
@media screen and (max-width: 768px) {
	#good-overview {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.good-overview__left,
	.good-overview__right {
		width: 100%;
		justify-content: flex-start;
		overflow: hidden;
	}

	.good-overview__left {
		padding-right: 0;
	}
}
</style>
