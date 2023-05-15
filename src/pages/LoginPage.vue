<script setup>
import { reactive } from "vue";
import { useUserStore } from "@/stores/user";
import IconLogoCart from "@/assets/svgs/logo-cart.svg?url";
import { useRouter } from "vue-router";
const router = useRouter();
defineProps([]);
defineEmits([]);
const user = useUserStore();

const loginState = reactive({ message: "", isLoading: false, errorFields: [] });
async function SignInWithRedirect(submitEvent) {
	loginState.errorFields = [];
	loginState.isLoading = true;
	try {
		await user.SignIn(submitEvent);
		console.log(await router.push("/account/"));
	} catch (e) {
		console.error("SignInWithRedirect Exception:", e);
		switch (e) {
			case "user-not-found":
				loginState.errorFields = ["email"];
				loginState.message = "User not found";
				break;
			case "pass-wrong":
				loginState.errorFields = ["password"];
				loginState.message = "Password is wrong";
				break;
		}
	}
	loginState.isLoading = false;
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
			<form
				class="auth-content__right__form"
				@submit.prevent="SignInWithRedirect"
			>
				<span class="auth-content__form__input-text">Email</span>
				<span
					v-if="
						!loginState.isLoading &&
						loginState.errorFields.includes('email')
					"
					>Error: {{ loginState.message }}</span
				>
				<input
					name="email"
					type="email"
					placeholder="Email"
					class="auth-content__form__input"
					:class="{
						error:
							!loginState.isLoading &&
							loginState.errorFields.includes('email'),
					}"
					:aria-invalid="
						!loginState.isLoading &&
						loginState.errorFields.includes('email')
					"
					:aria-describedby="
						loginState.error ? loginState.message : 'None'
					"
					:aria-errormessage="
						loginState.error ? loginState.message : 'None'
					"
					required
				/>
				<span class="auth-content__form__input-text">Password</span>
				<span
					v-if="
						!loginState.isLoading &&
						loginState.errorFields.includes('password')
					"
					>Error: {{ loginState.message }}</span
				>
				<input
					name="pass"
					type="password"
					placeholder="Password"
					class="auth-content__form__input"
					:class="{
						error:
							!loginState.isLoading &&
							loginState.errorFields.includes('password'),
					}"
					:aria-invalid="loginState.errorFields.includes('password')"
					:aria-describedby="
						loginState.error ? loginState.message : 'None'
					"
					:aria-errormessage="
						loginState.error ? loginState.message : 'None'
					"
					required
				/>
				<div class="auth-content__right__form__additional-actions">
					<label
						class="auth-content__right__form__additional-actions__remember-me"
					>
						<input
							name="remember-me"
							type="checkbox"
							class="auth-content__right__form__additional-actions__remember-me__checkbox"
							checked
						/>
						<span>Remember me</span>
					</label>
					<RouterLink
						to="/register/"
						class="auth-content__right__form__additional-action__action-link"
						>Forgot password?</RouterLink
					>
				</div>
				<button
					type="submit"
					class="auth-content__form__button"
					:disabled="loginState.isLoading"
				>
					Sign in
				</button>
			</form>
			<div class="auth-content__right__form__additional-action">
				<span>Dont have an account?</span>
				<RouterLink
					to="/register/"
					class="auth-content__right__form__additional-action__action-link"
					>Sign up now</RouterLink
				>
			</div>
		</div>
	</div>
</template>

<style>
@import "@/assets/signin-signup-pages.css";
</style>
