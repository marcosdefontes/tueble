<template>
  <div v-if="false"></div>
</template>

<script>
export default {
  name: 'filter-by-domain',
  props: {
    /**
     * Set of elements to be checked in the column provided
     * @required true
     * @type {Array}
     */
    filterBy: {
      required: true,
      type: Array,
      default: ''
    },
    /**
     * Name of the column to be searched for
     * @required true
     * @type {String}
     */
    filterColumn: {
      required: true,
      type: String
    }
  },
  watch: {
    filterBy() {
      this.$parent.$emit('filter-by-domain-changed', this.filterBy);
    }
  }
};
</script>
