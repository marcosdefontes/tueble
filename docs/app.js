import Vue from "vue";
import Tueble from "../src/components/Tueble";
import Column from "../src/components/Column";

new Vue({
  el: "#app",

  components: {
    "tu-table": Tueble,
    "tu-column": Column
  }
});