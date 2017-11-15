/*
This controller is for testing admin related functions
- 
*/
myApp.controller('TestAdmin', function (AdminService, NodeMailerService) {
    console.log('in TestAdminController');
    var vm = this;

    /************* Should be in admin controller ************/
    // object to hold filtered org data
    vm.orgs = {
        //all: AdminService.orgs.all,
        pending: [],
        notPending: []
    }; // end orgs

    vm.inviteMessage = 'Hello, please follow the link below to create a username and password for your organization.';

    /************* Should be in admin controller ************/
    // filter org get into an array for non-pending orgs
    vm.notPendingOrgs = function () {
        console.log('in notPendingOrgs');
        return vm.orgs.all.filter(function (org) {
            return org.has_password === true || org.has_email === false;
        }); // end return
    }; // end noPendingOrgs

    /************* Should be in admin controller ************/
    // filter org get into an array for pending orgs
    vm.pendingOrgs = function () {
        console.log('in pendingOrgs');
        return vm.orgs.all.filter(function (org) {
            return org.has_password === false && org.has_email === true;
        }); // end return
    }; // end noPendingOrgs



    /************** $http **************/

    /************* Should be in admin controller ************/
    // gets org info from server and builds arrays to admin view
    vm.getOrgs = function() {
        console.log('in getOrgs');
        AdminService.getOrgs().then(function(){
            vm.orgs.all = AdminService.orgs.all;
            // if the get works and builds org.all array 
            if(vm.orgs.all.length > 0) {
                vm.orgs.notPending = vm.notPendingOrgs();
                vm.orgs.pending = vm.pendingOrgs();
            } // end if
        }); // end setting array values
    }; // end getOrgs

    // invite an organization to create a profile
    // email the user with a unique link to register
    // add their email to the DB and set invited to true
    vm.inviteOrg = function (email, message, orgId) {
        console.log('in inviteOrg');
        // pass client side input to service
        NodeMailerService.inviteOrg(email, message, orgId);
    }; // end inviteOrg

    // deny a user invite or deactivate an org user
    // removes email and password from DB
    // sets invited to false
    vm.denyOrg = function () {
        console.log('in denyOrg');
        AdminService.denyOrg();
    }; // end denyOrg

     /************** on page load **************/

    vm.getOrgs();


});