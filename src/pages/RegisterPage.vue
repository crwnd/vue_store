<script setup>
import { ref, reactive } from "vue";
import IconLogoCart from "@/assets/svgs/logo-cart.svg?url";
import IconClose from "@/assets/svgs/close-outline.svg";
import IconCheckmark from "@/assets/svgs/checkmark-outline.svg";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
defineProps([]);
defineEmits([]);
const router = useRouter();
const user = useUserStore();

const passwordValue = ref("");
const loginState = reactive({ message: "", isLoading: false, errorFields: [] });

async function SignUpWithRedirect(submitEvent) {
	loginState.errorFields = [];
	loginState.isLoading = true;
	try {
		await user.SignUp(submitEvent);
		await router.push("/account/");
	} catch (e) {
		console.error("SignUpWithRedirect Exception:", e);
		switch (e) {
			case "email-already-registered":
				loginState.errorFields = ["email"];
				loginState.message = "Email already taken";
				break;
			case "bad-password":
				loginState.errorFields = ["password"];
				loginState.message = "Password is wrong";
				break;
		}
	}
	loginState.isLoading = false;
}
</script>

<template>
	<div id="register-content" class="auth-content">
		<div class="auth-content__left">
			<img :src="IconLogoCart" alt="logo" />
			<h2>Yatka - sample store</h2>
		</div>
		<div class="auth-content__right">
			<h1 id="component-content-heading">Sign up</h1>
			<form @submit.prevent="SignUpWithRedirect">
				<span class="auth-content__form__input-text">Your name</span>
				<input
					name="name"
					type="text"
					placeholder="Your name"
					class="auth-content__form__input"
				/>
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
					v-model="passwordValue"
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
				<div class="password-strength-tags">
					<ul class="password-strength-tags__list">
						<li
							v-if="passwordValue.length > 0"
							v-for="tagCode in user.passwordStrengthInfo
								.possibleCodes"
							class="password-strength-tags__list__elem passed"
							:class="{
								passed: user
									.passwordStrengthTags(passwordValue)
									.passed.includes(tagCode),
								failed: user
									.passwordStrengthTags(passwordValue)
									.failed.includes(tagCode),
							}"
						>
							<IconClose
								v-if="
									user
										.passwordStrengthTags(passwordValue)
										.failed.includes(tagCode)
								"
							/>
							<IconCheckmark
								v-if="
									user
										.passwordStrengthTags(passwordValue)
										.passed.includes(tagCode)
								"
							/>
							<span>{{
								user.passwordStrengthInfo.messages[tagCode]
							}}</span>
						</li>
					</ul>
				</div>
				<button
					type="submit"
					class="auth-content__form__button"
					:disabled="loginState.isLoading"
				>
					Sign up
				</button>
			</form>
			<div class="auth-content__right__form__additional-action">
				<span>Already have an account?</span>
				<RouterLink
					to="/login/"
					class="auth-content__right__form__additional-action__action-link"
					>Sign in now</RouterLink
				>
			</div>
		</div>
	</div>
</template>

<style scoped>
@import "@/assets/signin-signup-pages.css";
</style>
