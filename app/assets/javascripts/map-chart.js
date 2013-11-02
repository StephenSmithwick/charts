function ngMapChart() {
    var ease = 'cubic-in-out';
    var duration = 500;
    var dispatch = d3.dispatch('selected');

    function renderPaths(chart, data) {
        var lhd = chart.selectAll('path.map-item')
            .data(data);

        lhd.enter()
        .append('path').classed('map-item', true)
        .attr({
            d: function(d) { return d.path; }
        });
            
        lhd.exit()
        .transition()
        .style({
            opacity: 0
        })
        .remove();
    }

    function renderText(chart, data) {
        var lhd = chart.selectAll('text.map-item')
            .data(data);

        lhd.enter()
        .append('text').classed('map-item', true)
        .attr({
            'font-weight': "bold",
            x: function(d) { return d.x; },
            y: function(d) { return d.y; } })
        .text( function(d) { return d.long_name; } );
            
        lhd.exit()
        .transition()
        .style({
            opacity: 0
        })
        .remove();
    }

    function mapChart(_selection) {
        _selection.each(function(data) {
            chart = d3.select(this).append('g');
            
            renderPaths(chart, data.filter(function(d) {
                return d.path !== null;
            }));
            renderText(chart, data.filter(function(d) {
                return d.x !== null && d.y !== null;;
            }));
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
            if(data===undefined) return;
            chart.datum(data).call(mapChart);
        });
      }
    }
}