<template>
    <div class="tueble-component">
        <table :class="tableClass">
          <caption v-if="showCaption"></caption>
          <thead>
            <tr>
              <tu-column-header v-for="(column, index) in columns" :key="column.id" 
                :column="column" :column-index="index" @sortUpdate="updateSortColumn">
              </tu-column-header>
            </tr>
          </thead>
          <tbody>
            <tu-row v-for="(row, index) in filteredAndSortedData" :key="row._id"
              :columns="columns" :row-index="index" :row-data="row"></tu-row>
          </tbody>
        </table>
        <div style="display:none;">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Column from "../classes/Column";
import RowComponent from "./RowComponent.vue";
import ColumnHeaderComponent from "./ColumnHeaderComponent.vue";
export default {
  components: {
    "tu-row": RowComponent,
    "tu-column-header": ColumnHeaderComponent
  },
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
    },
    /**
     * Order the table by a column
     * @type {String}
     */
    defaultSortBy: {
      required: false,
      type: String
    }
  },
  data: () => ({
    columns: [],
    orderBy: null
  }),
  mounted() {
    const vueColumns = this.$children.filter(
      el => el.$options.name == "tu-column"
    );
    this.columns = vueColumns.map(column => new Column(column));

    if (this.defaultSortBy) {
      this.orderBy = this.defaultSortBy;
    }
  },
  computed: {
    filteredAndSortedData: function() {
      let data = this.data;
      let orderBy = this.orderBy;
      let order = 1;

      if (orderBy) {
        data = data.slice().sort(function(a, b) {
          a = a[orderBy];
          b = b[orderBy];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }

      let rowId = 0;
      data = data.map(row => {
        row._id = rowId++;
        return row;
      });

      return data;
    }
  },
  methods: {
    updateSortColumn: function(columnIndex) {
      for (let i = 0; i < this.columns.length; i++) {
        if (i == columnIndex) {
          if (this.columns[i].isActive)
            this.columns[i].sortOrder = this.columns[i].sortOrder * -1;
          this.columns[i].isActive = true;
        } else {
          this.columns[i].isActive = false;
        }
      }
    }
  }
};
</script>
