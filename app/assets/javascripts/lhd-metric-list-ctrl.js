function LhdMetricListCtrl($scope, LhdMetrics, Lhds, Metrics, $timeout) {
  $scope.lhdMetrics = LhdMetrics.query();
  $scope.lhds = Lhds.query(); 
  $scope.metrics = Metrics.query(); 

  $scope.add = function() {
    $scope.lhdMetrics.push(new LhdMetrics());
  };
}