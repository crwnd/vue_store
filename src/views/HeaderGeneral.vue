<script setup>
import { useUserStore } from "@/stores/user";
import { useModalsStore } from "@/stores/modals";
import { useProductsStore } from "@/stores/products";
import IconLogoCart from "@/assets/svgs/logo-cart.svg?url";
import IconGrid from "@/icons/IconGrid.vue";
import IconSearchOutline from "@/assets/svgs/search-outline.svg";
import IconCart from "@/icons/IconCart.vue";
import IconOrdersOutline from "@/assets/svgs/reader-outline.svg";
import IconCloseOutline from "@/assets/svgs/close-outline.svg";
import IconChevronDownOutline from "@/assets/svgs/chevron-down-outline.svg";
import IconFunnelOutline from "@/assets/svgs/funnel-outline.svg";
const user = useUserStore();
const modals = useModalsStore();
const products = useProductsStore();
defineProps(["active-component", "search-string"]);
defineEmits(["update:search-string"]);
</script>

<template>
	<header :class="{ 'search-opened': searchString.length > 0 }">
		<div id="header_main">
			<div id="header__main__left">
				<RouterLink to="/" id="logo-elem" v-once>
					<img :src="IconLogoCart" alt="logo" />
					<div id="logo-elem-right">
						<span id="logo-text">Sample store</span>
						<span id="logo-subtext">Next-gen store</span>
					</div>
				</RouterLink>
				<RouterLink to="/catalog">
					<button id="header-catalog-btn" class="header__btns">
						<IconGrid icon-style="outline" />
						<span>Catalog</span>
					</button>
				</RouterLink>
			</div>
			<div id="header__main__center">
				<form
					id="search"
					action="/search.php"
					method="GET"
					autocomplete="off"
					@reset="(event) => $emit('update:search-string', '')"
				>
					<div style="pointer-events: none" id="search-icon-search">
						<IconSearchOutline />
					</div>
					<input
						id="search-input"
						name="q"
						type="text"
						placeholder="I want..."
						aria-label="Type your search query here"
						minlength="1"
						required=""
						:value="searchString"
						@change="
							(event) => $emit('update:search-string', event.target.value)
						"
						@input="
							(event) => $emit('update:search-string', event.target.value)
						"
					/>
					<button type="reset" id="search-icon-clear">
						<IconCloseOutline />
					</button>
					<input type="submit" style="display: none" />
				</form>
			</div>
			<div id="header__main__right">
				<button
					class="header__btns"
					@click="
						modals.openedModal =
							modals.openedModal == 'filtersModal' ? undefined : 'filtersModal'
					"
					v-if="activeComponent == 'Catalog'"
				>
					<IconFunnelOutline />
				</button>
				<RouterLink
					to="/cart"
					style="position: relative"
					:class="{
						'hides-on-mobile':
							activeComponent == 'Catalog' || activeComponent == 'Cart',
					}"
				>
					<button
						:class="{
							header__btns: true,
						}"
					>
						<IconCart icon-style="outline" />
					</button>
					<span
						:key="products.carted.content.length"
						v-if="products.carted.content.length > 0"
						style="
							background-color: #595959;
							color: rgb(255, 255, 255);
							border-radius: 50%;
							width: 18px;
							height: 18px;
							position: absolute;
							bottom: 32px;
							left: 32px;
							text-align: center;
							font-size: 12px;
							line-height: 18px;
						"
						>{{ products.carted.content.length }}</span
					>
				</RouterLink>
				<button class="header__btns hides-on-1280" v-if="user.isAuthenticated">
					<IconOrdersOutline />
				</button>
				<button
					id="header__profile"
					class="hides-on-mobile"
					v-if="user.isAuthenticated"
					@click="modals.openedModal = 'modalMenu'"
				>
					<div id="header__profile__left">
						<div id="header__profile__left__avatar">
							<img src="/static/user-avatars/trykhin2004.jpg" alt="" />
						</div>
						<span id="header__profile__left__name">{{ user.name }}</span>
					</div>
					<div id="header__profile__right">
						<IconChevronDownOutline />
					</div>
				</button>
				<button
					id="header__auth"
					class="hides-on-mobile"
					v-if="!user.isAuthenticated"
				>
					<RouterLink to="/account">Auth</RouterLink>
				</button>
			</div>
		</div>
		<div id="header_sec"></div>
	</header>
</template>

<style scoped>
header {
	top: 0;
	left: 0;
	/* right: 0; */
	height: 72px;
	width: 100%;
	padding: 16px;
	/* position: relative; */
	position: sticky;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background-color: var(--header-bg-color);
	z-index: 1000;
	transition: 0.2s height;
}
header.search-opened {
	height: 100vh;
}

