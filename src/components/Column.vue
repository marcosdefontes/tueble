<template>
    <div v-if="false">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: "tu-column",
  props: {
    /**
     * Sets which object's property to display
     * @type {String}
     */
    show: {
      type: String,
      required: true
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
     * Classes that will be added to column
     * @type {String}
     */
    columnClass: {
      type: String,
      default: ""
    }
  }
};
</script>
