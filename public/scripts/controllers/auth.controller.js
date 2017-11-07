/*
This controller is for the auth view.
- currently this controller is for testing only
- the controller may be used later or integrated with another controller
*/
myApp.controller('AuthController', function ($http, AuthService) {
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

    // holds data from getUser
    vm.getUserObj = {};


    /************** $http **************/

    // temporary - allows admins to create a new admin login
    vm.adminRegister = function () {
        console.log('in adminRegister');
        if (vm.admin.username === '' || vm.admin.password === '') {
            alert('Empty Fields, Please enter a username and a password.');
        } else {
            console.log('adminRegister sending to server ->', vm.admin);
            AuthService.adminRegister(vm.admin);
        } // end else
    }; // end adminRegister

    // allows agencies to create a new login
    vm.orgRegister = function () {
        console.log('in orgRegister');
        if (vm.user.username === '' || vm.user.password === '') {
            alert('Empty Fields, Please enter a username and a password.');
        } else {
            console.log('orgRegister sending to service ->', vm.user);
            AuthService.orgRegister(vm.user);
        } // end else
    }; // end orgRegister

    // allows admin users to login 
    vm.adminLogin = function () {
        console.log('in adminLogin');
        if (vm.admin.username === '' || vm.admin.password === '') {
            alert('Missing Credentials!, please enter your username and password to login');
        } else {
            // passes data collected from the input fields to the service
            AuthService.login(vm.admin);
            // clear inputs
            vm.admin.username = null;
            vm.admin.password = null;
        } // end else
    }; // end adminLogin

    // allows agency users to login
    vm.orgLogin = function () {
        console.log('in orgLogin');
        if (vm.user.username === '' || vm.user.password === '') {
            alert('Missing Credentials!, please enter your username and password to login');
        } else {
            // passes data collected from the input fields to the service
            AuthService.login(vm.user);
            // clear inputs
            vm.user.username = null;
            vm.user.password = null;
        } // end else
    }; // end orgLogin

    // logout admin and org users
    vm.logout = function () {
        console.log('in logout');
        AuthService.logout();
    }; // end adminLogout

    // gets user info from the server and logs it on client
    vm.getUser = function () {
        console.log('in getUser');
        // sets getUser to the current 
        // session info returned by service
        vm.getUser = AuthService.getUser();
    }; // end getUser


}); // end HomeController