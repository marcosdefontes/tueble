// Import vue components
import * as components from './components/index';
import HighlightText from './filters/HighlightText';
// install function executed by Vue.use()
function install(Vue) {
   if (install.installed) return;
   install.installed = true;
   Object.keys(components).forEach((componentName) => {

      const compName = components[componentName].name ?
         components[componentName].name : componentName;
      Vue.component(compName, components[componentName]);
   });
   Vue.filter('highlight', HighlightText);
}

// Create module definition for Vue.use()
const plugin = {
   install,
};

// To auto-install when vue is found
/* global window global */
let GlobalVue = null;
if (typeof window !== 'undefined') {
   GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
   GlobalVue = global.Vue;
}
if (GlobalVue) {
   GlobalVue.use(plugin);
}

// Default export is library as a whole, registered via Vue.use()
export default plugin;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from './components/index';
export { HighlightText };
