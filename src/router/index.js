import { createRouter, createWebHistory } from "vue-router";

import Main from "../pages/MainPage.vue";

import ProductPage from "../pages/ProductPage.vue";
import ProductOverview from "../views/ProductPage/ProductPageOverview.vue";
import ProductChars from "../views/ProductPage/ProductPageChars.vue";
import ProductSellers from "../views/ProductPage/ProductPageSellers.vue";
import ProductReviews from "../views/ProductPage/ProductPageReviews.vue";
import ProductQas from "../views/ProductPage/ProductPageQas.vue";
import ProductPhotos from "../views/ProductPage/ProductPagePhotos.vue";
import ProductBuyWith from "../views/ProductPage/ProductPageBuyWith.vue";

import SearchPage from "../pages/SearchPage.vue";

import SpecialsPage from "../pages/SpecialsPage.vue";

import OrdersPage from "../pages/OrdersPage.vue";

import AboutPage from "../pages/AboutPage.vue";

import CartPage from "../pages/CartPage.vue";

import LikedPage from "../pages/LikedPage.vue";

import CatalogPage from "../pages/CatalogPage.vue";

import SubcategoryPage from "../pages/SubcategoryPage.vue";

import AccountPage from "../pages/AccountPage.vue";
import AccountOverview from "../views/AccountPage/AccountPageOverview.vue";
import AccountStats from "../views/AccountPage/AccountPageStats.vue";
import AccountDelivery from "../views/AccountPage/AccountPageDelivery.vue";
import AccountPersonal from "../views/AccountPage/AccountPagePersonal.vue";
import AccountSecurity from "../views/AccountPage/AccountPageSecurity.vue";

export default createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "Home",
			component: Main,
		},
		{
			path: "/product/:productid/:bundleid/:sellerid/",
			component: ProductPage,
			children: [
				{
					path: "",
					name: "product-overview",
					component: ProductOverview,
				},
				{
					path: "characteristics",
					name: "product-characteristics",
					component: ProductChars,
				},
				{
					path: "sellers",
					name: "product-sellers",
					component: ProductSellers,
				},
				{
					path: "reviews",
					name: "product-reviews",
					component: ProductReviews,
				},
				{
					path: "qas",
					name: "product-qas",
					component: ProductQas,
				},
				{
					path: "photos",
					name: "product-photos",
					component: ProductPhotos,
				},
				{
					path: "buy-with",
					name: "product-buywith",
					component: ProductBuyWith,
				},
			],
		},
		{
			path: "/product/:productid/",
			redirect: (to) => {
				return { path: "/product/" + to.params.productid + "/0/0" };
			},
		},
		{
			path: "/product/:productid/:bundleid",
			redirect: (to) => {
				return {
					path:
						"/product/" + to.params.productid + "/" + to.params.bundleid + "/0",
				};
			},
		},
		{
			path: "/catalog/:categoryid",
			alias: "/catalog",
			name: "Catalog",
			component: CatalogPage,
		},
		{
			path: "/catalog/:categoryid/:subcategoryid/",
			alias: "/catalog/:categoryid/:subcategoryid",
			name: "Subcategory",
			component: SubcategoryPage,
		},
		{
			path: "/search/:searchq",
			name: "Search",
			component: SearchPage,
		},
		{
			path: "/about",
			name: "About",
			component: AboutPage,
		},
		{
			path: "/orders",
			name: "Orders",
			component: OrdersPage,
		},
		{
			path: "/cart",
			name: "Cart",
			component: CartPage,
		},
		{
			path: "/liked",
			name: "Liked",
			component: LikedPage,
		},
		{
			path: "/specials/:eventid",
			name: "Specials",
			component: SpecialsPage,
		},
		{
			path: "/account/",
			component: AccountPage,
			children: [
				{
					path: "",
					name: "account-overview",
					component: AccountOverview,
				},
				{
					path: "stats",
					name: "account-stats",
					component: AccountStats,
				},
				{
					path: "delivery",
					name: "account-delivery",
					component: AccountDelivery,
				},
				{
					path: "personal",
					name: "account-personal",
					component: AccountPersonal,
				},
				{
					path: "security",
					name: "account-security",
					component: AccountSecurity,
				},
			],
		},
	],
});
