<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";

import personOutline from "@/assets/svgs/person-outline.svg";
import personActive from "@/assets/svgs/person.svg";
import statsOutline from "@/assets/svgs/stats-chart-outline.svg";
import statsActive from "@/assets/svgs/stats-chart.svg";
import cubeOutline from "@/assets/svgs/cube-outline.svg";
import cubeActive from "@/assets/svgs/cube.svg";
import fingerPrintOutline from "@/assets/svgs/finger-print-outline.svg";
import fingerPrintActive from "@/assets/svgs/finger-print.svg";
import shieldOutline from "@/assets/svgs/shield-half-outline.svg";
import shieldActive from "@/assets/svgs/shield-half.svg";
import moonOutline from "@/assets/svgs/moon-outline.svg";
import moonActive from "@/assets/svgs/moon.svg";
import logoutOutline from "@/assets/svgs/log-out-outline.svg";
import logoutActive from "@/assets/svgs/log-out.svg";

const route = useRoute();
const user = useUserStore();
defineProps([]);
defineEmits([]);

const activeTab = ref("");
const tabsObj = [
  {
    visibleName: "Overview",
    svg: personOutline,
    svg_active: personActive,
    url: "",
    id: 0,
  },
  {
    visibleName: "Stats",
    svg: statsOutline,
    svg_active: statsActive,
    url: "/stats",
    id: 1,
  },
  {
    visibleName: "Delivery",
    svg: cubeOutline,
    svg_active: cubeActive,
    url: "/delivery",
    id: 2,
  },
  {
    visibleName: "Personal data",
    svg: fingerPrintOutline,
    svg_active: fingerPrintActive,
    url: "/personal",
    id: 3,
  },
  {
    visibleName: "Security",
    svg: shieldOutline,
    svg_active: shieldActive,
    url: "/security",
    id: 4,
  },
];

function toggleTheme() {
  switch (localStorage.getItem("theme")) {
    case "dark":
      localStorage.removeItem("theme");
      document.body.classList.remove("dark");
      break;
    case "light":
      localStorage.setItem("theme", "dark");
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      break;
    default:
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
      document.body.classList.add("light");
  }
}

activeTab.value = route.params.tab || "";
</script>

<template>
  <div id="account-content" v-if="user.isAuthenticated === true">
    <aside>
      <ul id="account-section-tabs">
        <li
          v-for="tabItem in tabsObj"
          class="account-section-tab"
          :key="tabItem.id"
        >
          <RouterLink
            :to="'/account' + tabItem.url"
            exact-active-class="active"
            active-class="active"
          >
            <div class="account-section-tab__content">
              <div class="account-section-tab__content__left">
                <div class="svg-holder">
                  <div class="onactive">
                    <component v-bind:is="tabItem.svg_active"></component>
                  </div>
                  <div class="nonactive">
                    <component v-bind:is="tabItem.svg"></component>
                  </div>
                </div>
                <span>{{ tabItem.visibleName }}</span>
              </div>
              <div class="account-section-tab__content__right"></div>
            </div>
          </RouterLink>
        </li>
        <li class="account-section-tab" @click="toggleTheme">
          <a>
            <div class="account-section-tab__content">
              <div class="account-section-tab__content__left">
                <div class="svg-holder">
                  <div class="onactive">
                    <moonActive />
                  </div>
                  <div class="nonactive">
                    <moonOutline />
                  </div>
                </div>
                <span>Toggle theme</span>
              </div>
              <div class="account-section-tab__right">
                <span id="account-theme-label" class="onDarkTheme">dark</span>
                <span id="account-theme-label" class="onLightTheme">light</span>
                <span id="account-theme-label" class="onAutoTheme">auto</span>
              </div>
            </div>
          </a>
        </li>
        <li class="account-section-tab" @click="user.LogOut">
          <a>
            <div class="account-section-tab__content">
              <div class="account-section-tab__content__left">
                <div class="svg-holder">
                  <div class="onactive">
                    <logoutActive />
                  </div>
                  <div class="nonactive">
                    <logoutOutline />
                  </div>
                </div>
                <span>Logout</span>
              </div>
              <div class="account-section-tab__right"></div>
            </div>
          </a>
        </li>
      </ul>
    </aside>
    <main id="account-section-holder">
      <RouterView />
    </main>
  </div>
  <div id="auth-content" v-if="user.isAuthenticated !== true">
    <form @submit.prevent="user.SignIn">
      <input name="email" type="email" placeholder="Email" />
      <input name="pass" type="password" placeholder="Password" />
      <button type="submit">Sign in</button>
    </form>
    <form @submit.prevent="user.SignUp">
      <input name="email" type="email" placeholder="Email" />
      <input name="pass" type="password" placeholder="Password" />
      <button type="submit">Sign up</button>
    </form>
  </div>
</template>

<style>
#account-content,
#auth-content {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
}
#auth-content {
  flex-direction: column;
}
#account-section-holder {
  padding: 8px;
}
aside {
  width: 300px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding: 8px;
}
main {
  width: 100%;
}
#account-section-tabs {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 0;
  position: sticky;
  top: 72px;
  background: var(--main-bg-color);
  z-index: 100;
  list-style: none;
  padding: 0;
}

.account-section-tab {
  width: 100%;
  height: 48px;
  display: block;
  flex-shrink: 0;
  font-size: 0.9rem;
  overflow: hidden;
}
.account-section-tab a {
  width: 100%;
  height: 100%;
  display: block;
  padding: 2px 0;
  position: relative;
}
.account-section-tab__content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  color: var(--tabs-color);
  border-radius: 6px;
}
.account-section-tab a:hover .account-section-tab__content {
  background-color: var(--tabs-bg-hover);
}
.account-section-tab__content__left {
  width: auto;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.account-section-tab .svg-holder {
  width: 24px;
  height: 24px;
  display: block;
  flex-shrink: 0;
  margin-right: 12px;
}
.account-section-tab svg {
  width: 100%;
  height: 100%;
  color: inherit;
}
.account-section-tab .onactive,
.account-section-tab a.active .nonactive {
  display: none;
}

.account-section-tab a.active .account-section-tab__content {
  /* border-bottom: 2px solid #005bff; */
  background-color: #464a4c;
  color: #fff;
  text-decoration: none;
}
.account-section-tab a.active .onactive,
.account-section-tab .nonactive {
  display: block;
}
#auth-content form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
#auth-content input,
#auth-content button {
  height: 48px;
  max-width: 327px;
  width: 100%;
  border-radius: 8px;
  padding: 8px 16px;
}
#auth-content button {
  border-radius: 48px;
}
@media screen and (min-width: 768px) {
  .account-section-tab a:not(.account-section-tab a.active):hover {
    /* border-bottom: 2px solid #005bff; */
    text-decoration: none;
  }
}
@media screen and (max-width: 768px) {
  #account-section-tabs {
    top: 60px;
  }
  #account-content {
    flex-direction: column;
  }
}
</style>
