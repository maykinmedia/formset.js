import Formset, { Formset as Formset2 } from '../src/formset.js';


describe('module', function() {
    it('should export a default', () => {
        expect(Formset).toBeTruthy();
    });

    it('should export a name', () => {
        expect(Formset2).toBeTruthy();
    });
});
