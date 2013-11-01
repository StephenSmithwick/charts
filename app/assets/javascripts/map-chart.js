function ngMapChart() {
    var ease = 'cubic-in-out';
    var duration = 500;
    var dispatch = d3.dispatch('selected');

    function mapChart(_selection) {
        _selection.each(function(data) {
            if(data===undefined) return;
            chart = d3.select(this).append('g');

            var lhd = chart.selectAll('path.map-item')
                .data(data);

            lhd.enter()
            .append('path')
            .classed('map-item', true)
            .attr({
                d: function(d) { return d.path; }
            });
                
            lhd.exit()
            .transition()
            .style({
                opacity: 0
            })
            .remove();
        });
    }
    d3.rebind(mapChart, dispatch, 'on');

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'assets/directives/charts.html',
        scope:{
          data: '=data',
          selected: '&selected'
      },
      link: function(scope, element, attrs) {
        var chart = d3.select(element[0]);
        mapChart.on('selected', function(d, i){
            scope.selected({args:d});
        });

        scope.$watch('data', function (data) {
            chart.datum(data).call(mapChart);
        });
      }
    }
}