/*
This controller is for org registration
- collect org user's email and password
- update the org row in DB with credentials
- redirect to login view
*/
myApp.controller('RegistrationController', function (AuthService, OrgService, $routeParams, $location) {
    console.log('in RegistrationController');
    var vm = this;

    // org id from invite link
    vm.orgId = $routeParams.orgId;

    // org Object for holding 
    // user input and sending to DB
    vm.org = {};


    // creates boolean for NG-IF
    vm.showContent = function () {

    }; // end showContent
    


    /************** $http **************/

    // pass $routeParams to service to get org info on page load
    vm.getOrg = function () {
        console.log('in getOrg');
        OrgService.getOrgRegistration(vm.orgId).then(
            // org object to hold get response
            vm.org = OrgService.orgToRegister
        );// end get
    }; // end getOrg

    // captures user input and writes them to org row in DB
    // redirects to login view
    vm.orgRegister = function() {
        console.log('in orgRegister');
        // send org user inputs to service as an object
        AuthService.orgRegistration(vm.org).then(
            // then redirect to login view
            $location.path('/login')
        ); // end AuthService.orgRegister
    }; // ebd orgRegister


    /************** on page load **************/

    vm.getOrg($routeParams.orgId);

});