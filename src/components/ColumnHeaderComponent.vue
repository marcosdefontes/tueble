<template>
    <th :class="column.columnHeaderClass">{{column.label}}</th>
</template>
<script>
export default {
  props: {
    /**
     * Column object
     * @required true
     * @type {Number}
     */
    column: {
      required: true,
      type: Object
    }
  }
};
</script>
