import { ref, computed, watch, reactive } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "@/stores/user";

export const useProductsStore = defineStore("products", () => {
	const user = useUserStore();

	const productsArr = ref([]);
	const activeFilters = ref([]);
	const likedList = ref([]);
	watch(likedList, handleLikedChange);
	const carted = reactive({ content: [], lastChange: -1 });
	watch(carted.content, handleCartChange);

	async function handleLikedChange(val, oldVal) {
		// console.log("handleLikedChange", val);
		localStorage.setItem("likedList", JSON.stringify(val));
		await handleListChange(val, oldVal);
	}
	async function handleCartChange(val, oldVal) {
		console.log("handleCartChange", val);
		localStorage.setItem("carted", JSON.stringify(val));
		await handleListChange(val, oldVal);
	}

	async function informNewProducts(arrOfIDs) {
		await handleListChange(arrOfIDs, productsArr.value);
	}

	const likedProducts = computed(() => {
		let toReturn = [];
		likedList.value.forEach((el) => {
			toReturn.push(
				Object.assign(
					{},
					productsArr.value.find(
						(prod) => prod.id == el.productID
					) || {
						id: el.productID,
						bundles: [],
						isLoading: true,
					},
					{
						bundleID: el.bundleID,
					}
				)
			);
		});
		return toReturn;
	});
	const cartedProducts = computed(() => {
		let toReturn = [];
		carted.content.forEach((el) => {
			toReturn.push(
				Object.assign(
					{},
					productsArr.value.find(
						(prod) => prod.id == el.productID
					) || {
						id: el.productID,
						bundles: [],
						isLoading: true,
					},
					{
						bundleID: el.bundleID,
						sellerID: el.sellerID,
						quantity: el.quantity,
					}
				)
			);
		});
		return toReturn;
	});
	const lastSeenProducts = computed(() => {
		let toReturn = [];
		productsArr.value.forEach((el) => {
			toReturn.push(
				Object.assign({}, el, {
					bundleID: 0,
				})
			);
		});
		return toReturn;
	});
	async function fetchNewInfo(arrOfIDs) {
		if (arrOfIDs.length == 0) return;
		console.log("productsArr.value", productsArr.value);
		console.log("arrOfIDs", arrOfIDs);
		let newIDs = [];
		arrOfIDs.forEach((el) => {
			if (!productsArr.value.some((el1) => el1.id == el)) {
				productsArr.value.push({ isLoading: true, id: el });
				newIDs.push(el);
			}
		});
		console.log("newIDs", newIDs);
		if (newIDs.length == 0) return;
		let json = await (
			await fetch(
				"https://api.crwnd.dev/api/products-info/?" + new URLSearchParams({ productids: JSON.stringify(newIDs), })
			)
			// await fetch("https://api.crwnd.dev/api/get-product-info/", {
			// 	method: "POST",
			// 	credentials: "include",
			// 	headers: {
			// 		"Content-Type": "application/x-www-form-urlencoded",
			// 	},
			// 	body: new URLSearchParams({
			// 		productid: JSON.stringify(newIDs),
			// 	}),
			// })
		).json();
		if (json.code == 0) {
			json.content.forEach((el) => {
				let thisProductIndex = productsArr.value
					.map((el) => el.id)
					.indexOf(el.id);
				productsArr.value[thisProductIndex] = Object.assign({}, el, {
					isLoading: false,
				});
			});
		}
	}
	function getProductByID(productID) {
		if (productsArr.value.some((el) => el.id == productID)) {
			return productsArr.value.find((el) => el.id == parseInt(productID));
		}
		// console.log("productsArr.value", productsArr.value);
		console.log("productID", productID);
		// productsArr.value.push({ bundles: [], id: parseInt(productID), isLoading: true });
		fetchNewInfo([parseInt(productID)]);
		return productsArr.value[productsArr.value.length - 1];
	}
	function getProductsByID(productIDs) {
		return productIDs.map(el => getProductByID(el));
	}
	function updateProductWithObject(productObj) {
		Object.assign(
			productsArr.value.find((prod) => prod.id === productObj.id),
			productObj
		);
		return productsArr.value;
	}
	function updateProductsArr(newValue) {
		productsArr.value = newValue;
		return;
	}
	async function likeProduct(productID, bundleID) {
		console.log("likeProduct", productID, bundleID);
		if (!user.isAuthenticated) {
			likedList.value.push({
				productID: parseInt(productID),
				bundleID: parseInt(bundleID),
				isLoading: false,
			});
			return;
		}
		if (
			likedList.value.some(
				(el) =>
					el.productID == parseInt(productID) &&
					el.bundleID == parseInt(bundleID)
			)
		)
			return;
		likedList.value.push({
			productID: parseInt(productID),
			bundleID: parseInt(bundleID),
			isLoading: true,
		});
		let indexOfThisProduct = this.likedList.length - 1;
		let json = await (
			await fetch("https://api.crwnd.dev/api/like-good/", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					productid: parseInt(productID),
					bundleid: parseInt(bundleID),
				}),
			})
		).json();
		likedList.value[indexOfThisProduct].isLoading = false;
		if (json.code != 0) likedList.value.splice(indexOfThisProduct, 1);
	}
	async function unlikeProduct(productID, bundleID) {
		console.log("unlikeProduct", productID, bundleID);
		if (
			!likedList.value.some(
				(el) =>
					el.productID == parseInt(productID) &&
					el.bundleID == parseInt(bundleID)
			)
		)
			return;
		let indexOfThisProduct = likedList.value.findIndex(
			(el) =>
				el.productID == parseInt(productID) &&
				el.bundleID == parseInt(bundleID)
		);
		if (!user.isAuthenticated) {
			likedList.value.splice(indexOfThisProduct, 1);
			return;
		}
		likedList.value[indexOfThisProduct].isLoading = true;
		let json = await (
			await fetch("https://api.crwnd.dev/api/unlike-good/", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					productid: parseInt(productID),
					bundleid: parseInt(bundleID),
				}),
			})
		).json();
		likedList.value[indexOfThisProduct].isLoading = false;
		if (json.code == 0) {
			likedList.value.splice(indexOfThisProduct, 1);
		}
	}
	async function cartProduct(productID, bundleID, sellerID) {
		console.log("cartProduct", productID, bundleID, sellerID);
		if (
			carted.content.some(
				(el) =>
					el.productID == parseInt(productID) &&
					el.bundleID == parseInt(bundleID) &&
					el.sellerID == parseInt(sellerID)
			)
		)
			return;
		if (!user.isAuthenticated) {
			carted.content.push({
				productID: parseInt(productID),
				bundleID: parseInt(bundleID),
				sellerID: parseInt(sellerID),
				quantity: 1,
				isLoading: false,
			});
			carted.lastChange = Math.floor(Date.now / 1000);
			return;
		}
		carted.content.push({
			productID: parseInt(productID),
			bundleID: parseInt(bundleID),
			sellerID: parseInt(sellerID),
			quantity: 1,
			isLoading: true,
		});
		let indexOfThisProduct = carted.content.length - 1;
		let json = await (
			await fetch("https://api.crwnd.dev/api/cart-good/", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					productid: parseInt(productID),
					bundleid: parseInt(bundleID),
					sellerid: parseInt(sellerID),
				}),
			})
		).json();
		carted.content[indexOfThisProduct].isLoading = false;
		if (json.code == 0) carted.lastChange = Math.floor(Date.now / 1000);
		if (json.code != 0) {
			carted.content.splice(indexOfThisProduct, 1);
		}
	}
	async function uncartProduct(productID, bundleID, sellerID) {
		console.log("uncartProduct", productID, bundleID, sellerID);
		if (
			!carted.content.some(
				(el) =>
					el.productID == parseInt(productID) &&
					el.bundleID == parseInt(bundleID) &&
					el.sellerID == parseInt(sellerID)
			)
		)
			return;
		let indexOfThisProduct = carted.content.findIndex(
			(el) =>
				el.productID == parseInt(productID) &&
				el.bundleID == parseInt(bundleID) &&
				el.sellerID == parseInt(sellerID)
		);
		if (!user.isAuthenticated) {
			carted.content.splice(indexOfThisProduct, 1);
			carted.lastChange = Math.floor(Date.now / 1000);
			return;
		}
		carted.content[indexOfThisProduct].isLoading = true;
		let json = await (
			await fetch("https://api.crwnd.dev/api/uncart-good/", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					productid: parseInt(productID),
					bundleid: parseInt(bundleID),
					sellerid: parseInt(sellerID),
				}),
			})
		).json();
		carted.content[indexOfThisProduct].isLoading = false;
		if (json.code == 0) {
			carted.content.splice(indexOfThisProduct, 1);
			carted.lastChange = Math.floor(Date.now / 1000);
		}
	}
	async function cartChangeProductQuantity(
		productID,
		bundleID,
		sellerID,
		quantity
	) {
		console.log(
			"cartChangeProductQuantity",
			productID,
			bundleID,
			sellerID,
			quantity
		);
		let targetElement = carted.content.find(
			(el) =>
				el.productID == productID &&
				el.bundleID == bundleID &&
				el.sellerID == sellerID
		);
		if (!targetElement) return;
		if (!user.isAuthenticated) {
			if (targetElement) {
				targetElement.quantity = parseInt(quantity) || 1;
				carted.lastChange = Math.floor(Date.now / 1000);
			}
			return;
		}
		targetElement.isLoading = true;
		let json = await (
			await fetch("https://api.crwnd.dev/api/set-quantity-in-cart/", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					productid: parseInt(productID),
					bundleid: parseInt(bundleID),
					sellerid: parseInt(sellerID),
					quantity: parseInt(quantity),
				}),
			})
		).json();
		targetElement.isLoading = false;
		if (json.code == 0) {
			carted.lastChange = Math.floor(Date.now / 1000);
			targetElement.quantity = parseInt(quantity) || 1;
		}
	}
	async function handleListChange(val, oldVal) {
		let newProductIDs = [
			...new Set(
				val
					.filter(
						(productObj) =>
							!oldVal.find(
								(oldProductObj) =>
									productObj.productID ==
									oldProductObj.productID
							)
					)
					.map((el) => el.productID)
			),
		];
		newProductIDs = newProductIDs.filter(
			(newProductID) =>
				!productsArr.value.some((el) => el.id == newProductID)
		);
		await fetchNewInfo(newProductIDs);
	}
	async function fetchListContent(source) {
		let json = await (
			await fetch("https://api.crwnd.dev/lists/" + source + "", {
				method: "POST",
				credentials: "include",
			})
		).json();
		// console.log(json);
		switch (json.code) {
			case 0:
				return json.content;
			case 1:
				alert(json.message);
				break;
			default:
				throw "unknown err: " + json.message;
		}
	}
	async function fetchRandomProducts() {
		let json = await (
			await fetch("https://api.crwnd.dev/api/random-goods/")
		).json();
		// console.log(json);
		switch (json.code) {
			case 0:
				fetchNewInfo(json.content);
				return json.content;
		}
		return [];
	}
	return {
		productsArr,
		activeFilters,
		likedList,
		carted,
		likedProducts,
		cartedProducts,
		lastSeenProducts,
		informNewProducts,
		getProductByID,
		getProductsByID,
		updateProductWithObject,
		updateProductsArr,
		likeProduct,
		unlikeProduct,
		cartProduct,
		uncartProduct,
		cartChangeProductQuantity,
		handleListChange,
		fetchListContent,
		fetchRandomProducts
	};
});
