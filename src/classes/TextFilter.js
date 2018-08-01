import { 
    pick
} from '../helper';

export default class TextFilter {
    constructor(component) {
        const properties = pick(component, [
            'filterBy',
        ]);

        for (const property in properties) {
            this[property] = component[property];
        }

    }
}