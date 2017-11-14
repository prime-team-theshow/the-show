/*
This controller is for node mailer
- currently this controller is for testing only
*/
myApp.controller('NodeMailerController', function (NodeMailerService) {
    console.log('in NodeMailerController');
    var vm = this;

    // object for holding organization info
    vm.org = {};

    // was thinking of using mdDialog if email is not entered

    // passes email to service which then hits nodemailer
    vm.inviteOrg = function (email) {
        console.log('in inviteOrg');
        if(email) {
            NodeMailerService.inviteOrgTest(email);
        } else {
            alert('Please enter a valid email address');
        } // end else
    }; // end inviteOrg

    

}); // end NodeMailerController