<template>
  <div v-if="false">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TuebleColumn',
  props: {
    /**
     * Sets which object's property to display
     * @type {String}
     */
    show: {
      type: String,
      required: false
    },
    /**
     * Sets the column as sortable
     * @type {Boolean}
     * @default true
     */
    sortable: {
      type: Boolean,
      default: true
    },
    /**
     * If true, the search text will be compared to the column contents
     * @type {Boolean}
     * @default true
     */
    filterable: {
      type: Boolean,
      default: true
    },
    /**
     * If true will display the row number
     * @type {Boolean}
     * @default false
     * @required: false
     */
    index: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * If true finds specified terms in your input text and adds HTML tag around them
     * @type {Boolean}
     * @default false
     * @required: false
     */
    highlight: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * Sets the text of the column header
     * @type {String}
     * @required true
     */
    label: {
      type: String,
      required: true
    },
    /**
     * Classes that will be added to column
     * @type {String}
     */
    columnClass: {
      type: String,
      default: ''
    },
    /**
     * Classes that will be added to column header
     * @type {String}
     */
    columnHeaderClass: {
      type: String,
      default: ''
    }
  }
};
</script>
