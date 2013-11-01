function ChartsCtrl($scope, LhdMetrics, Lhds, Metrics, $timeout) {
  $scope.selectMetric = function(metric_id) {
    LhdMetrics.query({metric_id: metric_id}).$then(function(results){
      $scope.metric_id = metric_id;
      $scope.metric_data = results.data;
    });
  }
  $scope.selectLhd = function(lhd_id) {
    $scope.lhd_id = lhd_id;
    // LhdMetrics.query({metric_id: $scope.metric_id, lhd_id: lhd_id}).$then(function(results){
      
    //   $scope.metric_data = results;
    // });
  }

  $scope.selectLhdMetric = function(d){
    $scope.lhd_metric = d;

    d3.select('.selected.map-item').classed('selected', false);
    d3.select('#' + d.lhd_name.replace('&','') + '-map').classed('selected', true);

    d3.select('.selected.bar-label').classed('selected', false);
    d3.select('#' + d.lhd_name.replace('&','') + '-chart').classed('selected', true);
    $scope.$apply();
  };


  $scope.isSelected = function(metric_id) {
    return metric_id == $scope.metric_id
  }

  $scope.isSelectedLhd = function(lhd_id) {
    return lhd_id == $scope.lhd_id
  }

  
  Lhds.query().$then(function(results) {
    $scope.lhds = results.data;
  }); 
  $scope.metrics = Metrics.query();
  $scope.selectMetric(1);
}