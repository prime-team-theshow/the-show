/*
This controller is for the home view.
- it will do some things
- and some other things
*/

myApp.controller('HomeController', function (OrgService, $location) {
    console.log('in HomeController');
    var vm = this;

    vm.pageTurn = function() {
        $location.path('/winners/2017');
    }
}); // end HomeController