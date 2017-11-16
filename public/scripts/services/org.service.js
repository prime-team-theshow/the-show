/**
 * Service for interacting with organization profile
 */

myApp.service('OrgService', function ($http) {
    console.log('in Org Service');

    var sv = this;

    // object of organization profile
    sv.orgProfileObj = { orgProfile: {} };

    // object of social media types
    sv.socialMediaTypesObj = { socialMediaTypes: {} };

    // object for org registration
    sv.orgToRegister = {};

    /**
     * fetch organization profile from the server
     * and updates sv.orgProfileObj.orgProfile with response data
     * 
     * @param orgId string
     */
    sv.getOrgProfile = function (orgId) {
        return $http.get('/org/' + orgId)
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
        return $http.put('/org/' + orgId, changes)
            .catch(function (error) {
                console.error('OrgService updateOrgProfile() error:', error);
            }); // end $http.put
    } // end updateOrgProfile()

    /**
     * fetch social media types
     */
    sv.getSocialMediaTypes = function () {
        return $http.get('/socialmedia/types')
            .then(function (result) {
                sv.socialMediaTypesObj.socialMediaTypes = result.data;
                console.log('sv.socialMediaTypesObj.socialMediaTypes:', sv.socialMediaTypesObj.socialMediaTypes);
            })
            .catch(function (error) {
                console.error('OrgService getSocialMediaTypes() error:', error);
            }); // end $http.get
    } // end getSocialMediaTypes()

    /**
     * update social media links
     */
    sv.updateSocialMedia = function (orgId, typeId, url) {
        return $http.put('/socialmedia/' + orgId, typeId, url)
        .catch(function (error) {
            console.error('OrgService updateSocialMedia() error:', error);
        }); // end $http.put
} // end updateOrgProfile()



    /**
     * add social media to an org
     * 
     * @param socialMedia {typeId:, orgId:, url:}
     */
    sv.addSocialMedia = function (socialMedia) {
        return $http.post('/socialmedia', socialMedia)
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
        return $http.delete('/socialmedia/' + socialMediaId)
            .catch(function (error) {
                console.error('OrgService deleteSocialMedia() error:', error);
            }); // end $http.post
    } // end deleteSocialMedia()

    sv.getOrgRegistration = function (orgId) {
        console.log('in getOrgRegistration');
        var route = '/register/' + orgId;
        return $http.get(route).then(function (response) {
            console.log('getOrg successful :', response.data.rows[0]);
            sv.orgToRegister = response.data.rows[0];
        }).catch(function (response) {
            console.log('getOrgs error: ', response);
        }); // end catch
    }; // end getOrgRegistration

}); // end OrgService