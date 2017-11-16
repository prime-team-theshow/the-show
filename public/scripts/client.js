console.log('client.js sourced');

// AngularJS and sourced in modules
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

myApp.config(function ($routeProvider, $mdThemingProvider) {

    // client side routing
    $routeProvider.when('/', {
        templateUrl: '/views/home.html',
        controller: 'HomeController as hc'
    }).when('/auth', {
        templateUrl: '/views/auth.html',
        controller: 'AuthController as ac'
    }).when('/profile/:id', {
        templateUrl: '/views/profile.html',
        controller: 'ProfileController as pc'
    }).when('/admin', {
        templateUrl: '/views/admin.html',
        controller: 'AdminController as dc'
    }).when('/mail', {
        templateUrl: '/views/test.nodemailer.html',
        controller: 'NodeMailerController as nmc'
    }).when('/edit/:id', {
        templateUrl: '/views/edit.html',
        controller: 'EditController as ec'
    }).when('/adminDash', {
        templateUrl: '/views/adminDash.html',
        controller: 'AdminDashController as adc'
    }).when('/login', {
        templateUrl: '/views/login.html',
        controller: 'LoginController as lc'
    }).when('/winners/:year', {
        templateUrl: '/views/winners.html',
        controller: 'WinnersController as wc'
    }).when('/test-admin', {
        templateUrl: '/views/test-admin.html',
        controller: 'TestAdmin as tac'
    }).when('/registration/:orgId', {
    templateUrl: '/views/registration.html',
    controller: 'RegistrationController as rc'
    }).when('/createyear', {
        templateUrl: '/views/createYear.html',
        controller: 'CreateYearController as cyc'
    }).otherwise('/');

}); // end config