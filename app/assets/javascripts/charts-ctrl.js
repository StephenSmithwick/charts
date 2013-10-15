function ChartsCtrl($scope, LhdMetrics, Lhds, Metrics, $timeout) {
  $scope.lhds = Lhds.query(); 
  $scope.metrics = Metrics.query(); 

  $scope.metric_id = 1
  $scope.lhd_id = 1

  $scope.data = [];

  $scope.selected_lhd_name = "";
  $scope.selected_lhd_value = "";
  $scope.selected_lhd_percentage = "";
  
  $scope.$watch('metric_id', function(new_metric_id, old_metric_id) {
    requestMetrics(new_metric_id)
  }, true);
  
  $scope.selectMetric = function(metric_id) {
    requestMetrics(metric_id)
  }

  $scope.isSelected = function(metric_id) {
    return metric_id == $scope.metric_id
  }

  $scope.hovered = function(d){
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

  function generateChartData(lhdMetrics) {
    return lhdMetrics.map(function(lhdMetric){
      return {
        percentage: lhdMetric.percentage,
        name: lhdMetric.lhd_name,
        long_name: lhdMetric.lhd_long_name,
        value: lhdMetric.value
      }
    });
  };

  function requestMetrics(metric_id) {
    LhdMetrics.query({metric_id: metric_id}).$then(function(results){
      $scope.metric_id = metric_id
      $scope.data = generateChartData(results.resource);
    });
  };
}