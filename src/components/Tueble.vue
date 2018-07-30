<template>
    <div class="tueble-component">
        <table :class="tableClass">
          <caption v-if="showCaption"></caption>
          <thead>
            <tr>
              <th v-for="column in columns" :key="column.id">{{column.label}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in filteredAndSortedData" :key="row._id">
              <td v-for="column in columns" :key="column.id">
                {{ row[column.show] }}
              </td>
            </tr>
          </tbody>
        </table>
        <div style="display:none;">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Column from "../classes/Column";
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
  data: () => ({
    columns: []
  }),
  mounted() {
    const vueColumns = this.$children.filter(
      el => el.$options.name == "tu-column"
    );
    this.columns = vueColumns.map(column => new Column(column));
  },
  computed: {
    filteredAndSortedData: function() {
      let data = this.data;

      let rowId = 0;
      data = data.map(row => {
        row._id = rowId++;
        return row;
      });

      return data;
    }
  }
};
</script>
