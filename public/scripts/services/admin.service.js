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

    // filter org get into two arrays for each
    self.filterOrgs = function() {
        console.log('in filterOrgs');
        
    }; // end filterOrgs

    
     /************** $http **************/

    self.getOrgs = function () {
        console.log('in getOrgs');
        return $http.get('/admin/orgs').then(function (response) {
            console.log('getOrgs successful');
            console.log('getOrgs response.data.rows', response.data.rows);
        }).catch(function (response) {
            console.log('getOrgs error: ', response);
        }); // end catch
    }; // end getOrgs


}); // end AdminService