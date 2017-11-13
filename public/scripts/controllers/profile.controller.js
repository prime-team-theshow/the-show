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
            vm.profileData.ads = OrgService.orgProfileObj.orgProfile.ads;
            vm.profileData.name = OrgService.orgProfileObj.orgProfile.name;
            vm.profileData.logo = OrgService.orgProfileObj.orgProfile.logo;
            vm.profileData.social_media = OrgService.orgProfileObj.orgProfile.social_media;
            vm.profileData.website = OrgService.orgProfileObj.orgProfile.website;
            vm.profileData.description = OrgService.orgProfileObj.orgProfile.description;
            vm.profileData.claimed = OrgService.orgProfileObj.orgProfile.claimed;
        });
    };

    vm.displayProfileToPublic = function () {
        OrgService.getOrgProfile(vm.orgProfileObject.id).then(function (response) {
            vm.profileData.orgId = OrgService.orgProfileObj.orgProfile.id;
            vm.profileData.ads = OrgService.orgProfileObj.orgProfile.ads;
            vm.profileData.name = OrgService.orgProfileObj.orgProfile.name;
            vm.profileData.logo = OrgService.orgProfileObj.orgProfile.logo;
            vm.profileData.social_medias = OrgService.orgProfileObj.orgProfile.social_medias;
            vm.profileData.website = OrgService.orgProfileObj.orgProfile.website;
            vm.profileData.description = OrgService.orgProfileObj.orgProfile.description;
            vm.profileData.claimed = OrgService.orgProfileObj.orgProfile.claimed;
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

    vm.checkForAgencyAdmin(vm.orgProfileObject.email, AuthService.user.email);
    vm.display(vm.profileData.editable);

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
            profile.name === vm.name
        } else {
            profile.name = vm.profileData.name;
        };
        if (description) {
            profile.description === vm.description;
        } else {
            profile.description = vm.profileData.description;
        };
        if (logo) {
            profile.logo === vm.logo;
        } else {
            profile.logo = vm.profileData.logo;
        };
        if (website) {
            profile.website === vm.website;
        } else {
            profile.website = vm.profileData.website;
        };
        // not sure how to get these...
        if (facebook) {
            profile.facebook === vm.facebook;
        } else {
            profile.facebook = vm.profileData.social_medias;
        };
        if (twitter) {
            profile.twitter === vm.twitter;
        } else {
            profile.twitter = vm.profileData.social_medias.twitter;
        };
        if (linkedin) {
            profile.linkedin === vm.linkedin;
        } else {
            profile.linkedin = vm.profileData.social_medias.linkedin;
        };
        OrgService.updateOrgProfile(vm.profileData.orgId, profile);
    };

}); // end ProfileController