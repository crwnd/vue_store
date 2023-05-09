<script setup>
defineProps([]);
</script>

<template>
	<div id="page-content" class="subcategory">
		<aside id="filters" class="hidden modalable">
			<div id="filters-content">
				<form method="get" action="/catalog/">
					<div id="filters-content__header" class="modal-content__header">
						<h2>Filters</h2>
						<button
							class="close-filters modal-content__header__close close-modal"
							type="button"
						>
							<svg>
								<use
									xlink:href="/svgs/icons.svg?1659470833#close-outline"
								></use>
							</svg>
						</button>
						<input
							type="text"
							name="category"
							value="electronics"
							style="display: none"
						/>
						<input
							type="text"
							name="subcategory"
							value="phones"
							style="display: none"
						/>
					</div>
					<div class="chips"></div>
					<details class="filter" data-id="status" open>
						<summary class="filter__name">
							<span>Status</span>
							<div class="filter__name__chevron">
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#chevron-down"
									></use>
								</svg>
							</div>
						</summary>
						<ul>
							<li>
								<label class="form-control">
									<input type="checkbox" name="status" value="new" />
									<span class="filter__name__text">New</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="status" value="used" />
									<span class="filter__name__text">Used</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="status" value="ref" />
									<span class="filter__name__text">Refubished</span>
								</label>
							</li>
						</ul>
					</details>
					<details class="filter" data-id="manufacturer" open>
						<summary class="filter__name">
							<span>Manufacturer</span>
							<div class="filter__name__chevron">
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#chevron-down"
									></use>
								</svg>
							</div>
						</summary>
						<ul>
							<li>
								<label class="form-control">
									<input type="checkbox" name="manufacturer" value="apple" />
									<span class="filter__name__text">Apple</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="manufacturer" value="samsung" />
									<span class="filter__name__text">Samsung</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="manufacturer" value="xiaomi" />
									<span class="filter__name__text">Xiaomi</span>
								</label>
							</li>
						</ul>
					</details>
					<details class="filter" data-id="model" open>
						<summary class="filter__name">
							<span>Model</span>
							<div class="filter__name__chevron">
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#chevron-down"
									></use>
								</svg>
							</div>
						</summary>
						<ul>
							<li>
								<label class="form-control">
									<input type="checkbox" name="model" value="se" />
									<span class="filter__name__text">SE</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="model" value="11" />
									<span class="filter__name__text">11</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="model" value="se2" />
									<span class="filter__name__text">SE 2</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="model" value="se3" />
									<span class="filter__name__text">SE 3</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="model" value="s22" />
									<span class="filter__name__text">S22</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="model" value="mi12x" />
									<span class="filter__name__text">Mi 12 X</span>
								</label>
							</li>
						</ul>
					</details>
					<details class="filter" data-id="width" open>
						<summary class="filter__name">
							<span>Width</span>
							<div class="filter__name__chevron">
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#chevron-down"
									></use>
								</svg>
							</div>
						</summary>
						<ul>
							<li>
								<label class="form-control">
									<input type="checkbox" name="width" value="100" />
									<span class="filter__name__text">100cm</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="width" value="200" />
									<span class="filter__name__text">200cm</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="width" value="300" />
									<span class="filter__name__text">300cm</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="width" value="400" />
									<span class="filter__name__text">400cm</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="width" value="500" />
									<span class="filter__name__text">500cm</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="width" value="600" />
									<span class="filter__name__text">600cm</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="width" value="700" />
									<span class="filter__name__text">700cm</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="width" value="800" />
									<span class="filter__name__text">800cm</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="width" value="900" />
									<span class="filter__name__text">900cm</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="width" value="1000" />
									<span class="filter__name__text">1000cm</span>
								</label>
							</li>
						</ul>
					</details>
					<details class="filter" data-id="height" open>
						<summary class="filter__name">
							<span>Height</span>
							<div class="filter__name__chevron">
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#chevron-down"
									></use>
								</svg>
							</div>
						</summary>
						<ul></ul>
					</details>
					<details class="filter" data-id="weight" open>
						<summary class="filter__name">
							<span>Weight</span>
							<div class="filter__name__chevron">
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#chevron-down"
									></use>
								</svg>
							</div>
						</summary>
						<ul></ul>
					</details>
					<details class="filter" data-id="processor" open>
						<summary class="filter__name">
							<span>Processor</span>
							<div class="filter__name__chevron">
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#chevron-down"
									></use>
								</svg>
							</div>
						</summary>
						<ul>
							<li>
								<label class="form-control">
									<input
										type="checkbox"
										name="processor"
										value="apple_a11_bionic"
									/>
									<span class="filter__name__text">Apple A11 Bionic</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="processor" value="apple_a11" />
									<span class="filter__name__text">Apple A11</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="processor" value="apple_a10" />
									<span class="filter__name__text">Apple A10</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="processor" value="apple_a9" />
									<span class="filter__name__text">Apple A9</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="processor" value="apple_a8" />
									<span class="filter__name__text">Apple A8</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="processor" value="apple_a7" />
									<span class="filter__name__text">Apple A7</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="processor" value="apple_a6" />
									<span class="filter__name__text">Apple A6</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="processor" value="apple_a5" />
									<span class="filter__name__text">Apple A5</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="processor" value="apple_a4" />
									<span class="filter__name__text">Apple A4</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="processor" value="apple_a3" />
									<span class="filter__name__text">Apple A3</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input
										type="checkbox"
										name="processor"
										value="snapdragon_845"
									/>
									<span class="filter__name__text">Snapdragon 845</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input
										type="checkbox"
										name="processor"
										value="snapdragon_660"
									/>
									<span class="filter__name__text">Snapdragon 660</span>
								</label>
							</li>
						</ul>
					</details>
					<details class="filter" data-id="os" open>
						<summary class="filter__name">
							<span>os</span>
							<div class="filter__name__chevron">
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#chevron-down"
									></use>
								</svg>
							</div>
						</summary>
						<ul>
							<li>
								<label class="form-control">
									<input type="checkbox" name="os" value="android_10" />
									<span class="filter__name__text">Android 10</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="os" value="android_11" />
									<span class="filter__name__text">Android 11</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="os" value="android_12" />
									<span class="filter__name__text">Android 12</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="os" value="android_13" />
									<span class="filter__name__text">Android 13</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="os" value="ios_13" />
									<span class="filter__name__text">iOS 13</span>
								</label>
							</li>
						</ul>
					</details>
					<details class="filter" data-id="ram" open>
						<summary class="filter__name">
							<span>RAM</span>
							<div class="filter__name__chevron">
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#chevron-down"
									></use>
								</svg>
							</div>
						</summary>
						<ul>
							<li>
								<label class="form-control">
									<input type="checkbox" name="ram" value="1gb" />
									<span class="filter__name__text">1GB</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="ram" value="2gb" />
									<span class="filter__name__text">2GB</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="ram" value="4gb" />
									<span class="filter__name__text">4GB</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="ram" value="6gb" />
									<span class="filter__name__text">6GB</span>
								</label>
							</li>
						</ul>
					</details>
					<details class="filter" data-id="rom" open>
						<summary class="filter__name">
							<span>ROM</span>
							<div class="filter__name__chevron">
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#chevron-down"
									></use>
								</svg>
							</div>
						</summary>
						<ul>
							<li>
								<label class="form-control">
									<input type="checkbox" name="rom" value="4gb" />
									<span class="filter__name__text">4GB</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="rom" value="8gb" />
									<span class="filter__name__text">8GB</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="rom" value="16gb" />
									<span class="filter__name__text">16GB</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="rom" value="32gb" />
									<span class="filter__name__text">32GB</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="rom" value="64gb" />
									<span class="filter__name__text">64GB</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="rom" value="128gb" />
									<span class="filter__name__text">128GB</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="rom" value="256gb" />
									<span class="filter__name__text">256GB</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="rom" value="512gb" />
									<span class="filter__name__text">512GB</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="rom" value="1tb" />
									<span class="filter__name__text">1TB</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="rom" value="2tb" />
									<span class="filter__name__text">2TB</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="rom" value="4tb" />
									<span class="filter__name__text">4TB</span>
								</label>
							</li>
						</ul>
					</details>
					<details class="filter" data-id="display_technology" open>
						<summary class="filter__name">
							<span>Display technology</span>
							<div class="filter__name__chevron">
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#chevron-down"
									></use>
								</svg>
							</div>
						</summary>
						<ul>
							<li>
								<label class="form-control">
									<input
										type="checkbox"
										name="display_technology"
										value="lcd"
									/>
									<span class="filter__name__text">LCD</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input
										type="checkbox"
										name="display_technology"
										value="oled"
									/>
									<span class="filter__name__text">OLED</span>
								</label>
							</li>
						</ul>
					</details>
					<details class="filter" data-id="color" open>
						<summary class="filter__name">
							<span>Color</span>
							<div class="filter__name__chevron">
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#chevron-down"
									></use>
								</svg>
							</div>
						</summary>
						<ul>
							<li>
								<label class="form-control">
									<input type="checkbox" name="color" value="black" />
									<span class="filter__name__text">Black</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="color" value="silver" />
									<span class="filter__name__text">Silver</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="color" value="gold" />
									<span class="filter__name__text">Gold</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="color" value="gray" />
									<span class="filter__name__text">Gray</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="color" value="white" />
									<span class="filter__name__text">White</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="color" value="green" />
									<span class="filter__name__text">Green</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="color" value="red" />
									<span class="filter__name__text">Red</span>
								</label>
							</li>
						</ul>
					</details>
					<details class="filter" data-id="warantyLength" open>
						<summary class="filter__name">
							<span>Waranty</span>
							<div class="filter__name__chevron">
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#chevron-down"
									></use>
								</svg>
							</div>
						</summary>
						<ul>
							<li>
								<label class="form-control">
									<input type="checkbox" name="warantyLength" value="12" />
									<span class="filter__name__text">12monthes</span>
								</label>
							</li>
							<li>
								<label class="form-control">
									<input type="checkbox" name="warantyLength" value="6" />
									<span class="filter__name__text">6monthes</span>
								</label>
							</li>
						</ul>
					</details>
					<div class="filters-btns modal-content__bottom-sticky">
						<button id="filters-btns__reset" class="secondary" type="reset">
							Reset
						</button>
						<button
							id="filters-btns__apply"
							class="smallerOnHover"
							type="submit"
						>
							Apply
						</button>
					</div>
				</form>
			</div>
		</aside>
		<main>
			<ul id="subcategory__goods">
				<li
					class="subcategory__good product-card"
					data-id="0"
					data-bundleid="0"
				>
					<div class="subcategory__good__content">
						<span class="subcategory__good__label">New arrival</span>
						<div class="product-card-actions">
							<!-- quick actions -->
							<button class="product-card-like-btn">
								<svg class="product-card-like-btn-empty">
									<use
										xlink:href="/svgs/icons.svg?1659470833#icon-heart-empty"
									></use>
								</svg>
								<svg class="product-card-like-btn-full">
									<use
										xlink:href="/svgs/icons.svg?1659470833#icon-heart-full"
									></use>
								</svg>
							</button>
							<button class="">
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#compare-outline"
									></use>
								</svg>
							</button>
						</div>
						<a class="subcategory__good__img" href="/product/0/?bundle=0">
							<img
								src="/static/products/csm_4_to_3_Teaser_Samsung_Galaxy_S22_c6bd9e8814.jpg"
								alt="laptop-1"
							/>
							<img
								src="/static/products/levant-galaxy-s22-plus-s906-412889-sm-s906eidgmea-530961108.webp"
								alt="laptop-1-added"
							/>
						</a>
						<div class="subcategory__good__qos">
							<!-- quick options -->
							<a
								href="/product/0/?bundle=0"
								class="subcategory__good__qo color"
								style="background-color: #008000"
								><svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#checkmark-outline"
									></use></svg></a
							><a
								href="/product/0/?bundle=1"
								class="subcategory__good__qo color"
								style="background-color: #ff0000"
							></a
							><a
								href="/product/0/?bundle=4"
								class="subcategory__good__qo color"
								style="background-color: #ffffff"
							></a>
						</div>
						<!-- <a class="subcategory__good__info" href="../product/sample1.html"> -->
						<a
							class="subcategory__good__info__name"
							href="/product/0/?bundle=0"
						>
							<span>Samsung Galaxy S22</span>
						</a>
						<a
							class="reviews_small"
							href="../product/1/reviews"
							title="Reviews"
						>
							<div class="reviews_small__stars">
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#star-filled"
									></use>
								</svg>
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#star-filled"
									></use>
								</svg>
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#star-filled"
									></use>
								</svg>
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#star-filled"
									></use>
								</svg>
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#star-filled"
									></use>
								</svg>
							</div>
							<span>4.5</span>
						</a>
						<div class="subcategory__good__info__price">
							<span>$100</span>
						</div>
						<div class="subcategory__good__info__description">
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Quisquam, quia!
							</p>
						</div>
						<!-- </a> -->
					</div>
				</li>
				<li
					class="subcategory__good product-card"
					data-id="1"
					data-bundleid="0"
				>
					<div class="subcategory__good__content">
						<span class="subcategory__good__label">New arrival</span>
						<div class="product-card-actions">
							<!-- quick actions -->
							<button class="product-card-like-btn">
								<svg class="product-card-like-btn-empty">
									<use
										xlink:href="/svgs/icons.svg?1659470833#icon-heart-empty"
									></use>
								</svg>
								<svg class="product-card-like-btn-full">
									<use
										xlink:href="/svgs/icons.svg?1659470833#icon-heart-full"
									></use>
								</svg>
							</button>
							<button class="">
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#compare-outline"
									></use>
								</svg>
							</button>
						</div>
						<a class="subcategory__good__img" href="/product/1/?bundle=0">
							<img
								src="/static/products/giorgio-trovato-p0OlRAAYXLY-unsplash.jpg"
								alt="laptop-1"
							/>
							<img
								src="/static/products/giorgio-trovato-0CZwuZhiC84-unsplash.jpg"
								alt="laptop-1-added"
							/>
						</a>
						<div class="subcategory__good__qos">
							<!-- quick options -->
							<a
								href="/product/1/?bundle=0"
								class="subcategory__good__qo checkmarked"
							>
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#checkmark-outline"
									></use>
								</svg>
								<span>64GB</span> </a
							><a href="/product/1/?bundle=1" class="subcategory__good__qo">
								<span>32GB</span>
							</a>
						</div>
						<!-- <a class="subcategory__good__info" href="../product/sample1.html"> -->
						<a
							class="subcategory__good__info__name"
							href="/product/1/?bundle=0"
						>
							<span>Samsung Galaxy S22</span>
						</a>
						<a
							class="reviews_small"
							href="../product/1/reviews"
							title="Reviews"
						>
							<div class="reviews_small__stars">
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#star-filled"
									></use>
								</svg>
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#star-filled"
									></use>
								</svg>
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#star-filled"
									></use>
								</svg>
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#star-filled"
									></use>
								</svg>
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#star-filled"
									></use>
								</svg>
							</div>
							<span>4.5</span>
						</a>
						<div class="subcategory__good__info__price">
							<span>$100</span>
						</div>
						<div class="subcategory__good__info__description">
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Quisquam, quia!
							</p>
						</div>
						<!-- </a> -->
					</div>
				</li>
				<li
					class="subcategory__good product-card"
					data-id="2"
					data-bundleid="0"
				>
					<div class="subcategory__good__content">
						<span class="subcategory__good__label">New arrival</span>
						<div class="product-card-actions">
							<!-- quick actions -->
							<button class="product-card-like-btn">
								<svg class="product-card-like-btn-empty">
									<use
										xlink:href="/svgs/icons.svg?1659470833#icon-heart-empty"
									></use>
								</svg>
								<svg class="product-card-like-btn-full">
									<use
										xlink:href="/svgs/icons.svg?1659470833#icon-heart-full"
									></use>
								</svg>
							</button>
							<button class="">
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#compare-outline"
									></use>
								</svg>
							</button>
						</div>
						<a class="subcategory__good__img" href="/product/2/?bundle=0">
							<img
								src="/static/products/8c901999dacf4c04a72a403f6ad01e14__2.jpg"
								alt="laptop-1"
							/>
						</a>
						<div class="subcategory__good__qos">
							<!-- quick options -->
							<a
								href="/product/2/?bundle=0"
								class="subcategory__good__qo color"
								style="background-color: #ff0000"
								><svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#checkmark-outline"
									></use></svg></a
							><a
								href="/product/2/?bundle=1"
								class="subcategory__good__qo color"
								style="background-color: #008000"
							></a>
						</div>
						<!-- <a class="subcategory__good__info" href="../product/sample1.html"> -->
						<a
							class="subcategory__good__info__name"
							href="/product/2/?bundle=0"
						>
							<span>Apple iPhone 11 Product Red</span>
						</a>
						<a
							class="reviews_small"
							href="../product/1/reviews"
							title="Reviews"
						>
							<div class="reviews_small__stars">
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#star-filled"
									></use>
								</svg>
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#star-filled"
									></use>
								</svg>
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#star-filled"
									></use>
								</svg>
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#star-filled"
									></use>
								</svg>
								<svg>
									<use
										xlink:href="/svgs/icons.svg?1659470833#star-filled"
									></use>
								</svg>
							</div>
							<span>4.5</span>
						</a>
						<div class="subcategory__good__info__price">
							<span>$100</span>
						</div>
						<div class="subcategory__good__info__description">
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Quisquam, quia!
							</p>
						</div>
						<!-- </a> -->
					</div>
				</li>
			</ul>
		</main>
	</div>
