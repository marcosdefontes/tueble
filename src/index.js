import TuebleComponent from './TuebleComponent.vue';

export default {
  install(Vue, options = {}) {      
    Vue.component('tu-table', TuebleComponent);
  },
};

export { TuebleComponent };