angular.module('lhd', ['ngResource', 'ng-rails-csrf']).
factory('LhdMetrics', function($resource) {
  return $resource('lhd_metrics/:id', {id: '@id'}, {
    update: { method: 'PUT' },
    create: { method: 'POST' }
  });
}).
factory('Lhds', function($resource) {
  return $resource('lhds/:id', {id: '@id'}, {
    update: { method: 'PUT' },
    create: { method: 'POST' }
  });
}).
factory('Metrics', function($resource) {
  return $resource('metrics/:id', {id: '@id'}, {
    update: { method: 'PUT' },
    create: { method: 'POST' }
  });
}).
directive('barChart', function(){
  var chart = d3.custom.barChart();
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="chart"></div>',
    scope:{
      data: '=data',
      hovered: '&hovered'
    },
    link: function(scope, element, attrs) {
      var chartEl = d3.select(element[0]);
      chart.on('customHover', function(d, i){
        scope.hovered({args:d});
      });

      scope.$watch('data', function (data) {
        chartEl.datum(data).call(chart);
      });
    }
  }
});

// default actions
// 'get':    {method:'GET'}
// 'save':   {method:'POST'}
// 'query':  {method:'GET', isArray:true}
// 'remove': {method:'DELETE'}
// 'delete': {method:'DELETE'} 