</template>

<style scoped>
#page-content.subcategory {
	width: 100%;
	flex-direction: row;
}

#page-content.subcategory #filters {
	width: 250px;
}

#filters-content {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 0;
}

#filters-content__header {
	display: none;
}

.filter {
	width: 100%;
	display: flex;
	flex-direction: column;
}

/* .filter ul {
  width: 100%;
  height: 100%;
  max-height: 0;
  display: flex;
  flex-direction: column;
  visibility: hidden;
  list-style-type: none;
  padding: 0;
  opacity: 0;
  transition: all 0.2s;
}

.filter.active ul {
  max-height: 100%;
  visibility: visible;
  opacity: 1;
  transition: all 0.2s;
} */

.filter__name {
	width: 100%;
	height: 48px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	flex-shrink: 0;
	padding: 0 24px;
	cursor: pointer;
	font-size: 16px;
	user-select: none;
}

.filter__name__chevron {
	width: 24px;
	height: 24px;
	transform: rotate(0);
	transition: all 0.2s;
}

.filter__name__chevron > svg {
	width: 100%;
	height: 100%;
}

.filter[open] .filter__name__chevron {
	transform: rotate(180deg);
	transition: all 0.2s;
}

.filter ul {
	padding: 0;
	margin: 0;
	list-style-type: none;
}

