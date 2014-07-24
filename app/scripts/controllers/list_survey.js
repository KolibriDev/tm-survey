angular.module('tmSurveyApp')
    .controller('ListCtrl', function($scope, $resource) {
        $scope.list = $resource('/getall').query();
        console.log($scope.list);
    });
