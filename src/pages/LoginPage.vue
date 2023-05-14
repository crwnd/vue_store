<script setup>
import { useUserStore } from "@/stores/user";
import IconLogoCart from "@/assets/svgs/logo-cart.svg?url";
import { useRouter } from "vue-router";
const router = useRouter();
defineProps([]);
defineEmits([]);
const user = useUserStore();

async function SignInWithRedirect(submitEvent) {
	try {
		await user.SignIn(submitEvent);
		console.log(await router.push("/account/"));
	} catch (e) {
		console.error("SignInWithRedirect Exception:", e);
	}
}
</script>

<template>
	<div class="auth-content" id="login-content">
		<div class="auth-content__left">
			<img :src="IconLogoCart" alt="logo" />
			<h2>Yatka - sample store</h2>
		</div>
		<div class="auth-content__right">
			<h1 id="component-content-heading">Log in</h1>
			<form @submit.prevent="SignInWithRedirect">
				<input name="email" type="email" placeholder="Email" />
				<input name="pass" type="password" placeholder="Password" />
				<button type="submit">Sign in</button>
			</form>
			<div class="auth-content__left__additional-action">
				<span>Dont have an account?</span>
				<RouterLink
					to="/register/"
					class="auth-content__left__additional-action__action-link"
					>Sign up now</RouterLink
				>
			</div>
		</div>
	</div>
</template>

<style>
@import "@/assets/signin-signup-pages.css";
</style>
