/*
This controller is for the agency/organization profile view.
- it will display the agency/org name
- a bio/description
- social media links
- website link
- have the ability for authenticated users to make edits and updates
*/

myApp.controller('ProfileController', function (OrgService, AuthService, $http, $location, $routeParams) {
    console.log('in ProfileController');
    var vm = this;

    vm.orgProfileObject = OrgService.orgProfileObj.orgProfile;

    // if the email of the logged in user is the same as the email for this profile admin, show the edit button

    vm.checkForAgencyAdmin = function (profileEmail, userEmail) {
        if (profileEmail === userEmail) {
            vm.profileData.editable = true;
        } else {
            vm.profileData.editable = false;
        } 
        console.log("agency profile admin?", vm.profileData.editable);
        return vm.profileData.editable;
    };

    vm.displayProfile = function () {
        OrgService.getOrgProfile($routeParams.id).then(function (response) {
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


    vm.claimProfile = function() {
        console.log('you have claimed this profile!')
    };

    vm.goToEditProfile = function() {
        $location.path('/edit/' + vm.profileData.orgId);
    };

    vm.checkForAgencyAdmin(OrgService.orgProfileObj.orgProfile.email, AuthService.user.email);
    vm.displayProfile();

}); // end ProfileController