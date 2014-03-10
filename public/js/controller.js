hangryApp.controller('PickerController', function ($scope, $http) {
  $scope.choiceCollection = new Hangry.ChoiceCollection([]);
  $scope.tagCollection = new Hangry.TagCollection([]);
  $scope.query_state = 'no match';

  var locationService = new Hangry.LocationService();
  $scope.restaurantUrl = 'restaurants';

  locationService.findLocation($scope).then(function () {
    var deferred = $http.get($scope.restaurantUrl);
    deferred.success(function (response) {
      $scope.choiceCollection = new Hangry.ChoiceCollection(response);
      $scope.tagCollection = new Hangry.TagCollection($scope.choiceCollection.choices);
    });
  });



  $scope.addTag = function addTag() {
    if ($scope.tagCollection.toggleMatches()) {
      $scope.clearSearch();
    }
  };

  $scope.$watch('query', function () {
    $scope.query_state = $scope.tagCollection.findUniqueMatch($scope.query)
  });

  $scope.clearSearch = function clearSearch() {
    $scope.query = null;
  };

  $scope.$watch('tagCollection.count', function () {
    $scope.choiceCollection.updateScores($scope.tagCollection.tags);
    $scope.choiceCollection.setStyles($scope.tagCollection.count);
  });
});