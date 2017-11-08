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

    vm.orgProfileObject = OrgService.orgProfileObj;

    vm.displayProfile = function() {
        OrgService.getOrgProfile(AuthService.user.id);
    };

    vm.loggedin = false;
    vm.editable = false;

    // object to hold organizations list
    vm.orgs = {};

    // user object for agency/organization login
    vm.userToLogin = {
        username: '',
        password: ''
    };

    
    vm.orgLogin = function() {
        AuthService.login(vm.userToLogin).then(function(response){
            vm.loggedin = true;
            vm.displayProfile();
        });
    };

    vm.logout = function() {
        AuthService.logout()
        vm.loggedin = false;
    };

}); // end ProfileController