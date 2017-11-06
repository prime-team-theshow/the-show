myApp.controller('AdminController', function ($http, $location, $mdDialog) {
    console.log('in AdminController');
    var vm = this;

    // user object for agency/organization login
    vm.user = {
        username: '',
        password: ''
    }; // end user object

    // admin user object for admin login
    vm.admin = {
        username: '',
        password: ''
    }; // end admin object

    // holds data from get USer
    vm.getUserObj = {
        email: '',
        id: '',
        isadmin: false
    };
});
