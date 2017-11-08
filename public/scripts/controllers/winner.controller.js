// as of initial creation, not sourced anywhere -- ALSO A COPY PASTE STARTING AT MYAPP.CONTROLLER FROM PROFILE.CONTROLLER (Except for 'Winner Controller')

/*
This controller is for the winner view.
- it will display the category/organization name
    - when a category/organization name is clicked it will expand with an acccordian to view all awards in that category/org name
        - When an award is clicked, it will show in the remaining section of the view.

- NEEDS A BUTTON TO TOGGLE BETWEEN CATEGORY AND ORGANIZATION NAME VIEW
*/


myApp.controller('WinnerController', function (OrgService, AuthService, $http) {
    console.log('in WinnerController');
    var vm = this;

    vm.loggedin = false;

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
    };

    vm.logout = function() {
        AuthService.logout()
        vm.loggedin = false;
    };
}); // end ProfileController