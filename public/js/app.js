'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/admin/login', {templateUrl: 'partials/admin/login.html', controller: 'AdminLoginCtrl'});
  $routeProvider.when('/admin/pages', {templateUrl: 'partials/pages.html', controller: 'AdminPagesCtrl'});
  $routeProvider.when('/admin/add-edit-page/:id', {templateUrl: 'partials/add-edit-page.html', controller: 'AdminEditPageCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
}]);

