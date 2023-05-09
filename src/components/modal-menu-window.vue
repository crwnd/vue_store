<script setup>
import { useModalsStore } from "@/stores/modals";
import { useProductsStore } from "@/stores/products";
import IconHome from "@/icons/IconHome.vue";
import IconGrid from "@/icons/IconGrid.vue";
import IconCart from "@/icons/IconCart.vue";
import IconHeart from "@/icons/IconHeart.vue";
import IconOrdersOutline from "@/assets/svgs/reader-outline.svg";
import IconOrders from "@/assets/svgs/reader.svg";
import IconPersonOutline from "@/assets/svgs/person-outline.svg";
import IconPerson from "@/assets/svgs/person.svg";
defineProps([]);
defineEmits([]);
const modals = useModalsStore();
const products = useProductsStore();
</script>

<template>
  <div
    id="modal-menu-window"
    :class="{ hidden: modals.openedModal !== 'modalMenu' }"
    @click="modals.openedModal = undefined"
  >
    <div id="modal-menu" class="authed" @click.stop="">
      <RouterLink to="/account" id="modal-menu__user" class="hides-on-mobile">
        <div id="modal-menu__user__avatar">
          <img src="/svgs/icons.svg#person-circle-outline" alt="avatar" />
          <div class="avatar-icon">
            <svg>
              <use xlink:href="/svgs/icons.svg#locked-outline"></use>
            </svg>
          </div>
        </div>
        <div id="modal-menu__user__info">
          <span id="modal-menu__user__name">User name</span>
          <span id="modal-menu__user__email">hello@lowsoft.ml</span>
        </div>
      </RouterLink>
      <RouterLink id="modal-menu__action-banner" to="/specials/">
        <span id="modal-menu__action-banner__text">Action!</span>
      </RouterLink>
      <ul>
        <li @click="modals.openedModal = undefined">
          <RouterLink
            to="/"
            exact-active-class="active"
            active-class="active"
            :class="{
              activeOverwrite:
                modals.openedModal != undefined &&
                modals.openedModal != 'modalMenu',
            }"
          >
            <IconHome icon-style="outline" class="modal-menu__icon__outline" />
            <IconHome icon-style="filled" class="modal-menu__icon__filled" />
            <span>Home</span>
          </RouterLink>
        </li>
        <li id="modal-menu__catalog">
          <RouterLink
            to="/catalog"
            @click="modals.openedModal = undefined"
            active-class="active"
            :class="{
              activeOverwrite:
                modals.openedModal != undefined &&
                modals.openedModal != 'modalMenu',
            }"
          >
            <IconGrid icon-style="outline" class="modal-menu__icon__outline" />
            <IconGrid icon-style="filled" class="modal-menu__icon__filled" />
            <span>Catalog</span>
          </RouterLink>
        </li>
        <li id="modal-menu__cabinet" style="position: relative">
          <RouterLink
            to="/cart"
            @click="modals.openedModal = undefined"
            active-class="active"
            :class="{
              activeOverwrite:
                modals.openedModal != undefined &&
                modals.openedModal != 'modalMenu',
            }"
          >
            <IconCart icon-style="outline" class="modal-menu__icon__outline" />
            <IconCart icon-style="filled" class="modal-menu__icon__filled" />
            <span
              class="modal-menu__amount-label"
              :key="products.carted.content.length"
              v-if="products.carted.content.length > 0"
              >{{ products.carted.content.length }}</span
            >
            <span>Cart</span>
          </RouterLink>
        </li>
        <li class="hides-on-mobile">
          <RouterLink to="/orders" @click="modals.openedModal = undefined">
            <IconOrdersOutline class="modal-menu__icon__outline" v-once />
            <IconOrders class="modal-menu__icon__filled" v-once />
            <span>Orders</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/liked"
            @click="modals.openedModal = undefined"
            active-class="active"
            :class="{
              activeOverwrite:
                modals.openedModal != undefined &&
                modals.openedModal != 'modalMenu',
            }"
          >
            <IconHeart icon-style="outline" class="modal-menu__icon__outline" />
            <IconHeart icon-style="filled" class="modal-menu__icon__filled" />
            <span>Liked</span>
          </RouterLink>
        </li>
        <li id="modal-menu__compare" class="hides-on-mobile">
          <a>
            <svg>
              <use xlink:href="/svgs/icons.svg#compare-outline"></use>
            </svg>
            <span>Compare</span>
          </a>
        </li>
        <li
          id="modal-menu__cabinet"
          class="modal-opener open-cabinet"
          data-modal_id="modal-cabinet-window"
        >
          <RouterLink
            to="/account"
            @click="modals.openedModal = undefined"
            active-class="active"
            :class="{
              activeOverwrite:
                modals.openedModal != undefined &&
                modals.openedModal != 'modalMenu',
            }"
          >
            <IconPersonOutline class="modal-menu__icon__outline" v-once />
            <IconPerson class="modal-menu__icon__filled" v-once />
            <span>Account</span>
          </RouterLink>
        </li>
        <li class="hides-on-mobile">
          <a @click="modals.openedModal = undefined">
            <svg class="modal-menu__icon__outline">
              <use xlink:href="/svgs/icons.svg#language-outline"></use>
            </svg>
            <span>Language</span>
          </a>
        </li>
        <li
          id="modal-menu__about"
          class="hides-on-mobile"
          @click="modals.openedModal = undefined"
        >
          <RouterLink to="/about">
            <svg>
              <use xlink:href="/svgs/icons.svg#info-outline"></use>
            </svg>
            <span>About</span>
          </RouterLink>
        </li>
        <li
          class="hides-on-mobile"
          id="modal-menu__logout"
          @click="modals.openedModal = undefined"
        >
          <a>
            <svg>
              <use xlink:href="/svgs/icons.svg#logout-outline"></use>
            </svg>
            <span>Exit</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
