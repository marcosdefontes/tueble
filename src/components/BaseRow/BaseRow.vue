<template>
  <tr>
    <BaseCell
      v-for="column in columns"
      :key="column.id"
      :column="column"
      :row-data="rowData"
      :row-index="rowIndex"
      :text-search="filterText"
    ></BaseCell>
  </tr>
</template>
<script>
import BaseCell from '../BaseCell/BaseCell.js';
export default {
  name: 'BaseRow',
  components: { BaseCell },
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
    },
    /**
     * Term used to filter the table. Applies only to columns with the
     * filterable property enabled.
     * @type {String}
     *
     */
    filterText: {
      required: false,
      type: String,
      default: ''
    }
  },
  computed: {
    showData: function() {
      return this;
    }
  }
};
</script>
