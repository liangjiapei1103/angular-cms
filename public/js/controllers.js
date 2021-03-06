'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

  .controller('AdminPagesCtrl', ['$scope', '$log', 'pagesFactory', function($scope, $log, pagesFactory) {
  	pagesFactory.getPages().then(
  		function (res) {
  			$scope.allPages = res.data;
  		}, 
  		function (err) {
  			$log.error(err);
  	});

  	$scope.deletePage = function (id) {
  		pagesFactory.deletePage(id);
  	};

  }]);

}]);
