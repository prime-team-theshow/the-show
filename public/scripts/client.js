console.log('client.js sourced');

// AngularJS and sourced in modules
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

myApp.config(function ($routeProvider) {

    // client side routing
    $routeProvider.when('/', {
        templateUrl: '/views/home.html',
        controller: 'HomeController as hc'
    }).when('/auth', {
        templateUrl: '/views/auth.html',
        controller: 'AuthController as ac'
    }).when('/profile/:name', {
        templateUrl: '/views/profile.html',
        controller: 'ProfileController as ac'
    }).otherwise('/');

}); // end config