angular
.module('lhd', ['ngResource', 'ng-rails-csrf'])
.factory('LhdMetrics', function($resource) {
  return $resource('lhd_metrics/:id', {id: '@id'}, {
    update: { method: 'PUT' },
    create: { method: 'POST' }
  });
})
.factory('Lhds', function($resource) {
  return $resource('lhds/:id', {id: '@id'}, {
    update: { method: 'PUT' },
    create: { method: 'POST' }
  });
})
.factory('Metrics', function($resource) {
  return $resource('metrics/:id', {id: '@id'}, {
    update: { method: 'PUT' },
    create: { method: 'POST' }
  });
})
.directive('barChart', function() {
  return ngBarChart();
})
.directive('mapChart', function() {
  return ngMapChart();
});

// default actions
// 'get':    {method:'GET'}
// 'save':   {method:'POST'}
// 'query':  {method:'GET', isArray:true}
// 'remove': {method:'DELETE'}
// 'delete': {method:'DELETE'} 