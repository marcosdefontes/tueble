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
              :columns="columns" :row-index="index" :row-data="row" :filter-text="filterText"></tu-row>
          </tbody>
        </table>
        <div style="display:none;">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Column from "../classes/Column";
import TextFilter from "../classes/TextFilter";
import DomainFilter from "../classes/DomainFilter";
import RowComponent from "./RowComponent.vue";
import ColumnHeaderComponent from "./ColumnHeaderComponent.vue";
import filterEngine from "../FilterEngine";
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
     * Term used to filter the table. Applies only to columns with the
     * filterable property enabled.
     * @type {String}
     *
     */
    filterText: {
      required: false,
      type: String,
      default: ""
    },
    /**
     * Minimal length of the filter search field to filter the table
     * @type {Number}
     *
     */
    filterMinSize: {
      required: false,
      type: Number,
      default: 2
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
    domainFilters: [],
    orderBy: null,
    orderAscDesc: 1
  }),
  mounted() {
    this.columns = this.mapVueComponentsToObjects("tu-column", "Column");
    this.domainFilters = this.mapVueComponentsToObjects(
      "filter-by-domain",
      "DomainFilter"
    );

    if (this.defaultSortBy) {
      this.orderBy = this.defaultSortBy;
      this.setDefaultColumn(this.defaultSortBy);
    }

    this.$on("filter-by-domain-changed", function(msg) {
      this.domainFilters = this.mapVueComponentsToObjects(
        "filter-by-domain",
        "DomainFilter"
      );
    });
  },
  computed: {
    filteredAndSortedData: function() {
      let data = this.data;
      let orderBy = this.orderBy;
      let order = this.orderAscDesc;
      let textFilter = new TextFilter(this.filterText, this.filterMinSize);
      let domainFilters = this.domainFilters;

      return filterEngine.filterArray(
        data,
        orderBy,
        order,
        this.columns,
        textFilter,
        domainFilters
      );
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
    },
    mapVueComponentsToObjects: function(vueName, className) {
      const classesMapping = {
        Column: Column,
        DomainFilter: DomainFilter
      };
      const vueComponents = this.$children.filter(
        el => el.$options.name == vueName
      );
      return vueComponents.map(
        component => new classesMapping[className](component)
      );
    }
  }
};
</script>
