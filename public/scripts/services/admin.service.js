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

    // object to hold org data
    self.orgs = {
        all: [], // this is being set, but not used on controller
    }; // end orgs

    
     /************** $http **************/

     // get org list for admin dashboard
    self.getOrgs = function () {
        console.log('in getOrgs');
        return $http.get('/admin/orgs').then(function (response) {
            console.log('getOrgs successful :', response.data.rows);
            self.orgs.all = response.data.rows;
        }).catch(function (response) {
            console.log('getOrgs error: ', response);
        }); // end catch
    }; // end getOrgs

    // set org email and password to null
    // set invited to false
    self.denyOrg = function (orgId) {
        console.log('in denyOrg');
        return $http.put('/admin/deny/' + orgId).then(function (response) {
            console.log('denyOrg successful :', response);
        }).catch(function (response) {
            console.log('denyOrg error: ', response);
        }); // end catch
    }; // end getOrgs

}); // end AdminService