import Vue from "vue";
import Tueble from "../src/components/Tueble";
import Column from "../src/components/ColumnComponent";
import FilterByDomain from "../src/components/FilterByDomain";
import highlight from '../src/filters/HighlightText.js';

new Vue({
  el: "#app",

  filters: {
    highlight
  },

  data: () => ({
    searchKey: ''
  }),

  components: {
    "tu-table": Tueble,
    "tu-column": Column,
    'filter-by-domain': FilterByDomain,
  }
});