// as of initial creation, not sourced anywhere -- ALSO A COPY PASTE STARTING AT MYAPP.CONTROLLER FROM PROFILE.CONTROLLER (Except for 'Winner Controller')

/*
This controller is for the winner view.
- it will display the category/organization name
    - when a category/organization name is clicked it will expand with an acccordian to view all awards in that category/org name
        - When an award is clicked, it will show in the remaining section of the view.

- NEEDS A BUTTON TO TOGGLE BETWEEN CATEGORY AND ORGANIZATION NAME VIEW
*/


myApp.controller('WinnersController', function (WinnersService, $routeParams) {
    console.log('in WinnerController');
    var vm = this;

    vm.yearObj = WinnersService.yearObj;
    vm.adObj = {};
    vm.groupBy = [];
    vm.disableGroupByCategoryBtn = true;
    vm.disableGroupByOrgBtn = false;

    var yearParam = $routeParams.year;
    var groupedByOrg = [];
    var groupedByCategory = [];

    function fetchYear(year) {
        WinnersService.getYear(year)
            .then(function (response) {
                // create grouped by category array
                vm.yearObj.year.ads.reduce(function (grouped, ad) {
                    // find matching category by cateory name
                    var index = grouped.findIndex(function (category) {
                        return category.name === ad.category;
                    });

                    // if no matching category found
                    if (index === -1) {

                        // create new category
                        var categoryToAdd = { name: ad.category, winners: [], show: false };

                        // add current ad in new category
                        categoryToAdd.winners.push({ id: ad.id, name: ad.name, award: ad.award });

                        // add new category to grouped array
                        grouped.push(categoryToAdd);
                    } else { // category already exists

                        // add current ad to existing category
                        grouped[index].winners.push({ id: ad.id, name: ad.name, award: ad.award });
                    }

                    // return updated grouped array
                    return grouped;
                }, groupedByCategory); // end group by category reduce

                // create grouped by organization array
                vm.yearObj.year.ads.reduce(function (grouped, ad) {
                    // find matching organization by cateory name
                    var index = grouped.findIndex(function (organization) {
                        return organization.name === ad.organization;
                    });

                    // if no matching organization found
                    if (index === -1) {

                        // create new organization
                        var categoryToAdd = { name: ad.organization, winners: [], show: false };

                        // add current ad in new organization
                        categoryToAdd.winners.push({ id: ad.id, name: ad.name, award: ad.award });

                        // add new organization to grouped array
                        grouped.push(categoryToAdd);
                    } else { // organization already exists

                        // add current ad to existing organization
                        grouped[index].winners.push({ id: ad.id, name: ad.name, award: ad.award });
                    }

                    // return updated grouped array
                    return grouped;
                }, groupedByOrg); // end group by org reduce
            }); // end WinnersService.getYear().then

        // set vm.groupBy base on toggle button
        if (vm.disableGroupByCategoryBtn) {
            vm.groupBy = groupedByCategory;
        } else {
            vm.groupBy = groupedByOrg;
        }

        console.log('groupedByCategory', groupedByCategory);
        console.log('groupedByOrg', groupedByOrg);

    } // end fetchYear()

    function fetchAd(adId) {
        WinnersService.getAd(adId)
            .then(function (response) {
                console.log('fetched ad:', vm.adObj.ad);
                vm.adObj = WinnersService.adObj;
            }); // end WinnersService.getAd().then
    } // end fetchAd()

    vm.toggleShowCategory = function (index) {
        console.log('category index:', index);
        vm.groupBy[index].show = !vm.groupBy[index].show;
    }; // end toggleShowCategory()

    vm.changeWinnerDetails = function (adId) {
        console.log('winner detials id:', adId);
        fetchAd(adId);
    }

    vm.toggleGroupBy = function () {
        // toggle groupBy buttons
        vm.disableGroupByCategoryBtn = !vm.disableGroupByCategoryBtn;
        vm.disableGroupByOrgBtn = !vm.disableGroupByOrgBtn;

        // toggle groupBy array
        if (vm.disableGroupByCategoryBtn) {
            vm.groupBy = groupedByCategory;
        } else {
            vm.groupBy = groupedByOrg;
        }
    };

    fetchYear(yearParam);

}); // end WinnerController