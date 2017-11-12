/*
This Service is for admin related tasks
- route: organizations to invite
- route: add new year and background image
- route: update year and background image
- 
*/

myApp.service('AdminService', function ($http) {
    console.log('in AdminService');
    var self = this;

    // object to hold filtered org data
    self.orgs = {
        pending: [],
        notPending: []
    }; // end orgs

    
     /************** $http **************/

    self.getOrgs = function () {
        console.log('in getOrgs');
        return $http.get('/admin/orgs').then(function (response) {
            console.log('getOrgs successful');
        }).catch(function (response) {
            console.log('getOrgs error: ', response);
        }); // end catch
    }; // end getOrgs


}); // end AdminService