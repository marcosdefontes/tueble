export default class TextFilter {
   constructor(filterText, filterMinSize) {
      this.filterText = filterText
      this.filterMinSize = filterMinSize
   }

   isValid() {
      return typeof this.filterText == 'string' &&
         this.filterText.length >= this.filterMinSize
   }
}
