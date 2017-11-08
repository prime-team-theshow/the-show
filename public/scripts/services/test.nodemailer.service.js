/*
This Service is for node mailer and may be used 
after testing or merged into the admin service
- it will be used for testing and possible more
*/

myApp.service('NodeMailerService', function ($http) {
    console.log('in NodeMailerService');
    var self = this;

    


     /************** $http **************/

     // takes in organization/agency email and sends 
     // them an invite to create a user profile
    self.inviteOrg = function ( email ) {
        var thingToSend = {
            email: email
        }; // end thingToSend
        $http.post('/mail/invite', thingToSend).then(function (response) {
            console.log('nodeMailer test successful');
        }).catch(function (response) {
            console.log('nodeMailer error: ', response);
        }); // end catch
    }; // end inviteOrg


}); // end NodeMailerService