#modal-menu-window {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  visibility: visible;
  pointer-events: all;
  user-select: auto;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1501;
  opacity: 1;
  transition: opacity 0.2s, visibility 0.2s;
}
#modal-menu-window.hidden {
  visibility: hidden;
  pointer-events: none;
  user-select: none;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;
}

#modal-menu {
  width: 300px;
  max-height: calc(100% - 124px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  pointer-events: inherit;
  position: fixed;
  transform: translateY(0px);
  top: 104px;
  right: calc(calc(100% - 1600px) / 2);

  /* background-color: #f4f6fa; */
  background-color: var(--bottom-nav-bg);
  color: var(--bottom-nav-text);
  /* border-radius: 20px; */
  border-radius: 16px;
  z-index: 1502;
  visibility: inherit;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  transition: top 0.2s, transform 0.2s;
}
#modal-menu-window.hidden #modal-menu {
  transform: translateY(-50px);
  transition: top 0.2s, transform 0.2s;
}

#modal-menu__user {
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--text-color);
}

/* #modal-menu.authed #modal-menu__user {
  display: flex;
} */

#modal-menu #modal-menu__logout,

/* #modal-menu #modal-menu__cabinet, */

#modal-menu #modal-menu__orders {
  display: none;
}

/* #modal-menu.authed #modal-menu__logout,

#modal-menu.authed #modal-menu__orders {
  display: flex;
} */

#modal-menu__user__email {
  font-size: 12px;
  /* color: #464646; */
  color: var(--text-color);
}

#modal-menu__user__avatar {
  width: 40px;
  height: 40px;
  margin-right: 16px;
  position: relative;
}

#modal-menu__user__avatar > svg,
#modal-menu__user__avatar > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -5px;
  right: -5px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #4a4e5b;
  border: 3px solid #fff;
  color: #fff;
}

.avatar-icon svg {
  width: 70%;
  height: 70%;
}

#modal-menu__user__info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

#modal-menu__action-banner {
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #c3ffa1, #90ffdd);
}

#modal-menu > ul {
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin: 0;
  user-select: none;
}

