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
        
        if (vm.admin.username === '' || vm.admin.password === '') {
            vm.message = 'Empty Fields, Please enter a username and a password.';
        } else {
            console.log('adminRegister sending to server ->', vm.user);
            $http.post('/register/admin', vm.admin).then(function (response) {
                console.log('admin registration successful');
                vm.message = 'Registered admin Successfully!';
            }).catch(function (response) {
                console.log('Registration error: ', response);
                vm.message = 'Registration Error, Please try again.';
            }); // end catch
        } // end else

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
                vm.message = 'Registered org Successfully!';
            }).catch( function(response) {
                console.log('Registration error: ', response);
                vm.message = 'Registration Error, Please try again.';
            }); // end catch
        } // end else

    }; // end orgRegister

    // allows admin users to login
    vm.adminLogin = function () {
        console.log('in adminLogin');
        
        if (vm.admin.username === '' || vm.admin.password === '') {
            vm.message = 'Missing Credentials!, please enter your username and password to login';
        } else {
            $http.post('/', vm.admin).then(function (response) {
                if (response.data.username) {
                    console.log('login success: ', response.data);

                    // clear inputs
                    vm.admin.username = null;
                    vm.admin.password = null;

                    console.log('response.data.isadmin', response.data.isadmin);
                    // if the user is an admin redirect to admin view
                    if (response.data.isadmin) {
                        vm.message = 'admin user detected';
                    } // end if
                } else {
                    console.log('login post failure: ', response);
                    vm.message = 'Incorrect Credentials!, please try again';
                } // end else
            }).catch(function (response) {
                console.log('login catch - failure: ', response);
                vm.message = 'Incorrect Credentials!, please try again';
            }); // end catch
        } // end else

    }; // end adminLogin

    // allows agency users to login
    vm.orgLogin = function () {
        console.log('in orgLogin');
        
        if (vm.user.username === '' || vm.user.password === '') {
            vm.message = 'Missing Credentials!, please enter your username and password to login';
        } else {
            $http.post('/', vm.user).then( function(response) {
                if (response.data.username) {
                    console.log('login success: ', response.data);
                    
                    // clear inputs
                    vm.user.username = null;
                    vm.user.password = null;
                  
                    console.log('response.data.isadmin', response.data.isadmin);
                    // if the user is an admin redirect to admin view
                    if (response.data.isadmin) {
                        vm.message = 'admin user detected';
                    } // end if
                } else {
                    console.log('login post failure: ', response);
                    vm.message = 'Incorrect Credentials!, please try again';
                } // end else
            }).catch( function(response) {
                console.log('login catch - failure: ', response);
                vm.message = 'Incorrect Credentials!, please try again';
            }); // end catch
        } // end else

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