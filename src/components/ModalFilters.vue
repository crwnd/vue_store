<script setup>
import IconCloseOutline from "@/assets/svgs/close-outline.svg";
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<template>
  <div
    id="modal-filters-window"
    class="modal-window modalable"
    :class="{ hidden: modelValue !== 'filtersModal' }"
    @click="$emit('update:modelValue', undefined)"
  >
    <div id="modal-filters" class="modal-content" @click.stop="">
      <div id="modal-filters__header" class="modal-content__header">
        <h2 id="modal-filters__header__title">Filters</h2>
        <button
          id="modal-filters__header__close"
          class="close-modal modal-content__header__close"
          @click="$emit('update:modelValue', undefined)"
        >
          <IconCloseOutline />
        </button>
      </div>
      <p>modal content</p>
    </div>
  </div>
</template>

<style></style>
