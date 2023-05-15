import { ref } from "vue";
import { defineStore } from "pinia";
import { useProductsStore } from "@/stores/products";

export const useUserStore = defineStore("user", () => {
	const isAuthenticated = ref(false);
	const sessions = ref([]);
	const name = ref("...");
	const currentSessionID = ref(-1);
	const passwordStrengthInfo = {
		messages: {
			length: "At least 8 character",
			number: "At least 1 number",
			uppercase: "At least 1 uppercase",
		},
		possibleCodes: ["length", "number", "uppercase"],
	};

	async function SignIn(submitEvent) {
		let email = submitEvent.target.elements.email.value;
		let pass = submitEvent.target.elements.pass.value;
		let json = await (
			await fetch("https://api.crwnd.dev/api/auth/signin/", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					password: pass,
					email: email,
				}),
			})
		).json();
		console.log(json);
		if (json.code == 0) {
			isAuthenticated.value = true;
			localStorage.setItem("isAuthenticated", true);
			await syncWithServer();
		} else {
			throw json.message;
		}
	}

	async function syncWithServer() {
		if (isAuthenticated.value !== true) return;
		console.log("getme", isAuthenticated.value);
		let json = undefined;
		try {
			json = await (
				await fetch("https://api.crwnd.dev/users/getme/", {
					method: "POST",
					credentials: "include",
				})
			).json();
			console.log("getme", json);
			if (json.code == 0) {
				const products = useProductsStore();
				sessions.value = json.sessions;
				currentSessionID.value = json.currentSessionID;
				name.value = json.name;
				products.likedList = json.liked;
				if (json.carted.lastChange > products.carted.lastChange) {
					products.carted.content = json.carted.content;
					products.carted.lastChange = json.carted.lastChange;
				}
			} else {
				throw json.message;
			}
		} catch {
			isAuthenticated.value = false;
			localStorage.setItem("isAuthenticated", false);
		}
	}

	async function SignUp(submitEvent) {
		let email = submitEvent.target.elements.email.value;
		let userName = submitEvent.target.elements.name.value;
		let pass = submitEvent.target.elements.pass.value;
		let json = await (
			await fetch("https://api.crwnd.dev/api/auth/signup/", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					password: pass,
					email: email,
					name: userName,
				}),
			})
		).json();
		console.log(json);
		if (json.code == 0) {
			isAuthenticated.value = true;
			name.value = userName;
			localStorage.setItem("isAuthenticated", true);
			await syncWithServer();
		} else {
			throw json.message;
		}
	}

	async function LogOut() {
		await fetch("https://api.crwnd.dev/auth/logout/", {
			method: "POST",
			credentials: "include",
		});
		isAuthenticated.value = false;
		localStorage.setItem("isAuthenticated", false);
	}

	function passwordStrengthTags(password) {
		if (!password) password = "";
		const tags = {
			passed: [],
			failed: [],
		};
		if (password.length >= 8) {
			tags.passed.push("length");
		} else {
			tags.failed.push("length");
		}
		if (/[A-Z]/.test(password)) {
			tags.passed.push("uppercase");
		} else {
			tags.failed.push("uppercase");
		}
		if (/\d/.test(password)) {
			tags.passed.push("number");
		} else {
			tags.failed.push("number");
		}
		// if (/\W|_/.test(password)) {
		// 	tags.passed.push("1 special symbol");
		// } else {
		// 	tags.failed.push("1 special symbol");
		// }
		return tags;
	}

	return {
		isAuthenticated,
		sessions,
		name,
		currentSessionID,
		passwordStrengthInfo,
		syncWithServer,
		SignIn,
		SignUp,
		LogOut,
		passwordStrengthTags,
	};
});