.filter ul li {
	width: 100%;
	height: 36px;
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 16px;
}

.filter ul li label {
	padding: 0 0 0 30px;
}

.form-control {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	position: relative;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.form-control + .form-control {
	margin-top: 1em;
}

.form-control--disabled {
	color: var(--form-control-disabled);
	cursor: not-allowed;
}

input[type="checkbox"] {
	/* Add if not using autoprefixer */
	-webkit-appearance: none;
	/* Remove most all native input styles */
	-moz-appearance: none;
	appearance: none;
	/* For iOS < 15 */
	background-color: var(--form-background);
	/* Not removed via appearance */
	margin: 0;
	font: inherit;
	color: var(--text-color);
	width: 1.1em;
	height: 1.1em;
	/* border: 0.15em solid currentColor; */
	border: 1.5px solid var(--text-color);
	border-radius: 0.15em;
	transform: translateY(-0.075em);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	margin-right: 12px;
}

input[type="checkbox"]::before {
	content: "";
	width: 0.65em;
	height: 0.65em;
	-webkit-clip-path: polygon(
		14% 44%,
		0 65%,
		50% 100%,
		100% 16%,
		80% 0%,
		43% 62%
	);
	clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
	transform: scale(0);
	transform-origin: bottom left;
	transition: 120ms transform ease-in-out;
	box-shadow: inset 1em 1em var(--form-control-color);
	/* Windows High Contrast Mode */
	background-color: var(--text-color);
}

input[type="checkbox"]:checked::before {
	transform: scale(1);
}

input[type="checkbox"]:focus {
	outline: max(2px, 0.15em) solid currentColor;
	outline-offset: max(2px, 0.15em);
}

input[type="checkbox"]:disabled {
	--form-control-color: var(--form-control-disabled);
	color: var(--form-control-disabled);
	cursor: not-allowed;
}

/*  */

.filters-btns {
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 16px;
}

.filters-btns > button {
	width: 48%;
	height: 42px;
	display: inline-block;
	margin: 1%;
	background: #f4f5f7;
	border-radius: 8px;
	flex-shrink: 1;
	border: none;
}

#filters-btns__apply {
	background: #6b4eff;
	color: #fff;
	/* background: #CED55B; */
}

