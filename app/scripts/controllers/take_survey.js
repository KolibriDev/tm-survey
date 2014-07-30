'use strict';
angular.module('tmSurveyApp')
.controller('TakeCtrl', function($scope, $resource,$routeParams) {
	var _id = $routeParams.id;
	$scope.survey = $resource('/getsurvey/:id',{id:_id}).get();
	
	$scope.sendSurvey = function () {
		console.log($scope.survey);
		$resource('/savesurvey/').save($scope.survey);
	};
});