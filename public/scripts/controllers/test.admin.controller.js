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
        all:[],
        pending: [],
        notPending: []
    }; // end orgs

    /************* Should be in admin controller ************/
    // filter org get into an array for non-pending orgs
    vm.notPendingOrgs = function (orgsArray) {
        console.log('in notPendingOrgs');
        return orgsArray.filter(function (org) {
            return org.has_password === true || org.email === null;
        }); // end return
    }; // end noPendingOrgs

    /************* Should be in admin controller ************/
    // filter org get into an array for pending orgs
    vm.pendingOrgs = function (orgsArray) {
        console.log('in pendingOrgs');
        return orgsArray.filter(function (org) {
            return org.has_password === false || org.email !== null;
        }); // end return
    }; // end noPendingOrgs



    /************** $http **************/

    /************* Should be in admin controller ************/
    // gets org info from server and builds arrays to admin view
    vm.getOrgs = function() {
        console.log('in getOrgd');
        vm.orgs.all = AdminService.getOrgs().then(function(){
            vm.orgs.pending = vm.pendingOrgs(vm.orgs.all);
            vm.orgs.notPending = vm.notPendingOrgs(vm.orgs.all);
        }); // end setting array values
    }; // end getOrgs

     /************** on page load **************/

    vm.getOrgs();


});