'use strict';
angular.module('tmSurveyApp')
.controller('TakeCtrl', function($scope, $resource,$routeParams) {
	var _id = $routeParams.id;
	$scope.list = $resource('/getsurvey/:id',{id:_id}).get();
	console.log($scope.list);
});