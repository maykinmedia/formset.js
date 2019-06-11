[![Build Status](https://travis-ci.org/maykinmedia/formset.js.svg?branch=master)](https://travis-ci.org/maykinmedia/formset.js)
[![Coverage Status](https://coveralls.io/repos/github/maykinmedia/formset.js/badge.svg?branch=master)](https://coveralls.io/github/maykinmedia/formset.js?branch=master)
[![Lintly](https://lintly.com/gh/maykinmedia/formset.js/badge.svg)](https://lintly.com/gh/maykinmedia/formset.js/)
[![Code Climate](https://codeclimate.com/github/maykinmedia/formset.js/badges/gpa.svg)](https://codeclimate.com/github/maykinmedia/formset.js/)
[![npm](https://img.shields.io/npm/dw/formset.js.svg)](https://github.com/maykinmedia/formset.js)
[![BCH compliance](https://bettercodehub.com/edge/badge/maykinmedia/formset.js?branch=master)](https://bettercodehub.com/)

[![NPM](https://nodei.co/npm/formset.js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/formset.js/)

# formset.js

> Generate Formsets like the Django admin in your own frontend.

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i formset.js --save
```

## Usage

```html
<!-- class="formset" is required to attach the javascript to the formset.  -->
<form class="formset" action="." method="POST">
    {% csrf_token %}

    {{ formset.management_form }}

    <!-- class="formset__body" is required to add the new forms in. -->
    <div class="formset__body">
        {% for form in formset.forms %}
            <!-- class="formset__container" is used to define the bounds of a single form. (for deletion) -->
            <div class="formset__container">
                {{ form.first_name }}
                {{ form.last_name }}
                {{ form.email }}
            </div>
        {% endfor %}
    </div>

    <!-- class="formset__template" is required to show what the template is. -->
    <template class="formset__template">
        <!-- class="formset__container" is used to define the bounds of a single form. (for deletion) -->
        <div class="formset__container">
            {{ formset.empty_form.first_name }}
            {{ formset.empty_form.last_name }}
            {{ formset.empty_form.email }}
        </div>
    </template>

    <!-- class="formset__add" is used to add a new form. -->
    <a href="#" class="button formset__add" data-formset-prefix="{{ formset.prefix }}" >{% trans 'Add user' %}</a>
    <!-- class="formset__add" is used to remove the last form in formset__body. -->
    <a href="#" class="button formset__remove" data-formset-prefix="{{ formset.prefix }}" >{% trans 'Remove user' %}</a>
</form>
<script>
    import Formset from 'formset.js';

    new Formset();
</script>
```

Required class names to make it work:
- `formset`: Makes this part usable with formset.js. All the following class names should be inside this container element.
- `formset__body`: Know where to append the new form (from the `formset_add` button)
- `formset__container`: Boundaries of the form. Used for deleting a form.
- `formset__template`: Where an empty template can be found.
- `formset__add`: The button/element to add the new form.
- `formset__remove`: The button/element to remove the last form from the `formset__body`

## Running tests

```sh
$ gulp build  // Make sure you test against the latest build
$ gulp lint   // Check for linting errors
$ gulp test   // Run the tests
```

## TODO

- Work with existing formsets. Handle proper deletion. (now only create views are supported.)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/maykinmedia/formset.js/issues).

## Author

**Maykin Media**

* [maykinmedia.nl](https://www.maykinmedia.nl/)
* [github/maykinmedia](https://github.com/maykinmedia)
* [twitter/maykinmedia](http://twitter.com/maykinmedia)

## License

Copyright © 2016 [Maykin Media](https://www.maykinmedia.nl/)
Licensed under the MIT license.
