/*
This controller is for testing admin related functions
- 
*/
myApp.controller('TestAdmin', function ($http, AdminService) {
    console.log('in TestAdminController');
    var vm = this;

    // object to hold filtered org data
    vm.orgs = {
        pending:[],
        notPending:[]
    }; // end orgs



    /************** $http **************/

    vm.getOrgs = function() {
        console.log('in getOrgd');
        AdminService.getOrgs();
    }; // end getOrgs

     /************** on page load **************/

    vm.getOrgs();


});