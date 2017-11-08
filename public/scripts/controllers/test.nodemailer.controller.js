/*
This controller is for node mailer
- currently this controller is for testing only
*/
myApp.controller('NodeMailerController', function (NodeMailerService ) {
    console.log('in NodeMailerController');
    var vm = this;

    vm.inviteOrg = function () {
        console.log('in inviteOrg');
        NodeMailerService.inviteOrg();
    }; // end iviteOrg

    // call on page load
    vm.inviteOrg();

}); // end NodeMailerController