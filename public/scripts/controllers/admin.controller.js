myApp.controller('AdminController', function (AuthService, $http, $location, $mdDialog) {
    console.log('in AdminController');
    var vm = this;

    // admin user object for admin login
    vm.admin = {
        username: '',
        password: ''
    }; // end admin object

    // holds data from get USer
    vm.getUserObj = {
        email: '',
        id: '',
        isadmin: true
    };

    vm.adminLogin = AuthService.login(vm.amin);
   
});
