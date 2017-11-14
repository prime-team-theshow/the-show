myApp.controller('EditController', function (OrgService, AuthService, $http, $location) {
    console.log('in EditController');
    var vm = this;

    vm.orgProfileObject = OrgService.orgProfileObj.orgProfile;
    vm.socialMediaTypesObj = OrgService.socialMediaTypesObj;

    vm.socialId = OrgService.socialMediaTypesObj.socialMediaTypes.id;


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
            vm.profileData.claimed = OrgService.orgProfileObj.orgProfile.claimed;
            OrgService.getSocialMediaTypes().then(function(response) {
                
                //loop through each social media type and check if the orgprofile has a matching type id on its social media
                //if that matches, then attach a value to the social media type object, adding the url of the agency's social media of that type
                vm.socialMediaTypesObj.socialMediaTypes.map(function(type) {
                    return type.url = "example.com"
                })
                
            })
        });
    };

    vm.editProfileInfo = function() {
        var name = vm.name;
        var description = vm.description;
        var logo = vm.logo;
        var website = vm.website;
        var facebook = vm.facebook;
        var twitter = vm.twitter;
        var linkedin = vm.linkedin;
        var instagram = vm.instagram;
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
            profile.facebook = vm.profileData.social_medias.facebook;
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
        if (instagram) {
            profile.instagram = vm.instagram;
        } else {
            profile.instagram = vm.profileData.social_medias.instagram;
        };
        OrgService.updateOrgProfile(vm.profileData.orgId, profile);
    };

    vm.displayProfileInfo();
    
});