header img {
	height: 40px;
	width: 40px;
	display: inline-flex;
	margin-right: 8px;
}

#header_main,
#header_secondary {
	height: 42px;
	width: 100%;
	max-width: 1600px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

#header__main__left,
#header__main__center,
#header__main__right {
	max-height: 100%;
	width: calc(100% / 3);
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
}
#header__main__center {
	justify-content: center;
}
#header__main__right {
	justify-content: flex-end;
}

button {
	height: 45px;
	min-width: 45px;
	/* display: flex; */
	flex-direction: row;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	border-radius: 6px;
	cursor: pointer;
	background-color: var(--btns-bg);
	/* border: 1px solid var(--btns-border-color); */
	border: none;
	color: var(--text-color);
	flex-shrink: 0;
	/* box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px; */
	box-shadow: none;
}
button:hover {
	background-color: var(--tabs-bg-hover);
}
.header__btns svg,
.header__btns img {
	width: 24px;
	height: 24px;
	fill: #595959;
}

#logo-elem {
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	font-family: "Quicksand SemiBold";
	position: relative;
	font-size: 24px;
}

#logo-elem-right {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
}

#logo-text {
	font-size: 24px;
	color: #595959;
}

#logo-subtext {
	font-size: 12px;
	color: #595959;
	margin-top: -15px;
	line-height: 15px;
	transform: translateY(14px);
}
#header-catalog-btn {
	margin-left: 12px;
	padding: 0 12px;
}
#header-catalog-btn svg {
	margin-right: 8px;
}
#header__auth {
	padding: 0 24px;
}
#header__profile {
	width: 100%;
	max-width: 178px;
	min-width: 48px;
	/* display: flex; */
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 2px 0 8px;
	border: none;
	background: none;
	overflow: hidden;
	border-radius: 6px;
	box-shadow: none;
}
#header__profile:hover {
	background-color: var(--tabs-bg-hover);
}
#header__profile__left {
	width: calc(100% - 24px - 12px);
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}
#header__profile__left__avatar {
	width: 28px;
	height: 28px;
	border-radius: 50%;
	overflow: hidden;
	flex-shrink: 0;
	margin-right: 8px;
}
#header__profile__left__avatar img {
	width: 100%;
	height: 100%;
}
#header__profile__left__name {
	width: 100%;
	text-align: left;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	font-size: 14px;
}
#header__profile__right {
	width: 24px;
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	flex-shrink: 0;
	margin-left: 12px;
}
#header__profile__right svg {
	width: 18px;
	height: 18px;
}

#search {
	height: 40px;
	width: 100%;
	max-width: 300px;
	display: flex;
	flex-direction: row;
	align-items: center;
	border-radius: 20px;
	overflow: hidden;
	position: relative;
	/* border: 1px solid #e6e6e6; */

	background: var(--searchbar-bg);
	border-radius: 8px;
	color: var(--text-color);
	transition: 0.2s width, 0.2s max-width;
}

#search * {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

#search input {
	width: 100%;
	background-color: rgba(0, 0, 0, 0);
	border: none;
	padding: 0;
	padding-left: 36px;
	color: inherit;
	/* border-radius: 20px 0 0 20px; */
}

#search button,
#search-icon-search {
	width: 36px;
	height: 100%;
	top: 0;
	left: 0;
	display: block;
	position: absolute;
	padding: 0 8px;
	margin: 0;
	fill: var(--text-color);
	border-radius: 0;
	border: none;
	background-color: rgba(0, 0, 0, 0);
}

#search-icon-search {
	display: flex;
	justify-content: center;
	align-items: center;
}

#search #search-icon-clear {
	display: none;
	left: auto;
	right: 0;
	fill: var(--text-color);
	color: inherit;
}

#search svg {
	width: 20px;
	height: 20px;
	margin: 0;
}

#search input:valid + #search-icon-clear {
	display: flex;
}
@media screen and (max-width: 1280px) {
	#logo-elem-right {
		display: none;
	}
	.hides-on-1280 {
		display: none;
	}
}
@media screen and (max-width: 768px) {
	header {
		height: 60px;
		padding: 7.5px;
	}
	#header-catalog-btn {
		display: none;
	}
	#header__main__right {
		display: flex;
	}
	#header__main__left,
	#header__main__right {
		width: auto;
	}
	#header__main__center {
		width: 100%;
		justify-content: center;
	}
	#content.search-opened #header__main__left,
	#content.search-opened #header__main__right {
		display: none;
	}

	#content.search-opened #header__main__center {
		width: 100%;
		justify-content: center;
	}
	#content.search-opened #search {
		max-width: 100%;
		width: 100%;
	}
	#logo-elem span {
		display: none;
	}

	#header__main__right .open-orders {
		display: none;
	}
	#header-hamburger {
		display: none;
	}
}
</style>
