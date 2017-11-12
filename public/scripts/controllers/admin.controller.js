/*
This controller is for admin related functions
- will get all the org names and profile status
- will have a button to redirect to new year view
- will allow admin to invite org users
- will allow admin to deactivate org users
*/
myApp.controller('AdminController', function (AuthService, $http, $location, $mdDialog) {
    console.log('in AdminController');
    var vm = this;

    vm.loggedin = false;

    // admin user object for admin login
    vm.admin = {
        username: '',
        password: ''
    }; // end admin object 

    // holds data from get USer
    vm.getUserObj = {
        email: '',
        id: '',
        isadmin: true
    };

    vm.logout = function() {
        AuthService.logout();
        vm.loggedin = false;
    };

    vm.adminLogin = function() {
        AuthService.login();
        vm.loggedin = true;
    };

    /************** $http **************/
    


});
