// as of initial creation, not sourced anywhere -- ALSO A COPY PASTE STARTING AT MYAPP.CONTROLLER FROM PROFILE.CONTROLLER (Except for 'Winner Controller')

/*
This controller is for the winner view.
- it will display the category/organization name
    - when a category/organization name is clicked it will expand with an acccordian to view all awards in that category/org name
        - When an award is clicked, it will show in the remaining section of the view.

- NEEDS A BUTTON TO TOGGLE BETWEEN CATEGORY AND ORGANIZATION NAME VIEW
*/


myApp.controller('WinnersController', function (OrgService, AuthService, $http) {
    console.log('in WinnerController');
    var vm = this;
    
        vm.sampleList = [
            {
                name: 'category1',
                winners: ['winner1', 'winner2', 'winner3', 'winner4', 'winner5'],
                show: false
            }, {
                name: 'category2',
                winners: ['winner1', 'winner2', 'winner3', 'winner4', 'winner5'],
                show: false
    
            }, {
                name: 'category3',
                winners: ['winner1', 'winner2', 'winner3', 'winner4', 'winner5'],
                show: false
    
            }, {
                name: 'category4',
                winners: ['winner1', 'winner2', 'winner3', 'winner4', 'winner5'],
                show: false
    
            }, {
                name: 'category5',
                winners: ['winner1', 'winner2', 'winner3', 'winner4', 'winner5'],
                show: false
    
            },
        ];
    
        vm.toggleShowCategory = function (index) {
            console.log('category index:', index);
                vm.sampleList[index].show = !vm.sampleList[index].show;
        };
    
        vm.toggleLeft = buildDelayedToggler('left');
    
        vm.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
    
        };
    
        /**
         * Supplies a function that will continue to operate until the
         * time is up.
         */
        function debounce(func, wait, context) {
            var timer;
    
            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function () {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }
    
        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildDelayedToggler(navID) {
            return debounce(function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }
    
        function buildToggler(navID) {
            return function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            };
        }
}); // end WinnerController