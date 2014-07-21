'use strict';

/**
 * @ngdoc overview
 * @name tmSurveyApp
 * @description
 * # tmSurveyApp
 *
 * Main module of the application.
 */
angular
  .module('tmSurveyApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/create', {
        templateUrl: 'views/create.html',
        controller: 'CreateCtrl'
      })
      .when('/take', {
        templateUrl: 'views/take.html',
        controller: 'TakeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
