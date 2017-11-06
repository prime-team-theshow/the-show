/*
This controller is for the agency/organization profile view.
- it will display the agency/org name
- a bio/description
- social media links
- website link
- have the ability for authenticated users to make edits and updates
*/

myApp.controller('ProfileController', function (OrgService) {
    console.log('in ProfileController');
    var vm = this;

    // object to hold organizations list
    vm.orgs = {};

    vm.getOrgs = function () {
        console.log('in getOrgs');
        OrgService.getOrgs();
    }; // end getOrgs

    vm.getOrgs();

}); // end ProfileController