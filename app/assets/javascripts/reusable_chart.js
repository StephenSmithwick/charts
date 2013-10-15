d3.custom = {};

d3.custom.barChart = function module() {
    var ease = 'cubic-in-out';
    var chart, duration = 500;
    var dispatch = d3.dispatch('selected');

    function hexColor(red, green, blue) {
        hexString = '#';
        [red, green, blue].forEach(function(c) {
            hex = c.toString(16)
            if(hex.length < 2) {
                hexString += '0' + hex
            } else {
                hexString += hex
            }
        });
        return hexString;
    }


    function barChart(_selection) {
        _selection.each(function(_data) {
            var range = 0.1;
            _data.forEach(function(d) {
                var abs_percentage = Math.abs(d.percentage);
                if(range < abs_percentage) range = abs_percentage;
            })

            chart = d3.select(this)
                .classed('chart', true);
            
            function barLength(value) {
                var width = chart.style("width");
                return Math.abs(parseFloat(value) * parseFloat(width) / 200.0) 
            }

            function barDisplayValue(d) {
                var abs_percentage = Math.abs(parseFloat(d.percentage));
                return (d.percentage < 0) ? "(" + abs_percentage + '%)' : abs_percentage + '%';
            }


            var barBacks = chart.selectAll('.bar-back')
                .data(_data)

            barBacks_enter = barBacks.enter()
                .append('div').classed('bar-back', true);
            barBacks_enter
                .append('span').classed('bar-label', true)
                .text(function(d){ return d.name; })
                .attr({id: function(d){ return d.name.replace('&', '') + '-chart'; }})
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
                    var halfBack = d3.select(this).style({
                        'margin-left': (d.percentage < 0) ? '0%' : '50%'
                    });

                    var halfBack_length = parseFloat(halfBack.style('width'));
                    var bar_length = halfBack_length * parseFloat(Math.abs(d.percentage)) / range;

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

            duration = 500;
        });
    }
    d3.rebind(barChart, dispatch, 'on');
    return barChart;
};