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

    vm.displayProfile = function () {
        OrgService.getOrgProfile(AuthService.user.id).then(function (response) {
            vm.profileData.ads = OrgService.orgProfileObj.ads;
            vm.profileData.name = OrgService.orgProfileObj.name;
            vm.profileData.logo = OrgService.orgProfileObj.logo;
            vm.profileData.social_medias = OrgService.orgProfileObj.social_medias;
            vm.profileData.website = OrgService.orgProfileObj.website;
            vm.profileData.description = OrgService.orgProfileObj.description;
        });
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

    vm.profileData = {
        ads: [],
        name: '',
        logo: '',
        social_medias: [],
        website: '',
        description: ''
    };

    vm.orgLogin = function () {
        AuthService.login(vm.userToLogin).then(function (response) {
            vm.loggedin = true;
            vm.displayProfile();
        });
    };

    vm.logout = function () {
        AuthService.logout();
        vm.loggedin = false;
    };

}); // end ProfileController