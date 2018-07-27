<template>
    <div>
        <table :class="tableClass">
        </table>
    </div>
</template>

<script>
export default {
  props: {
    /**
     * Data that will be used to render the table
     * @type {String}
     */
    data: {
      required: true,
      type: Array
    },
    /**
     * Classes of table element.
     * @type {String}
     */
    tableClass: {
      required: false,
      type: String
    }
  },
  data() {
    return {};
  }
};
</script>
