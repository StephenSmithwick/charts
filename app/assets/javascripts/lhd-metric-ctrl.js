function LhdMetricCtrl($scope, LhdMetrics) {
  $scope.error = false;

  $scope.init = function(lm) {
    $scope.lhdMetric = lm;
    $scope.editing = is_new(lm)
  }

  $scope.save = function() {
    function done_editing() {
      $scope.editing = false;
      $scope.error = false;
    }
    function has_error() {
      $scope.error = "Unable to save!";
    }

    if( is_new($scope.lhdMetric) ) {
      $scope.lhdMetric.$save(done_editing, has_error);
    } else {
      $scope.lhdMetric.$update(done_editing, has_error);  
    }
  };

  $scope.delete = function() {
    $scope.lhdMetric.$delete(function success() {
      var index = $scope.lhdMetrics.indexOf(lhdMetric);
      $scope.lhdMetrics.splice(index, 1);
    });
  };


  $scope.$watch('lhdMetric', function(new_lm, old_lm) {
    if( new_lm != old_lm) {
      console.log("Editing detected")
      $scope.editing = true;
    }
  }, true);

  function is_new(lm) {
    return lm.id === undefined
  }

}