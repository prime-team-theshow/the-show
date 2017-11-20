myApp.controller('LoginController', function (AuthService, OrgService, $location) {
    console.log('in LoginController');
    var vm = this;

    vm.registrationSuccess = AuthService.registrationSuccess;

    vm.goToProfile = function() {
        console.log("AuthService.user: ", AuthService.user);
        if (AuthService.user.isadmin) {
            $location.path('/adminDash');
        } else {
            $location.path('/profile/' + AuthService.user.id);
        }
    };

    // user object for agency/organization login
    vm.userToLogin = {
        username: '',
        password: ''
    };

    vm.login = function () {
        AuthService.login(vm.userToLogin).then(function (response) {
            console.log("AuthService.user: ", AuthService.user);
           vm.goToProfile();
           AuthService.registrationSuccess = false;
        });
    };

}); // end ProfileController