#filters-btns__reset {
	color: #000;
}

#page-content.subcategory > main {
	width: calc(100% - 250px);
}

.page-category-elem .slider {
	aspect-ratio: 3/1;
}

.good-content__layout {
	width: 100%;
	display: flex;
	/* padding: 0 32px; */
}

#page-sidebar {
	width: 300px;
	height: 100%;
	padding: 8px;
}

#sidebar-catalog {
	list-style: none;
	padding: 8px;
}

.sidebar-1cat {
	display: flex;
	flex-direction: column;
	user-select: none;
}

.sidebar-1cat > ul {
	list-style: none;
	padding: 0;
	margin: 0;
}

.sidebar-catalog-main-category {
	width: 100%;
	padding: 8px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	border-bottom: 1px solid #e6e6e6;
	cursor: pointer;
}

.sidebar-catalog-main-category:hover {
	background-color: #dddddd;
	text-decoration: underline;
}

.sidebar-1cat > ul {
	max-height: 0;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	pointer-events: none;
	transition: all 0.2s;
}

.sidebar-1cat.active > ul {
	max-height: 500px;
	overflow: visible;
	pointer-events: all;
	transition: all 0.2s;
}

.sidebar-1cat > .sidebar-catalog-main-category > svg {
	width: 24px;
	height: 24px;
	margin-right: 12px;
	fill: #595959;
}

.sidebar-2cat {
	display: block;
	cursor: pointer;
}

.sidebar-2cat a {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	padding: 4px;
	padding-left: 40px;
	color: var(--text-color);
	text-decoration: none;
}

.sidebar-2cat:hover {
	background-color: #dddddd;
	text-decoration: underline;
}

.sidebar-2cat > a > svg {
	width: 24px;
	height: 24px;
	margin-right: 12px;
	fill: #595959;
}
</style>
