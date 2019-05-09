import {
   shallowMount,
   mount
} from '@vue/test-utils'
import Tueble from './Tueble.vue'


describe('Tueble', () => {
   it('is vue instance', () => {
      const wrapper = shallowMount(Tueble, {
         propsData: {
            data: []
         }
      });

      expect(wrapper.name()).toBe('tu-table');
      expect(wrapper.isVueInstance()).toBeTruthy()
   })
})
