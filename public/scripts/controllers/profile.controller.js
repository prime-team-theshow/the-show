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

    vm.orgProfileObject = OrgService.orgProfileObj.orgProfile;

    vm.checkforAgencyAdmin(vm.orgProfileObject.email, Authservice.user.email);
    vm.display(vm.profileData.editable);

    // if the email of the logged in user is the same as the email of the orgprofile email, show agencyadmin view

    vm.checkForAgencyAdmin = function (profileEmail, userEmail) {
        if (profileEmail === userEmail) {
            vm.profileData.editable = true;
        } else {
            vm.profileData.editable = false;
        }
    };

    vm.display = function (adminStatus) {
        if (adminStatus) {
            vm.displayProfileToAgencyAdmin();
        } else {
            vm.displayProfileToPublic();
        }
    };

    vm.displayProfileToAgencyAdmin = function () {
        OrgService.getOrgProfile(AuthService.user.id).then(function (response) {
            vm.profileData.ads = vm.orgProfileObject.ads;
            vm.profileData.name = vm.orgProfileObject.name;
            vm.profileData.logo = vm.orgProfileObject.logo;
            vm.profileData.social_medias = vm.orgProfileObject.social_medias;
            vm.profileData.website = vm.orgProfileObject.website;
            vm.profileData.description = vm.orgProfileObject.description;
            vm.profileData.claimed = vm.orgProfileObject.claimed;
        });
    };

    vm.displayProfileToPublic = function () {
        OrgService.getOrgProfile(vm.orgProfileObject.id).then(function (response) {
            vm.profileData.orgId = vm.orgProfileObject.id;
            vm.profileData.ads = vm.orgProfileObject.ads;
            vm.profileData.name = vm.orgProfileObject.name;
            vm.profileData.logo = vm.orgProfileObject.logo;
            vm.profileData.social_medias = vm.orgProfileObject.social_medias;
            vm.profileData.website = vm.orgProfileObject.website;
            vm.profileData.description = vm.orgProfileObject.description;
            vm.profileData.claimed = vm.orgProfileObject.claimed;
        });
    };

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




}); // end ProfileController