<script setup>
import { RouterView } from "vue-router";
import { ref, watch } from "vue";
import { useProductsStore } from "@/stores/products";
import { useUserStore } from "@/stores/user";
import { useModalsStore } from "@/stores/modals";
import HeaderGeneral from "@/views/HeaderGeneral.vue";
import ModalMenuWindow from "@/components/modal-menu-window.vue";
import TopBanner from "@/components/top-page-banner.vue";

const products = useProductsStore();
const user = useUserStore();
const modals = useModalsStore();

if (localStorage.getItem("theme")) {
	document.body.classList.add(localStorage.getItem("theme"));
}
products.likedList = JSON.parse(localStorage.getItem("likedList")) || [];
let cartedLocalStorageObj = JSON.parse(localStorage.getItem("carted"));
if (
	cartedLocalStorageObj !== null &&
	cartedLocalStorageObj.lastChange > products.carted.lastChange
) {
	products.carted.content = cartedLocalStorageObj.content;
	products.carted.lastChange = cartedLocalStorageObj.lastChange;
}
user.isAuthenticated =
	localStorage.getItem("isAuthenticated") === "true" ? true : false;
user.syncWithServer();
const searchString = ref("");
function updateSearchString(newValue) {
	searchString.value = newValue;
	return;
}
// watch(modals.openedModal, async function (val) {
// 	if (val !== undefined && val !== "modalMenu") {
// 		if (!document.body.classList.contains("unscrollable-hard")) {
// 			document.body.classList.add("unscrollable-hard");
// 		}
// 	} else {
// 		document.body.classList.remove("unscrollable-hard");
// 	}
// 	let list = [];
// 	switch (val) {
// 		case "likedModal":
// 			list = await products.fetchListContent("get-my-liked");
// 			products.likedList = list.map((el) =>
// 				Object.assign({}, el, { isLoading: false })
// 			);
// 			localStorage.setItem("likedList", JSON.stringify(list));
// 			break;
// 	}
// });
</script>

<template>
	<TopBanner />
	<HeaderGeneral :active-component="$route.name" :search-string="searchString"
		@update:search-string="updateSearchString" />
	<div id="page-content">
		<RouterView />
	</div>
	<ModalMenuWindow :active-component="$route.name" :key="$route.name" />
</template>

<style>
#page-content {
	height: 100%;
	width: 100%;
	max-width: 1600px;
}
</style>
