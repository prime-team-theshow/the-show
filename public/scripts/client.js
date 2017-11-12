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
    }).when('/profile/:Id', {
        templateUrl: '/views/profile.html',
        controller: 'ProfileController as pc'
    }).when('/admin', {
        templateUrl: '/views/admin.html',
        controller: 'AdminController as dc'
    }).when('/mail', {
        templateUrl: '/views/test.nodemailer.html',
        controller: 'NodeMailerController as nmc'
    }).when('/adminDash', {
        templateUrl: '/views/adminDash.html',
        controller: 'AdminDashController as adc'
    }).when('/login', {
        templateUrl: '/views/login.html',
        controller: 'LoginController as lc'
    }).when('/winners/:year', {
        templateUrl: '/views/winner.html',
        controller: 'WinnerController as wc'
    }).when('/test-admin', {
        templateUrl: '/views/test-admin.html',
        controller: 'TestAdmin as tac'
    }).otherwise('/');

}); // end config