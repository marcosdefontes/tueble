import {
   pick
} from '../helper';

export default class DomainFilter {
   constructor(vueColumnComponent) {
      const properties = pick(vueColumnComponent, [
         'filterBy', 'filterColumn'
      ]);

      for (const property in properties) {
         this[property] = vueColumnComponent[property];
      }
   }

   isValid() {
      return this.filterBy.constructor === Array &&
         this.filterBy.length > 0 &&
         typeof this.filterColumn == 'string'
   }
}
