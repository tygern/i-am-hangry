Hangry.LocationService = function LocationService() {
  this.findLocation = function getLocation($scope) {
    var deferred = new $.Deferred();
    var positionSuccess = function (position) {
      $scope.restaurantUrl += "?latitude=" + position.coords.latitude + "&longitude=" + position.coords.longitude;
      deferred.resolve();
    };

    var positionError = function (deferred) {
      deferred.resolve();
    };

    navigator.geolocation.getCurrentPosition(positionSuccess, positionError);

    return deferred.promise();
  };


};