#modal-menu > ul > li {
  width: 100%;
  height: 48px; /*56px;*/
  /* margin-top: 4px; */
  background-color: inherit;
  /* transition: all 0.2s; */
}

#modal-menu ul a.active:not(.activeOverwrite) {
  color: var(--accent-color);
  fill: var(--accent-color);
  font-weight: bold;
  /* transition: all 0.2s; */
}

#modal-menu ul a.active:not(.activeOverwrite) .modal-menu__icon__outline,
#modal-menu ul a .modal-menu__icon__filled {
  display: none;
}

#modal-menu ul a .modal-menu__icon__outline,
#modal-menu ul a.active:not(.activeOverwrite) .modal-menu__icon__filled {
  display: block;
}

#modal-menu ul li:hover {
  background-color: var(--modal-menu-hover-bg);
  transition: all 0.2s;
}

#modal-menu ul a {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px 16px;
  color: var(--text-color);
}

#modal-menu ul a svg,
#modal-menu ul a > img {
  width: 36px;
  height: 36px;
  padding: 6px;
  /* background: #fff; */
  /* border-radius: 50%; */
  /* overflow: visible; */
  margin-right: 12px;
}

#modal-menu .modal-menu__amount-label {
  background-color: #595959;
  color: rgb(255, 255, 255);
  border-radius: 50%;
  width: 18px;
  height: 18px;
  position: absolute;
  bottom: 28px;
  left: 42px;
  text-align: center;
  font-size: 12px;
  line-height: 18px;
  font-weight: normal;
}

@media screen and (max-width: 1600px) {
  #modal-menu {
    right: 16px;
  }
}
@media screen and (max-width: 1024px) {
  #modal-menu {
    width: 80%;
    max-height: calc(100% - 100px);
    max-width: 320px;
    height: 100%;
    padding: 0;
    left: 0;
    /* top: 72px; */
    transform: translateX(0);
    border-radius: 0;
    justify-content: flex-start;
  }

  #modal-menu-window.hidden #modal-menu {
    transform: translateX(-50%);
  }
}
@media screen and (max-width: 768px) {
  /* #modal-menu-window #modal-menu .hides-on-mobile,
  #modal-menu.authed #modal-menu__user {
    display: none;
  } */

  #modal-menu-window {
    width: 100%;
    max-width: 100%;
    height: 58px;
    top: auto;
    bottom: 0;
  }

  #modal-menu {
    width: 100%;
    height: 100%;
    max-height: 100%;
    max-width: 100%;
    flex-direction: row;
    position: relative;
    margin: 0;
    padding: 0 20px;
    top: 0;
    left: 0;
    border-radius: 0;
    visibility: visible;
    pointer-events: all;
  }

  #modal-menu__action-banner,
  #modal-menu__user {
    display: none;
  }

  #modal-menu > ul {
    height: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  #modal-menu > ul > li {
    width: 100%;
    height: 100%;
    flex-direction: column;
    margin: 0;
    padding: 0;
    overflow-y: hidden;
  }

  #modal-menu > ul > li:hover {
    background-color: inherit;
  }

  #modal-menu > ul > li > a {
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    padding: 0;
    color: #707f8d;
  }

  #modal-menu > ul > li > a > span {
    margin-top: 5px;
    font-size: 11px;
  }

  #modal-menu > ul > li > a > svg,
  #modal-menu > ul > li > a > img {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    margin: 0;
    padding: 0;
  }
  #modal-menu .modal-menu__amount-label {
    display: none;
  }

  #modal-menu-window,
  #modal-menu-window.hidden {
    z-index: 1500;
  }

  #modal-menu-window.hidden {
    visibility: visible;
    pointer-events: all;
    transform: none;
    opacity: 1;
  }
  #modal-menu-window.hidden #modal-menu {
    transform: none;
  }
}
@media screen and (max-width: 480px) {
  #modal-menu-window {
    width: 100%;
    max-width: 100%;
  }
  #modal-menu {
    padding: 0;
  }
}
</style>
