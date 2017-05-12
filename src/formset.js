/**
 * Formset module
 * Contains logic for generating django formsets
 * @module
 */
import toArray from 'arrayify';
import BEM from 'bem.js';


const BLOCK_FORMSET = 'formset';

const ELEMENT_BODY = 'body';
const ELEMENT_TEMPLATE = 'template';
const ELEMENT_ADD = 'add';
const ELEMENT_REMOVE = 'remove';

const FORMSET = BEM.getBEMNode(BLOCK_FORMSET);
const FORMSET_BODY = BEM.getBEMNode(BLOCK_FORMSET, ELEMENT_BODY);
const TEMPLATE = BEM.getBEMNode(BLOCK_FORMSET, ELEMENT_TEMPLATE);
const ADD = BEM.getBEMNode(BLOCK_FORMSET, ELEMENT_ADD);
const REMOVE = BEM.getBEMNode(BLOCK_FORMSET, ELEMENT_REMOVE);

const MATCH_FORM_IDS = /(id|for|name)="(.+?)"/g;
const PREFIX_PLACEHOLDER = '__prefix__';


/**
 * Formset class
 * Contains logic for the add member form
 * @class
 */
class Formset {
    /**
     * Constructor method
     * Gets called when class get instantiated
     */
    constructor() {
        this.setUpAddForm();
        this.setUpRemoveForm();
        this.updateButton();
    }

    /**
     * Binds ADD click to this.addForm()
     */
    setUpAddForm() {
        ADD.addEventListener('click', (e) => {
            e.preventDefault();
            this.addForm();
        });
    }

    /**
     * Binds REMOVE click to this.removeForm()
     */
    setUpRemoveForm() {
        REMOVE.addEventListener('click', (e) => {
            e.preventDefault();
            this.removeForm();
        });
    }

    /**
     * Creates a new form based on TEMPLATE
     * Updates the id's of the form to unique values
     * Applies styling to fake elements (checkboxes, radio buttons, datepicker)
     */
    addForm() {
        // Creates a new form based on TEMPLATE
        let template = document.importNode(TEMPLATE.content, true);
        FORMSET_BODY.appendChild(template);
        let form = FORMSET_BODY.children[FORMSET_BODY.children.length -1];

        // Updates the id's of the form to unique values
        form.innerHTML = form.innerHTML.replace(MATCH_FORM_IDS, this.updateMatchedId.bind(this, form));

        let index = FORMSET_BODY.children.length;
        FORMSET.querySelector('[name="form-TOTAL_FORMS"]').value = index;
        this.updateButton();
    }

    /**
     * Callback function for replacing ids in form
     * Replaces PREFIX_PLACEHOLDER with index of form
     * @param {HTMLFormElement} form The form we're replacing id's for
     * @param {string} match The string matching MATCH_FORM_IDS
     * @param {string} attr (Capturing group) the matched attribute
     * @param {string} id (Capturing group) the value of the attr
     * @returns {string} An html attribute/value pair with PREFIX_PLACEHOLDER replaced
     */
    updateMatchedId(form, match, attr, id) {  // jshint unused:false
        let index = toArray(FORMSET_BODY.children).indexOf(form);
        id = id.replace(PREFIX_PLACEHOLDER, index);
        return `${attr}="${id}"`;
    }

    /**
     * Removes the last form from FORMSET_BODY
     */
    removeForm() {
        let index = FORMSET_BODY.children.length -1;
        let child = FORMSET_BODY.children[index];

        if (child) {
            FORMSET_BODY.removeChild(child);
        }

        FORMSET.querySelector('[name="form-TOTAL_FORMS"]').value = index;
        this.updateButton();
    }

    updateButton() {
        let index = FORMSET_BODY.children.length;
        if(index === 1) {
            REMOVE.classList.add('button--hidden');
        } else {
            REMOVE.classList.remove('button--hidden');
        }
    }
}


export default Formset;
export { Formset };
