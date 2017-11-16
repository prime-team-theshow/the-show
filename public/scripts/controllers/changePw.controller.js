myApp.controller('ChangePwController', function (AuthService, OrgService, $location) {
    console.log('in ChangePwController');
    var vm = this;

    vm.goToProfile = function() {
        console.log("AuthService.user: ", AuthService.user);
        if (AuthService.user.isadmin) {
            $location.path('/adminDash');
        } else {
            $location.path('/profile/' + AuthService.user.id);
        }
    };

    // user object for agency/organization login
    vm.userToReset = {
        username: '',
        tempPassword: '',
        password: ''
    };

    vm.changePassword = function () {
        AuthService.login(vm.userToReset).then(function (response) {
            console.log("AuthService.user: ", AuthService.user);
           vm.goToProfile();
        });
    };

}); // end ProfileController