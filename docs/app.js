import Vue from 'vue';
import {
    TuebleComponent
} from '../src';

new Vue({
    el: '#app',

    components: {
        'tu-table': TuebleComponent,
    },
});