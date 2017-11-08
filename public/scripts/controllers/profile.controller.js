/*
This controller is for the agency/organization profile view.
- it will display the agency/org name
- a bio/description
- social media links
- website link
- have the ability for authenticated users to make edits and updates
*/

myApp.controller('ProfileController', function (OrgService, AuthService, $http) {
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

    // holds data from get USer
    vm.getUserObj = {
        email: '',
        id: '',
        isadmin: false
    }; // end getUserObj

    vm.orgLogin = AuthService.login(vm.user)

}); // end ProfileController