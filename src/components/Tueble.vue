<template>
    <div class="tueble-component">
        <table :class="tableClass">
          <caption v-if="showCaption"></caption>
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
     * Defines if caption will be displayed
     * @type {Boolean}
     * @default true
     */
    showCaption: {
      required: false,
      type: Boolean,
      default: true
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
