function ChartsCtrl($scope, LhdMetrics, Lhds, Metrics, $timeout) {
  $scope.selectMetric = function(metric_id) {
    LhdMetrics.query({metric_id: metric_id}).$then(function(results){
      $scope.metric_id = metric_id;
      $scope.metric_data = results;
    });
  }

  $scope.isSelected = function(metric_id) {
    return metric_id == $scope.metric_id
  }

  $scope.selected = function(d){
    $scope.barValue = d.value;
    $scope.selected_lhd_name = d.long_name;
    $scope.selected_lhd_value = d.value;
    $scope.selected_lhd_percentage = d.percentage;

    d3.select('.selected.map-item').classed('selected', false);
    d3.select('#' + d.name.replace('&','') + '-map').classed('selected', true);

    d3.select('.selected.bar-label').classed('selected', false);
    d3.select('#' + d.name.replace('&','') + '-chart').classed('selected', true);
    $scope.$apply();
  };

  $scope.lhd_id = 1
  $scope.selected_lhd_name = "";
  $scope.selected_lhd_value = "";
  $scope.selected_lhd_percentage = "";  

  $scope.lhds = Lhds.query(); 
  $scope.metrics = Metrics.query();
  $scope.selectMetric(1);
}