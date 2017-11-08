/*
This Service is for node mailer and may be used 
after testing or merged into the admin service
- it will be used for testing and possible more
*/

myApp.service('NodeMailerService', function ($http) {
    console.log('in NodeMailerService');
    var self = this;

    


     /************** $http **************/
    self.inviteOrg = function ( email ) {
        // this would dynamically update based on info passed from client
        // for now it will be hard coded
        var thingToSend = {
            email: email
        }; // thingToSend

        $http.post('/mail/invite', thingToSend).then(function (response) {
            console.log('nodeMailer test successful');
        }).catch(function (response) {
            console.log('nodeMailer error: ', response);
        }); // end catch

    }; // end inviteOrg


}); // end NodeMailerService