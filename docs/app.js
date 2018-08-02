import Vue from "vue";
import Tueble from "../src/components/Tueble";
import Column from "../src/components/ColumnComponent";
import FilterByDomain from "../src/components/FilterByDomain";
import FilterByText from "../src/components/FilterByText";

new Vue({
  el: "#app",

  data: () => ({
    searchKey: ''
  }),

  components: {
    "tu-table": Tueble,
    "tu-column": Column,
    'filter-by-domain': FilterByDomain,
    'filter-by-text': FilterByText
  }
});