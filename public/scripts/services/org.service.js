/**
 * Service for interacting with organization profile
 */

myApp.service('OrgService', function ($http) {
    console.log('in Org Service');

    var sv = this;

    // object of organization profile
    sv.orgProfileObj = { orgProfile: {} };

    /**
     * fetch organization profile from the server
     * and updates sv.orgProfileObj.orgProfile with response data
     * 
     * @param orgId string
     */
    sv.getOrgProfile = function (orgId) {
        $http.get('/org/' + orgId)
            .then(function (response) {
                sv.orgProfileObj.orgProfile = response.data;
                console.log('sv.orgProfileObj.orgProfile', sv.orgProfileObj.orgProfile);
            })
            .catch(function (error) {
                console.log('OrgService getOrgProfile error:', error);
            });
    }
}); // end OrgService