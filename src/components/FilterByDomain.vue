<template>
    <div v-if="false"></div>
</template>

<script>
export default {
  name: "filter-by-domain",
  props: {
    filterBy: {
      required: true,
      type: Array,
      default: ""
    },
    filterColumn: {
      required: true,
      type: String
    }
  },
  watch: {
    filterBy() {
      this.$parent.$emit("filter-by-domain-changed", this.filterBy);
    }
  }
};
</script>
