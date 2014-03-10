Hangry.LocationService = function LocationService() {
  this.findLocation = function getLocation($scope) {
    var deferred = new $.Deferred();
    navigator.geolocation.getCurrentPosition(this.positionSuccess, this.positionError, {timeout: 1});

    setTimeout(function() {
      deferred.resolve();
    }, 6000);

    return deferred.promise();
  };


  this.positionSuccess = function ($scope, deferred) {
    $scope.restaurantUrl += "?latitude=" + position.coords.latitude + "&longitude=" + position.coords.longitude;
    deferred.resolve();
  };

  this.positionError = function (deferred) {
    deferred.resolve();
  };
};