<template>
    <div v-if="false"></div>
</template>

<script>
export default {
  name: "filter-by-text",
  props: {
    filterBy: {
      required: true,
      type: String,
      default: ""
    },
    filterMinSize: {
      required: false,
      type: Number,
      default: 2
    }
  }
};
</script>
