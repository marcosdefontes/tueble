<template>
    <tr>
        <template v-for="column in columns">
            <td :key="column.id" v-if="column.index">{{ rowIndex+1 }}</td>
            <td :key="column.id" v-else>{{ rowData[column.show] }}</td>
        </template>
    </tr>
</template>
<script>
export default {
  props: {
    /**
     * Table row number
     * @required true
     * @type {Number}
     */
    rowIndex: {
      required: true,
      type: Number
    },
    /**
     * Columns to be rendered
     * @required true
     * @type {Object}
     */
    columns: {
      required: true,
      type: Array
    },
    /**
     * Data to be rendered as table row
     * @required true
     * @type {Number}
     */
    rowData: {
      required: true,
      type: Object
    }
  },
  computed: {
    showData: function() {
      return this;
    }
  }
};
</script>
