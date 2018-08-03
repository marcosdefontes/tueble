import Tueble from './components/Tueble.vue';
import Column from "./components/ColumnComponent";
import FilterByDomain from "./components/FilterByDomain";


export default {
  install(Vue, options = {}) {
    Vue.component('tu-table', Tueble);
    Vue.component('tu-column', Column);
    Vue.component('filter-by-domain', FilterByDomain);

    Vue.filter(highlight, require('./filters/HighlightText.js'));
  },
};

export {
  Tueble,
  Column,
  FilterByDomain
};