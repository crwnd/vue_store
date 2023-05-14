<script setup>
import { ref } from "vue";
import IconLogoCart from "@/assets/svgs/logo-cart.svg?url";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
defineProps([]);
defineEmits([]);
const router = useRouter();
const user = useUserStore();

const passwordValue = ref("");

async function SignUpWithRedirect(submitEvent) {
	try {
		await user.SignUp(submitEvent);
		await router.push("/account/");
	} catch {}
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
				<input name="name" type="text" placeholder="Your name" />
				<input name="email" type="email" placeholder="Email" />
				<input
					name="pass"
					type="password"
					placeholder="Password"
					v-model="passwordValue"
				/>
				<div class="password-strength-tags">
					<ul>
						<li
							v-for="passedTag in user.passwordStrengthTags(
								passwordValue
							).passed"
						>
							yes {{ passedTag }}
						</li>
						<li
							v-for="missingTag in user.passwordStrengthTags(
								passwordValue
							).failed"
						>
							no {{ missingTag }}
						</li>
					</ul>
				</div>
				<button type="submit">Sign up</button>
			</form>
			<div class="auth-content__left__additional-action">
				<span>Already have an account?</span>
				<RouterLink
					to="/login/"
					class="auth-content__left__additional-action__action-link"
					>Sign in now</RouterLink
				>
			</div>
		</div>
	</div>
</template>

<style scoped>
@import "@/assets/signin-signup-pages.css";
</style>
