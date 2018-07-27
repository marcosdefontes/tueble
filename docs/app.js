import Vue from 'vue';
import Tueble from '../src/components/Tueble';

console.log(Tueble);

new Vue({
    el: '#app',

    components: {
        'tu-table': Tueble,
    },
});