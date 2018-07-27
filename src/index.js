import Tueble from './components/Tueble.vue';

export default {
  install(Vue, options = {}) {
    Vue.component('tu-table', Tueble);
  },
};

export {
  Tueble
};