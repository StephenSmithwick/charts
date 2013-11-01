function ngBarChart() {
    var ease = 'cubic-in-out';
    var chart, duration = 500;
    var dispatch = d3.dispatch('selected');

    function barChart(_selection) {
        _selection.each(function(data) {
            if(data === undefined) return; 
            range = data.reduce(function(range, d) {
                var abs_percentage = Math.abs(d.percentage);
                return (range < abs_percentage) ? abs_percentage : range;
            }, 0.1);
            chart = d3.select(this).classed('chart', true);

            function barDisplayValue(d) {
                var abs_percentage = Math.abs(d.percentage);
                return (d.percentage < 0) ? "(" + abs_percentage + '%)' : abs_percentage + '%';
            }

            var barBacks = chart.selectAll('.bar-back')
                .data(data)

            barBacks_enter = barBacks.enter()
                .append('div').classed('bar-back', true);
            barBacks_enter
                .append('span').classed('bar-label', true)
                .text(function(d){ return d.lhd_name; })
                .attr({id: function(d){ return d.lhd_name.replace('&', '') + '-chart'; }})
                .on('click', dispatch.selected);
            barBacks_enter
                .append('div').classed('half-back', true)
                .append('div').classed('bar', true);

            barBacks.select('.half-back').transition()
                .duration(duration)
                .ease(ease)
                .style({
                    'margin-left': function(d) {
                        width = d3.select(this).style('width');
                        return (d.percentage < 0) ? 1 : width;
                    }
                })
                .each("end", function(d) {
                    var halfBack = d3.select(this)
                    .style('margin-left', (d.percentage < 0) ? '0%' : '50%');

                    var halfBack_length = parseFloat(halfBack.style('width'));
                    var bar_length = halfBack_length * Math.abs(d.percentage) / range;

                    halfBack.select('.bar')
                    .transition()
                    .duration(duration)
                    .text(barDisplayValue)
                    .style({
                        width: bar_length + 'px',
                        'text-align': (d.percentage < 0) ? 'right' : 'left',
                        'margin-left': (d.percentage < 0) ? halfBack_length - bar_length + 'px' : '0px'
                    })
                    .each("end", function(d) { 
                        d3.select(this).style({ 
                            width: Math.abs(d.percentage) * 100 / range + "%",
                            'margin-left': (d.percentage < 0) ? 100 - Math.abs(d.percentage) * 100 / range + '%' : '0%'
                        })
                    });
                })
                
            barBacks.exit().transition().style({opacity: 0}).remove();
        });
    }
    d3.rebind(barChart, dispatch, 'on');

    return {
        restrict: 'E',
        replace: true,
        template: '<div class="chart"></div>',
        scope:{
          data: '=data',
          selected: '&selected'
      },
      link: function(scope, element, attrs) {
          var chartEl = d3.select(element[0]);
          barChart.on('selected', function(d, i){
            scope.selected({args:d});
        });

          scope.$watch('data', function (data) {
            chartEl.datum(data).call(barChart);
        });
      }
    }
}