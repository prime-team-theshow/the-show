myApp.controller('EditController', function (OrgService, AuthService, $http, $location) {
    console.log('in EditController');
    var vm = this;
    vm.orgProfileObject = OrgService.orgProfileObj.orgProfile;
    vm.profileData = {
        orgId: '',
        editable: '',
        ads: [],
        name: '',
        logo: '',
        social_medias: [],
        website: '',
        description: '',
        claimed: ''
    };
    vm.editProfileInfo = function() {
        var name = vm.name;
        var description = vm.description;
        var logo = vm.logo;
        var website = vm.website;
        var facebook = vm.facebook;
        var twitter = vm.twitter;
        var linkedin = vm.linkedin;
        var profile = {};
        if (name) {
            profile.name = vm.name
        } else {
            profile.name = vm.profileData.name;
        };
        if (description) {
            profile.description = vm.description;
        } else {
            profile.description = vm.profileData.description;
        };
        if (logo) {
            profile.logo = vm.logo;
        } else {
            profile.logo = vm.profileData.logo;
        };
        if (website) {
            profile.website = vm.website;
        } else {
            profile.website = vm.profileData.website;
        };
        // not sure how to get these...
        if (facebook) {
            profile.facebook = vm.facebook;
        } else {
            profile.facebook = vm.profileData.social_medias;
        };
        if (twitter) {
            profile.twitter = vm.twitter;
        } else {
            profile.twitter = vm.profileData.social_medias.twitter;
        };
        if (linkedin) {
            profile.linkedin = vm.linkedin;
        } else {
            profile.linkedin = vm.profileData.social_medias.linkedin;
        };
        OrgService.updateOrgProfile(vm.profileData.orgId, profile);
    };
});