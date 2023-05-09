<script setup>
import { useUserStore } from "@/stores/user";
const user = useUserStore();
defineProps(["userObj"]);
defineEmits(["update:userObj"]);
</script>
<script>
export default {
	methods: {
		async removeSession(event) {
			let json = await (
				await fetch("https://api.crwnd.dev/auth/remove-session/", {
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: new URLSearchParams({
						index: index,
					}),
				})
			).json();
			console.log(json);
			if (json.code == 0) {
				return true;
			} else {
				alert("Error: " + json.errors);
			}
			return false;
		},
	},
};
</script>
<template>
	<div id="account-section">
		<div class="account-section">
			<span>Sessions</span>
			<div class="account-section-content">
				<ul class="account-section-content__list sessions-list">
					<li
						class="sessions-list__item"
						v-for="session in user.sessions"
						:data-id="session.id"
					>
						<div class="sessions-list__item__info">
							<svg>
								<use :xlink:href="'/svgs/icons.svg#codeslash-outline'" />
							</svg>
							<span>{{ session.infoString }}</span>
						</div>
						<button
							v-if="session.isActive && user.currentSessionID != session.id"
							@click="removeSession"
						>
							Delete
						</button>
						<span
							v-if="!session.isActive && user.currentSessionID != session.id"
							>Expired</span
						>
						<span v-if="user.currentSessionID == session.id">Current</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<style scoped>
.account-section-content__list {
	list-style: none;
}

.sessions-list {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	padding: 0;
}
.sessions-list__item {
	width: 100%;
	max-width: 512px;
	height: 48px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border-radius: 6px;
	overflow: hidden;
	padding: 0 12px;
}
.sessions-list__item:hover {
	background-color: #464a4c;
}
.sessions-list__item__info {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
}
.sessions-list__item__info svg {
	width: 24px;
	height: 24px;
	margin-right: 8px;
}
</style>
