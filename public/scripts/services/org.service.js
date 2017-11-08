/**
 * Service for interacting with organization profile
 */

myApp.service('OrgService', function ($http, AuthService) {
    console.log('in Org Service');

    var sv = this;

    // object of organization profile
    sv.orgProfileObj = { orgProfile: {} };

    // object of social media types
    sv.socialMediaTypesObj = { socialMediaTypes: {} };

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
            }); // end $http.get
    } // end getOrgProfile()

    /**
     * update organization profile
     * 
     * @param orgId string
     * @param changes object { name:, description:, website:, logo: } 
     * ONLY INCLUDE THE PROPERTIES THAT CHANGED IN CHANGES OBJECT
     */
    sv.updateOrgProfile = function (orgId, changes) {
        $http.put('/org/' + orgId, changes)
            .then(function (response) {
                // fetch and update when successful
                sv.getOrgProfile(orgId);
            })
            .catch(function (error) {
                console.error('OrgService updateOrgProfile() error:', error);
            }); // end $http.put
    } // end updateOrgProfile()

    /**
     * fetch social media types
     */
    sv.getSocialMediaTypes = function () {
        $http.get('/socialmedia/types')
            .then(function (result) {
                sv.socialMediaTypesObj.socialMediaTypes = result.data;
                console.log('sv.socialMediaTypesObj.socialMediaTypes:', sv.socialMediaTypesObj.socialMediaTypes);

            })
            .catch(function (error) {
                console.error('OrgService getSocialMediaTypes() error:', error);
            }); // end $http.get
    } // end getSocialMediaTypes()

    /**
     * add social media to an org
     * 
     * @param socialMedia {typeId:, orgId:, url:}
     */
    sv.addSocialMedia = function (socialMedia) {
        $http.post('/socialmedia', socialMedia)
            .then(function (response) {
                // fetch and update when successful
                sv.getOrgProfile(AuthService.user.id);
            })
            .catch(function (error) {
                console.error('OrgService addSocialMedia() error:', error);
            }); // end $http.post
    } // end addSocialMedia()

    /**
     * delete social media with the given id from social media table
     * 
     * @param socialMediaId string
     */
    sv.deleteSocialMedia = function (socialMediaId) {
        $http.delete('/socialmedia/' + socialMediaId)
            .then(function (response) {
                // fetch and update when successful
                sv.getOrgProfile(AuthService.user.id);
            })
            .catch(function (error) {
                console.error('OrgService deleteSocialMedia() error:', error);
            }); // end $http.post
    } // end deleteSocialMedia()

}); // end OrgService