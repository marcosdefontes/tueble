<template>
  <tr>
    <!-- <template v-for="column in columns">
            <td :key="column.id" :class="column.columnClass" v-if="column.index">{{ rowIndex+1 }}</td>
            <td :key="column.id" :class="column.columnClass" v-else>{{ rowData[column.show] }}</td>
    </template>-->
    <tu-cell
      v-for="column in columns"
      :key="column.id"
      :column="column"
      :row-data="rowData"
      :row-index="rowIndex"
      :text-search="filterText"
    ></tu-cell>
  </tr>
</template>
<script>
import CellComponent from './CellComponent.js';
export default {
  components: {
    'tu-cell': CellComponent
  },
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
