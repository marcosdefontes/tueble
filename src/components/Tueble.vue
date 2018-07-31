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
          <tbody :class="tableBodyClass">
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
     * Classes of tbody (table) element.
     * @type {String}
     */
    tableBodyClass: {
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
    },
    /**
     * Order the table by a column
     * @type {String}
     */
    defaultSortOrder: {
      required: false,
      default: "asc",
      validator: function(value) {
        return ["asc", "desc"].includes(value);
      }
    }
  },
  data: () => ({
    columns: [],
    orderBy: null,
    orderAscDesc: 1
  }),
  mounted() {
    const vueColumns = this.$children.filter(
      el => el.$options.name == "tu-column"
    );
    this.columns = vueColumns.map(column => new Column(column));

    if (this.defaultSortBy) {
      this.orderBy = this.defaultSortBy;
      this.setDefaultColumn(this.defaultSortBy);
    }
  },
  computed: {
    filteredAndSortedData: function() {
      let data = this.data;
      let orderBy = this.orderBy;
      let order = this.orderAscDesc;

      if (orderBy) {
        // console.log(orderBy);
        data = data.slice().sort(function(a, b) {
          a = a[orderBy];
          b = b[orderBy];
          // console.log(`Comparando ${a} com ${b}`);
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
          this.orderBy = this.columns[i].show;
          this.orderAscDesc = this.columns[i].sortOrder;
        } else {
          this.columns[i].isActive = false;
        }
      }
    },
    setDefaultColumn: function(columnName) {
      this.columns.forEach(element => {
        if (element.show == columnName) {
          element.isActive = true;
          if (this.defaultSortOrder == "asc") {
            element.sortOrder = 1;
          }
          if (this.defaultSortOrder == "desc") {
            element.sortOrder = -1;
          }
          this.orderAscDesc = element.sortOrder;
        }
      });
    }
  }
};
</script>
