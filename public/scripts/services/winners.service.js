/**
 * Service for interacting with winner view/ winner controller
 */

myApp.service('WinnersService', function ($http) {
    console.log('in Winner Service');

    var sv = this;

    // stores all ads for a given yer
    sv.yearObj = { year: {} };

    // stores details about a given ad
    sv.adObj = { ad: {} };

    /**
     * fetch all ads for a given year and store in year object
     * 
     * @param year: int or string
     */
    sv.getYear = function (year) {
        return $http.get('winners/year/' + year)
            .then(function (response) {
                // store ads in yearObj
                sv.yearObj.year = response.data;
            })
            .catch(function (error) {
                console.log('Winner Service GET /winners/year/:year error', error);
            }); // end GET /winners/year/:year
    } // end getYear()

    /**
     * fetch ad details for a given ad id and store in adObj object
     * 
     * @param adId: int or string 
     */
    sv.getAd = function (adId) {
        return $http.get('winners/' + adId)
            .then(function (response) {
                // store ad details in adObj
                sv.adObj.ad = response.data;
            })
            .catch(function (error) {
                console.log('Winner Service GET /winners/:id error', error);
            }); // end GET /winners/:id
    } // end getAd()
});
