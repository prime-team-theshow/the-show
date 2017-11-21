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

    // object to hold filtered org data
    vm.orgs = {
        pending: [],
        notPending: []
    }; // end orgs

    vm.loggedin = false;

    // admin user object for admin login
    vm.admin = {
        username: '',
        password: ''
    }; // end admin object 

    // holds data from get User
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

    // filter org get into an array for non-pending orgs
    vm.notPendingOrgs = function () {
        console.log('in notPendingOrgs');
        return orgsArray.filter(function (org) {
            return org.has_password === true || org.email === null;
        }); // end return
    }; // end noPendingOrgs

    // filter org get into an array for pending orgs
    vm.pendingOrgs = function () {
        console.log('in pendingOrgs');
        return orgsArray.filter(function (org) {
            return org.has_password === false || org.email !== null;
        }); // end return
    }; // end noPendingOrgs

    /************** $http **************/
    
    // gets org info from server and builds arrays to admin view
    vm.getOrgs = function () {
        console.log('in getOrgd');
        AdminService.getOrgs().then(function () {
            vm.orgs.all = AdminService.orgs.all;
            // if the get works and builds org.all array 
            if (vm.orgs.all.length > 0) {
                vm.orgs.pending = vm.pendingOrgs();
                vm.orgs.notPending = vm.notPendingOrgs();
            } // end if
        }); // end setting array values
    }; // end getOrgs



    /************** on page load **************/

    vm.getOrgs();


});
