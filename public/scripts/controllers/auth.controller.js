/*
This controller is for the auth view.
- currently this controller is for testing only
- the controller may be used later or integrated with another controller
*/
myApp.controller('AuthController', function ($location) {
    console.log('in AuthController');
    var vm = this;

    // user object for agency/organization login
    vm.user = {
        username: '',
        password: ''
    }; // end user object

    // admin user object for admin login
    vm.admin = {
        username: '',
        password: ''
    }; // end admin object


    // temporary - allows admins to create a new admin login
    vm.adminRegister = function() {

    }; // end adminRegister

    // allows agencies to create a new login
    vm.orgRegister = function () {

    }; // end orgRegister

    // allows admin users to login
    vm.adminLogin = function () {

    }; // end adminLogin

    // allows agency users to login
    vm.orgLogin = function () {

    }; // end orgLogin

    /************** $http **************/



}); // end HomeController