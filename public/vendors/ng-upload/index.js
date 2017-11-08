/*jslint browser: true */
function ngUploadDirective($parse) {
  return {
    restrict: 'A',
    compile: function(el, attrs) {
      var fn = $parse(attrs.ngUpload);
      return function(scope, element) {
        // the element we listen to inside the link function should not be the
        // element from the compile function signature; that one may match up
        // with the linked one, but maybe not, if this element does not occur
        // directly in the DOM, e.g., if it's inside a ng-repeat or ng-if.
        element.on('change', function(event) {
          scope.$apply(function() {
            var context = {$event: event};
            if (attrs.multiple) {
              context.$files = event.target.files;
            }
            else {
              context.$file = event.target.files[0];
            }
            fn(scope, context);
          });
        });
      };
    }
  };
}
exports.ngUploadDirective = ngUploadDirective;

if (typeof angular !== 'undefined') {
  angular.module('ngUpload', []).directive('ngUpload', ['$parse', ngUploadDirective]);
}
