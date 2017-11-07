/*
This controller is for the agency/organization profile view.
- it will display the agency/org name
- a bio/description
- social media links
- website link
- have the ability for authenticated users to make edits and updates
*/

myApp.controller('ProfileController', function (OrgService, $http) {
    console.log('in ProfileController');
    var vm = this;

    // object to hold organizations list
    vm.orgs = {};

    vm.getOrgs = function () {
        console.log('in getOrgs');
        OrgService.getOrgs();
    }; // end getOrgs

    vm.getOrgs();

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

    // holds data from get USer
    vm.getUserObj = {
        email: '',
        id: '',
        isadmin: false
    }; // end getUserObj


    /************** $http **************/

    // temporary - allows admins to create a new admin login
    vm.adminRegister = function () {
        console.log('in adminRegister');
        if (vm.admin.username === '' || vm.admin.password === '') {
            alert('Empty Fields, Please enter a username and a password.');
        } else {
            console.log('adminRegister sending to server ->', vm.admin);
            $http.post('/register/admin', vm.admin).then(function (response) {
                console.log('admin registration successful');
                alert('Registered admin Successfully!');
            }).catch(function (response) {
                console.log('Registration error: ', response);
                alert('Registration Error, Please try again.');
            }); // end catch
        } // end else
    }; // end adminRegister

    // allows agencies to create a new login
    vm.orgRegister = function ($event) {
        console.log('in orgRegister');
        if (vm.user.username === '' || vm.user.password === '') {
            alert('Empty Fields, Please enter a username and a password.');
        } else {
            console.log('orgRegister sending to server ->', vm.user);
            $http.post('/register/organization', vm.user).then(function (response) {
                console.log('user registration successful');
                alert('Registered org Successfully!');
            }).catch(function (response) {
                console.log('Registration error: ', response);
                alert('Registration Error, Please try again.');
            }); // end catch
        } // end else
    }; // end orgRegister

    // allows admin users to login 
    // using the same route as orgLogin 
    // and could be combined on the service if needed
    vm.adminLogin = function () {
        console.log('in adminLogin');
        if (vm.admin.username === '' || vm.admin.password === '') {
            alert('Missing Credentials!, please enter your username and password to login');
        } else {
            $http.post('/', vm.admin).then(function (response) {
                if (response.data.username) {
                    console.log('admin login success: ', response.data);
                    // clear inputs
                    vm.admin.username = null;
                    vm.admin.password = null;
                    console.log('response.data.isadmin', response.data.isadmin);
                    // if the user is an admin redirect to admin view
                    if (response.data.isadmin) {
                        alert('admin user detected');
                    } // end if
                } else {
                    console.log('login post failure: ', response);
                    alert('Incorrect Credentials!, please try again');
                } // end else
            }).catch(function (response) {
                console.log('login catch - failure: ', response);
                alert('Incorrect Credentials!, please try again');
            }); // end catch
        } // end else
    }; // end adminLogin

    // allows agency users to login
    // using the same route as adminLogin 
    // and could be combined on the service if needed
    vm.orgLogin = function () {
        console.log('in orgLogin');
        if (vm.user.username === '' || vm.user.password === '') {
            alert('Missing Credentials!, please enter your username and password to login');
        } else {
            $http.post('/', vm.user).then(function (response) {
                if (response.data.username) {
                    console.log('org login success: ', response.data);
                    // clear inputs
                    vm.user.username = null;
                    vm.user.password = null;
                    console.log('response.data.isadmin', response.data.isadmin);
                    // if the user is an admin redirect to admin view
                    if (response.data.isadmin) {
                        alert('admin user detected');
                    } // end if
                } else {
                    console.log('login post failure: ', response);
                    alert('Incorrect Credentials!, please try again');
                } // end else
            }).catch(function (response) {
                console.log('login catch - failure: ', response);
                alert('Incorrect Credentials!, please try again');
            }); // end catch
        } // end else
    }; // end orgLogin

    // logout admin and org users
    vm.logout = function () {
        console.log('in logout');
        $http.get('/auth/logout').then(function (response) {
            console.log('logged out');
        }); // end GET
    }; // end adminLogout

    // gets user info from the server and logs it on client
    vm.getUser = function () {
        console.log(' in getUser');
        $http.get('/auth').then((response) => {
            console.log('/auth response.data ', response.data);
            // if the user has a current session on the server
            if (response.data.username) {
                // set these values
                vm.getUserObj.email = response.data.email;
                vm.getUserObj.id = response.data.id;
                vm.getUserObj.isadmin = response.data.isadmin;
            } else {
                console.log('getUser failed', response);
            } // end else
        }); // end auth GET
    }; // end getUser

}); // end ProfileController