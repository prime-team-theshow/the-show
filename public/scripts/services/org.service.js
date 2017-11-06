/*
This Service is currently for organization related information
- it will be used for testing and possible more
- get organization data, ads related to org, categories awards are in, 
*/

// could get all the data for org, ad, awards, categories, credits all in one get and filter on FE
// alternatively could get org, ad, awards, categories 
// in separate get ad, awards, categories, credits or just credits

// are we showing ads on agency's profile?

myApp.service('OrgService', function ($http) {
    console.log('in AuthService');
    var self = this;

    // object to hold org data
    self.orgs = {
        list: []
    }; // end orgs

    // winner view  needs ad name, agency name, and award




    /************** $http **************/

    // get all organizations from DB
    self.getOrgs = function () {
        console.log('in getOrgs');
        $http.get('/org').then( function(response) {
            console.log('getOrgs, response', response.data.rows);
            self.orgs.list = response.data.rows;
        }); // end GET
    }; // end getOrgs


}); // end OrgService