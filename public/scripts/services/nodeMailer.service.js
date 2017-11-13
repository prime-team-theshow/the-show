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
     // for testing
    self.inviteOrgTest = function ( email, message, orgId ) {
        var thingToSend = {
            email: email,
            message: message,
            link: 'http://localhost:6660/#!/registration' + orgId
        }; // end thingToSend
        return $http.post('/mail/invite-test', thingToSend).then(function (response) {
            console.log('nodeMailer test successful');
        }).catch(function (response) {
            console.log('nodeMailer error: ', response);
        }); // end catch
    }; // end inviteOrgTest

    // takes in organization/agency email and sends 
    // them an invite to create a user profile
    self.inviteOrg = function (email, message, orgId) {
        console.log('in inviteOrg');
        var objectToSend = {
            email: email,
            message: message,
            link: 'http://localhost:6660/#!/registration' + orgId
        }; // end thingToSend
        var route = '/mail/invite/' + orgId; // not sure this is needed yet
        return $http.put(route, objectToSend).then(function (response) {
            console.log('nodeMailer test successful');
        }).catch(function (response) {
            console.log('nodeMailer error: ', response);
        }); // end catch
    }; // end inviteOrg


}); // end NodeMailerService