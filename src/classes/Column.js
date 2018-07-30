import { 
    pick
} from '../helper';

export default class Column {
    constructor(vueColumnComponent) {
        const properties = pick(vueColumnComponent, [
            'show', 'sortable', 'columnClass', 'label'
        ]);

        for (const property in properties) {
            this[property] = vueColumnComponent[property];
        }
    }
}