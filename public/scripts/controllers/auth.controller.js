/*
This controller is for the auth view.
- currently this controller is for testing only
- the controller may be used later or integrated with another controller
*/
myApp.controller('AuthController', function ($http, $location, $mdDialog) {
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

    vm.message = '';


    // temporary - allows admins to create a new admin login
    vm.adminRegister = function() {
        console.log('in adminRegister');
        

    }; // end adminRegister

    // allows agencies to create a new login
    vm.orgRegister = function ($event) {
        console.log('in orgRegister');

        if (vm.user.username === '' || vm.user.password === '') {
            vm.message = 'Empty Fields, Please enter a username and a password.';
        } else {
            console.log('orgRegister sending to server ->', vm.user);
            $http.post('/register/organization', vm.user).then( function(response) {
                console.log('user registration successful');
                vm.message = 'Registered Successfully!';
            }).catch( function(response) {
                console.log('Registration error: ', response);
                vm.message = 'Registration Error, Please try again.';
            }); // end catch
        } // end else

    }; // end orgRegister

    // allows admin users to login
    vm.adminLogin = function () {
        console.log('in adminLogin');
        

    }; // end adminLogin

    // allows agency users to login
    vm.orgLogin = function () {
        console.log('in orgLogin');
        

    }; // end orgLogin

    // logout admin user
    vm.adminLogout = function () {
        console.log('in adminLogout');
        

    }; // end adminLogout

    // logout agency user
    vm.orgLogout = function () {
        console.log('in orgLogout');
        

    }; // end orgLogout

    /************** $http **************/



}); // end HomeController