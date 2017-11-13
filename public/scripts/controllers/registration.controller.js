/*
This controller is for org registration
- collect org user's email and password
- update the org row in DB with credentials
- redirect to login view
*/
myApp.controller('RegistrationController', function (AuthService, $http, $location, $mdDialog, $routeParams, OrgService) {
    console.log('in RegistrationController');
    var vm = this;

    // org id from invite link
    vm.orgId = $routeParams.orgId;


    /************** $http **************/

    // pass $routeParams to service to get org info on page load
    vm.getOrg = function () {
        console.log('in getOrg');
        OrgService.getOrgRegistration(vm.orgId).then(
            // org object to hold get response
            vm.org = OrgService.orgToRegister
        );// end get
    }; // end getOrg


    /************** on page load **************/

    vm.getOrg($routeParams.orgId);

});