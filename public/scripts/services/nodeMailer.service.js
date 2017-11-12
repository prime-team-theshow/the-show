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
    self.inviteOrg = function ( email, message, orgId ) {
        var thingToSend = {
            email: email,
            message: message,
            link: 'http://localhost:6660/#!/registration' + orgId
        }; // end thingToSend
        return $http.post('/mail/invite', thingToSend).then(function (response) {
            console.log('nodeMailer test successful');
        }).catch(function (response) {
            console.log('nodeMailer error: ', response);
        }); // end catch
    }; // end inviteOrg


}); // end NodeMailerService