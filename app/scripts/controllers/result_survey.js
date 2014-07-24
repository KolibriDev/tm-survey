'use strict';
angular.module('tmSurveyApp')
.controller('ResultCtrl', function($scope, $resource,$routeParams) {
	var _id = $routeParams.id;
	$resource('/resultsurvey/:id',{id:_id}).query().$promise
	.then(function  (result) {
		$scope.survey = {};
		$scope.survey.surveyName = result[0].answer.name;
		$scope.survey.filteredResult = _(result).chain().map(function (answer) {
			return answer.answer.questions;
		})
		.flatten()
		.map(function (flattResult) {
			return {result:flattResult.result,question:flattResult.text}
		})
		.groupBy('question')
		.map(function (answers,key) {
			var res = {question:key};
			res.answers = answers.map(function (ans) {
				return ans.result;
			})
			return res;
		}).map(function (result) {
			var res = {question:result.question};
			res.countBy = _(result.answers).countBy();
			return res;

		}).value();
	});
});