/*
This controller is for testing admin related functions
- 
*/
myApp.controller('TestAdmin', function (AdminService) {
    console.log('in TestAdminController');
    var vm = this;

    /************* Should be in admin controller ************/
    // object to hold filtered org data
    vm.orgs = {
        //all: AdminService.orgs.all,
        pending: [],
        notPending: []
    }; // end orgs

    /************* Should be in admin controller ************/
    // filter org get into an array for non-pending orgs
    vm.notPendingOrgs = function () {
        console.log('in notPendingOrgs');
        return vm.orgs.all.filter(function (org) {
            return org.has_password === true || org.email === null;
        }); // end return
    }; // end noPendingOrgs

    /************* Should be in admin controller ************/
    // filter org get into an array for pending orgs
    vm.pendingOrgs = function () {
        console.log('in pendingOrgs');
        return vm.orgs.all.filter(function (org) {
            return org.has_password === false || org.email !== null;
        }); // end return
    }; // end noPendingOrgs



    /************** $http **************/

    /************* Should be in admin controller ************/
    // gets org info from server and builds arrays to admin view
    vm.getOrgs = function() {
        console.log('in getOrgd');
        AdminService.getOrgs().then(function(){
            vm.orgs.all = AdminService.orgs.all;
            // if the get works and builds org.all array 
            if(vm.orgs.all.length > 0) {
                vm.orgs.pending = vm.pendingOrgs();
                vm.orgs.notPending = vm.notPendingOrgs();
            } // end if
        }); // end setting array values
    }; // end getOrgs

     /************** on page load **************/

    vm.getOrgs();


});