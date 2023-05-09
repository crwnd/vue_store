<script setup>
defineProps(["productObj", "bundleid"]);
defineEmits([]);
</script>

<template>
  <div id="good-specs" class="good-content__layout">
    <div class="good-specs__left">
      <dl v-if="productObj.isLoading === false">
        <div
          v-for="specGroup in productObj.bundles[parseInt(bundleid)].specs"
          :key="specGroup.name"
        >
          <h3>{{ specGroup.name }}</h3>
          <div
            class="good-content__specs-tab__specs-table__row"
            v-for="spec in specGroup.list"
            :key="spec.name"
          >
            <div class="left">
              <span class="prop-name">{{ spec.name }}</span>
              <div class="dots-divider">
                <div class="divider"></div>
              </div>
            </div>
            <div class="right">
              <RouterLink :to="spec.link" class="prop-val" v-if="spec.link">{{
                spec.value
              }}</RouterLink>
              <span class="prop-val" v-if="!spec.link">{{ spec.value }}</span>
            </div>
          </div>
        </div>
      </dl>
    </div>
    <div class="good-overview__right"></div>
  </div>
</template>

<style scoped>
#good-specs {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}

.good-specs__left,
.good-specs__right {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
}

.good-specs__left {
  padding-right: 24px;
}

.good-content__tab-content__specs-table__heading {
  padding: 0 8px;
}

.good-content__specs-tab__specs-table__row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 800px;
  padding: 0 8px;
}

.good-content__specs-tab__specs-table__row .left,
.good-content__specs-tab__specs-table__row .right {
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 8px;
  /* padding: 0 8px; */
}

.good-content__specs-tab__specs-table__row .right {
  padding-left: 16px;
}

.good-content__specs-tab__specs-table__row .prop-name {
  width: auto;
  line-height: 24px;
  padding-right: 6px;
}

.good-content__specs-tab__specs-table__row .left .dots-divider {
  width: 100%;
  display: inline-block;
  height: 24px;
  border-bottom: 1px dotted #d2d2d2;
}

.good-overview__left__sdesc__qchars__item .right,
.good-overview__left__sdesc__qchars__item .left {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.good-overview__left__sdesc__qchars__item .right {
  margin-left: 2px;
}

.good-overview__left__sdesc__qchars .center {
  display: none;
}

.good-overview__left__sdesc__qchars.altstyled .center {
  width: 100%;
  height: 24px;
  display: block;
  border-bottom: 1px dotted #a2a2a2;
  content: "";
  flex-grow: 1;
}

.good-overview__left__sdesc__qchars__item svg {
  width: 24px;
  height: 24px;
  margin-right: 12px;
  flex-shrink: 0;
}

.good-overview__left__sdesc__qchars__item .prop-name {
  /* color: #595959; */
  margin-right: 2px;
  line-height: 24px;
}

.good-overview__left__sdesc__qchars__item .prop-name::after {
  width: 100%;
}
@media screen and (max-width: 768px) {
  #good-specs {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .good-specs__left,
  .good-specs__right {
    width: 100%;
    justify-content: flex-start;
    overflow: hidden;
  }

  .good-specs__left {
    padding-right: 0;
  }
}
</style>
