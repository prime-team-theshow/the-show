/*
This controller is for node mailer
- currently this controller is for testing only
*/
myApp.controller('NodeMailerController', function (NodeMailerService ) {
    console.log('in NodeMailerController');
    var vm = this;

    // object for holding organization info
    vm.org = {};

    vm.inviteOrg = function (email) {
        console.log('in inviteOrg');
        NodeMailerService.inviteOrg(email);
    }; // end inviteOrg

    

}); // end NodeMailerController