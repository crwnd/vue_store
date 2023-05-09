<script setup></script>
<script>
export default {
  name: "ProductOverview",
  components: {},
  methods: {
    clearLocalstorage() {
      localStorage.clear();
    },
  },
};
</script>
<template>
  <button @click="clearLocalstorage">Clear localStorage</button>
</template>
