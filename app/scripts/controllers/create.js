'use strict';

angular.module('tmSurveyApp').controller('CreateCtrl', function($scope, $resource) {
    $scope.surveyName = '';
    $scope.questions = [];
    $scope.question = {};
    $scope.question.answers = [{
        val: ''
    }];
    $scope.step = "1";
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

    $scope.insertSurvey = function() {
        $resource('/addsurvey').save({
            name: $scope.surveyName,
            questions: $scope.questions
        });
    };

    $scope.setStep = function (step) {
        $scope.step = step;
    };
});
