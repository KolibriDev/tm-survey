'use strict';

angular.module('tmSurveyApp').controller('CreateCtrl', function($scope) {
    $scope.surveyName = '';
    $scope.questions = [];
    $scope.question = {};
    $scope.question.answers = [{
        val: ''
    }];

    $scope.addQuestion = function() {
        $scope.questions.push($scope.question);
        $scope.question = {};
        $scope.question.answers = [{
            val: ''
        }];
    };

    $scope.addAnswer = function() {
        $scope.question.answers.push({
            val: ''
        });
    };
});
