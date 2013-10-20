d3.custom = d3.custom || {};

d3.custom.mapChart = function module() {
    var ease = 'cubic-in-out';
    var chart, duration = 500;
    var dispatch = d3.dispatch('selected');

    function mapChart(_selection) {
        _selection.each(function(data) {
            if(data===undefined) return;
            chart = d3.select(this).append('g').attr({
                transform: "translate(-84.945272,-149.66741)"
            });

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
    return mapChart;
};