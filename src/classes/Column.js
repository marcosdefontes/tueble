import {
   pick
} from '../helper';

export default class Column {
   constructor(vueColumnComponent) {
      const properties = pick(vueColumnComponent, [
         'show', 'sortable', 'filterable', 'columnClass', 'label', 'index', 'highlight', 'columnHeaderClass'
      ]);

      for (const property in properties) {
         this[property] = vueColumnComponent[property];
      }

      if (this.index) {
         this.sortable = false
         this.filterable = false
         this.highlight = false
      }

      this.isActive = false;
      this.sortOrder = 1;
      this.template = vueColumnComponent.$scopedSlots.default;
   }
}
