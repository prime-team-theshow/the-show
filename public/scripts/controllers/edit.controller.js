myApp.controller('EditController', function (OrgService, AuthService, $http, $location) {
    console.log('in EditController');
    var vm = this;

    vm.orgProfileObject = OrgService.orgProfileObj.orgProfile;
    vm.socialMediaTypesObj = OrgService.socialMediaTypesObj;

    vm.socialId = OrgService.socialMediaTypesObj.socialMediaTypes.id;

    vm.goToProfile = function(orgId) {
        $location.path('/profile/' + orgId);
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

    vm.displayProfileInfo = function () {
        OrgService.getOrgProfile(OrgService.orgProfileObj.orgProfile.id).then(function (response) {
            vm.profileData.orgId = OrgService.orgProfileObj.orgProfile.id;
            vm.profileData.ads = OrgService.orgProfileObj.orgProfile.ads;
            vm.profileData.name = OrgService.orgProfileObj.orgProfile.name;
            vm.profileData.logo = OrgService.orgProfileObj.orgProfile.logo;
            vm.profileData.social_medias = OrgService.orgProfileObj.orgProfile.social_medias;
            vm.profileData.website = OrgService.orgProfileObj.orgProfile.website;
            vm.profileData.description = OrgService.orgProfileObj.orgProfile.description;
            vm.profileData.claimed = OrgService.orgProfileObj.orgProfile.claimed; // this doesn't exist anymore
            OrgService.getSocialMediaTypes().then(function (response) {
                //loop through each social media type and check if the orgprofile has a matching type id on its social media
                //if that matches, then attach a value to the social media type object, adding the url of the agency's social media of that type
                vm.socialMediaTypesObj.socialMediaTypes.map(function (socialMediaType) {
                    var socialMedia = OrgService.orgProfileObj.orgProfile.social_medias.find(function (socialMedia) {
                        return socialMediaType.id === socialMedia.type_id;
                    });
                    if (socialMedia) {
                        socialMediaType.url = socialMedia.url;
                    } else {
                        socialMediaType.url = '';
                    }
                    return socialMediaType;
                });
            })
        });
    };

    vm.editProfileInfo = function () {
        var name = vm.name;
        var description = vm.description;
        var logo = vm.logo;
        var website = vm.website;
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
        vm.socialMediaTypesObj.socialMediaTypes.forEach(function (socialMediaType) {
            if (socialMediaType.url != '') {
                OrgService.updateSocialMedia(vm.socialMediaTypesObj.typeId, socialMediaType.url);
                console.log("socialMediaType Info:", socialMediaType.url, socialMediaType.name)
            }
        });
        OrgService.updateOrgProfile(vm.profileData.orgId, profile).then(function(response) {
            vm.goToProfile(vm.profileData.orgId);
        });
    };
    vm.displayProfileInfo();

});