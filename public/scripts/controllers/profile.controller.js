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

    vm.displayProfile = function(id) {
        OrgService.getOrgProfile(id)
    };

    vm.loggedin = false;
    vm.editable = false;

    // object to hold organizations list
    vm.orgs = {};

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

    
    vm.orgLogin = function() {
        AuthService.login(vm.user);
        vm.loggedin = true;
        vm.displayProfile(vm.getUserObj.id);
        console.log("vm.getUserObj.id: ", vm.getUserObj.id);
    };

    vm.logout = function() {
        AuthService.logout()
        vm.loggedin = false;
    };

}); // end ProfileController