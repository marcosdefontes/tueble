new Vue({
   el: "#app",
   data: () => ({
      searchKey: '',
      names: [],
      tableData: [
         { firstName: 'John', birthday: '04/10/1940', songs: 72 },
         { firstName: 'Paul', birthday: '18/06/1942', songs: 70 },
         { firstName: 'George', birthday: '25/02/1943', songs: 22 },
         { firstName: 'Ringo', birthday: '07/07/1940', songs: 2 },
         { firstName: '', birthday: '07/07/1940', },
      ]
   }),

});
