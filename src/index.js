import Tueble from './components/Tueble.vue';
import Column from "./components/ColumnComponent";

export default {
  install(Vue, options = {}) {
    Vue.component('tu-table', Tueble);
    Vue.component('tu-column', Column);
  },
};

export {
  Tueble,
  Column
};