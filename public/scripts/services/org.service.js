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

    /**
     * update organization profile
     * 
     * @param orgId string
     * @param changes object
      * {
    *  name:
    *  description:
    *  website:
    *  logo:
    * } --> ONLY INCLUDE THE PROPERTIES THAT CHANGED IN CHANGES OBJECT <--
     */
    sv.updateOrgProfile = function (orgId, changes) {
        $http.put('/org/' + orgId, changes)
        .then(function (response) {
            // fetch and update when successful
            sv.getOrgProfile(orgId);
        })
        .catch(function (error) {
            console.log('OrgService updateOrgProfile error:', error);
        });
    }
}); // end OrgService