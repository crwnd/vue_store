<script setup>
import { onMounted } from "vue";
import { useCatalogStore } from "@/stores/catalog";
import { useRoute } from "vue-router";
import IconChevronForward from "@/assets/svgs/chevron-forward-outline.svg";
import IconChevronBack from "@/assets/svgs/chevron-back-outline.svg";

const route = useRoute();
const catalog = useCatalogStore();

onMounted(() => {
  catalog.init();
});
</script>

<template>
	<div id="catalog-content">
		<h1 id="component-content-heading">Catalog</h1>
		<div
			id="catalog-content__holder"
			:class="{ 'second-step': route.params.categoryid }"
		>
			<div class="catalog-content__holder__first-step">
				<ul
					v-if="catalog.isLoading !== false"
					class="catalog-content__holder__first-step__list loading"
				>
					<li v-for="ind in 4" :key="ind">Loading...</li>
				</ul>
				<ul
					v-if="catalog.isLoading === false"
					class="catalog-content__holder__first-step__list"
				>
					<li
						v-for="category in catalog.content"
						:key="category.id"
						class="catalog-content__holder__first-step__list__elem"
					>
						<RouterLink :to="'/catalog/' + category.id">
							<div
								class="catalog-content__holder__first-step__list__elem__left"
							>
								<svg
									class="catalog-content__holder__first-step__list__elem__icon"
								>
									<use :xlink:href="category.icons.svg"></use>
								</svg>
								<span>{{ category.name }}</span>
							</div>
							<div
								class="catalog-content__holder__first-step__list__elem__right"
							>
								<IconChevronForward
									class="catalog-content__holder__first-step__list__elem__icon-forward"
								/></div
						></RouterLink>
					</li>
				</ul>
			</div>
			<div class="catalog-content__holder__second-step">
				<ul
					v-if="catalog.isLoading === false"
					class="catalog-content__holder__second-step__list"
				>
					<li
						v-if="route.params.categoryid"
						class="catalog-content__holder__second-step__list__elem"
					>
						<RouterLink :to="'/catalog/'"
							><div
								class="catalog-content__holder__second-step__list__elem__left"
							>
								<IconChevronBack
									class="catalog-content__holder__second-step__list__elem__icon"
								/>
								<span>To categories</span>
							</div>
							<div
								class="catalog-content__holder__second-step__list__elem__right"
							></div
						></RouterLink>
					</li>
					<li
						v-for="subcategory in (
							catalog.content.find(
								(category) => category.id == route.params.categoryid
							) || catalog.content[0]
						).subcategories"
						class="catalog-content__holder__second-step__list__elem"
					>
						<RouterLink
							:to="
								'/catalog/' +
								(route.params.categoryid || catalog.content[0].id) +
								'/' +
								subcategory.id
							"
						>
							<div
								class="catalog-content__holder__second-step__list__elem__left"
							>
								<svg
									class="catalog-content__holder__second-step__list__elem__icon"
								>
									<use :xlink:href="subcategory.icons.svg"></use>
								</svg>
								<span>{{ subcategory.name }}</span>
							</div>
							<div
								class="catalog-content__holder__second-step__list__elem__right"
							>
								<IconChevronForward
									class="catalog-content__holder__second-step__list__elem__icon-forward"
								/></div
						></RouterLink>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style scoped>
#catalog-content {
	width: 100%;
	display: flex;
	flex-direction: column;
}
#catalog-content__holder {
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: flex-start;
}
.catalog-content__holder__first-step {
	width: 100%;
	max-width: 300px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
}
.catalog-content__holder__second-step {
	width: 100%;
	max-width: calc(100% - 300px);
}
.catalog-content__holder__first-step__list,
.catalog-content__holder__second-step__list {
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 0;
}
.catalog-content__holder__first-step__list__elem,
.catalog-content__holder__second-step__list__elem {
	width: 100%;
	height: 48px;
	display: block;
	padding: 0;
}
.catalog-content__holder__first-step__list__elem a,
.catalog-content__holder__second-step__list__elem a {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 12px 16px;
}
.catalog-content__holder__first-step__list__elem__left,
.catalog-content__holder__first-step__list__elem__right,
.catalog-content__holder__second-step__list__elem__left,
.catalog-content__holder__second-step__list__elem__right {
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.catalog-content__holder__first-step__list__elem__icon,
.catalog-content__holder__second-step__list__elem__icon {
	width: 24px;
	height: 24px;
	margin-right: 8px;
}
.catalog-content__holder__first-step__list__elem__icon-forward,
.catalog-content__holder__second-step__list__elem__icon-forward {
	width: 24px;
	height: 24px;
}

@media screen and (max-width: 768px) {
	.catalog-content__holder__first-step,
	.catalog-content__holder__second-step {
		max-width: 100%;
	}
	.catalog-content__holder__second-step,
	.second-step .catalog-content__holder__first-step {
		display: none;
	}
	.second-step .catalog-content__holder__second-step,
	.catalog-content__holder__first-step {
		display: flex;
	}
}
</style>
