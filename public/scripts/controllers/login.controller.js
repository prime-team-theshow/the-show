myApp.controller('LoginController', function (AuthService, $location) {
    console.log('in LoginController');
    var vm = this;
    var orgId = AuthService.user.id;

    vm.goToProfile = function() {
        if (AuthService.user.isadmin = false) {
            vm.loggedin = true;
            $location.path('/profile/:', orgId);
        } else {
            vm.loggedin = true;
            $location.path('/adminDash');
        }
    };

    vm.loggedin = false;
    vm.editable = false;

    // user object for agency/organization login
    vm.userToLogin = {
        username: '',
        password: ''
    };

    vm.login = function () {
        AuthService.login(vm.userToLogin).then(function (response) {
            vm.goToProfile();
        });
    };

    vm.logout = function () {
        AuthService.logout();
    };

}); // end ProfileController