## ng-upload

The AngularJS documentation for the [input directive](https://docs.angularjs.org/api/ng/directive/input) reads:

> Note: Not every feature offered is available for all input types.
> Specifically, data binding and event handling via ng-model is
> unsupported for input[file].

`ng-upload` is a little shim to fill in for that omission.


### Instructions

Install like:

    npm install --save ng-upload

Include like (e.g., for a [browserify](https://github.com/substack/node-browserify) build):

    require('ng-upload');
    angular.module('myApp', [
      'ngUpload',
    ]);

Use like:

    <input type="file" ng-upload="uploaded_file = $file">

Or:

    <input type="file" ng-upload="handleUpload($files)" multiple>


### Explanation

* It exposes a `restrict: 'A'` directive named `ngUpload` which listens for the `change` event on the element.
* It compiles the value of the `ng-upload` attribute as a function, using `$parse`. It calls this function whenever the `change` event is triggered, using the current scope and the following context:

If `multiple` is not specified:

    {
      $event: <the jqLite-wrapped 'change' event>,
      $file: <the first element of the element's 'files' value>
    }

Or if `multiple` _is_ specified:

    {
      $event: <the jqLite-wrapped 'change' event>,
      $files: <all of the element's 'files' values>
    }


## License

Copyright 2015 Christopher Brown. [MIT Licensed](http://chbrown.github.io/licenses/MIT/#2015).
